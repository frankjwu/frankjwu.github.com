---
layout: post
title: Configuring Let's Encrypt and Nginx on EC2
---

![Let's Encrypt](/images/letsencrypt.jpg)

[Let's Encrypt](https://letsencrypt.org/) is a new Certificate Authority that offers free TLS/SSL certificates. Now that it's entered its public beta stage, I decided to experiment with installing and manually configuring a Let's Encrypt certificate on a EC2 instance running Ubuntu 14.04, Ruby on Rails, and Nginx.

To get started, download the [Let's Encrypt client](https://github.com/letsencrypt/letsencrypt) and run the built-in installer.

{% highlight bash %}
$ git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt
$ /opt/letsencrypt/letsencrypt-auto --server https://acme-v01.api.letsencrypt.org/directory --help --debug
{% endhighlight %}

Update your Nginx configuration (probably `/etc/nginx/sites-available/default`) to allow web access to all files in the `.well-known/` directory of your web root. This endpoint will be accessed by Let's Encrypt to ensure that you actually have control over your domain.

{% highlight nginx %}
location ~ /.well-known {
  allow all;
}
{% endhighlight %}

After updating your Nginx configuration, restart your server.

{% highlight bash %}
$ sudo service nginx restart
{% endhighlight %}

Add the following to `/etc/letsencrypt/cli.ini`. The webroot plugin will automatically generate the files necessary for the [ACME protocol](https://letsencrypt.github.io/acme-spec/). Remember to use the correct web root directory (if you're using Capistrano, this will probably be `/home/deploy/yourapp/current/public`) and domain names.

{% highlight ini %}
rsa-key-size = 4096
email = you@email.com
domains = yourapp.com www.yourapp.com
authenticator = webroot
webroot-path = /home/deploy/yourapp/current/public
{% endhighlight %}

We can now begin the certificate authorization process.

{% highlight bash %}
$ /opt/letsencrypt/letsencrypt-auto certonly --config /etc/letsencrypt/cli.ini --agree-tos
{% endhighlight %}

Update your Nginx configuration to take advantage of your newly-issued certificate.

{% highlight nginx %}
listen 443;
server_name localhost;

ssl on;
ssl_certificate /etc/letsencrypt/live/yourapp.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/yourapp.com/privkey.pem;
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';
{% endhighlight %}

After restarting your web server, your site should now be accessible via HTTPS.

## Certificate Renewal

Let's Encrypt certificates expire after [90 days](https://letsencrypt.org/2015/11/09/why-90-days.html) to ensure security and to encourage automation. We can automate the certificate renewal process by creating a simple monthly cronjob in `/etc/cron.monthly/letsencrypt`.

{% highlight bash %}
#!/bin/sh
#
# Let's Encrypt renewal service

/opt/letsencrypt/letsencrypt-auto certonly --config /etc/letsencrypt/cli.ini --agree-tos --renew-by-default
service nginx restart
{% endhighlight %}

Test your renewal script. If you see a success message, you're set!

{% highlight bash %}
$ sudo /etc/cron.monthly/letsencrypt
{% endhighlight %}
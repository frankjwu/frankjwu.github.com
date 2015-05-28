---
layout: post
title: Intro to Web Development (MIT Blueprint 2014)
---

I recently led a workshop on basic HTML and CSS at Google Cambridge for MIT's [Blueprint](http://blueprint.hackmit.org/), a 14-hour event for high school students interested in software development and computer science. My talk assumes __no prior knowledge__ and walks you through a simple HTML and CSS website, teaching fundamentals like the box model, classes vs. ids, and more.

## Slides

<p><script async class="speakerdeck-embed" data-id="4f2ea6207e2b013188082eaa35b483aa" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script></p>

## HTML (index.html)
<p>
{% highlight html %}
<html>
  <head>
    <title>My Website</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="wrapper">
      <div class="top">
        <h1>Blueprint is awesome!</h1>
        <p>Hi! Welcome, I'm learning HTML and CSS. Built by Frank at <a href="http://blueprint.hackmit.org/">Blueprint 2014.</a></p>
      </div>
      <div class="about">
        <div class="column" id="column1">
          <h2>Feature 1</h2>
          <img src="1.png"><br /><br />
          Why we are the best.
        </div>
        <div class="column" id="column2">
          <h2>Feature 2</h2>
          <img src="2.png"><br /><br />
          Why we are the most fun.
        </div>
        <div class="column" id="column3">
          <h2>Feature 3</h2>
          <img src="3.png"><br /><br />
          Why we are the most awesome.
        </div>
      </div>
      <div class="bottom">
        <h2>You'll love our awesome features.</h2>
      </div>
    </div>
  </body>
</html>
{% endhighlight %}
</p>

## CSS (styles.css)

<p>
{% highlight css %}
body {
  background: #d9d9d9;
  font-family: "Helvetica Neue", Helvetica, Arial, Sans-serif;
  text-align: center;
}

h1 {
  font-size: 50px;
}

a {
  color: #D7E0E6;
}

.wrapper {
  margin: 0 auto;
  width: 900px;
}

.top {
  color: #D7E0E6;
  background-color: #0099F8;
  padding: 50px;
  margin: 30px 0 0 0;
}

.about {
  display: inline-block;
  margin: 15px 0 0 0;
}

.column {
  background-color: #CE4D4F;
  color: #263039;
  height: 210px;
  width: 260px;
  float: left;
  padding: 20px 15px;
  text-align: center;
}

#column1 {
  margin-right: 15px;
}

#column2 {
  margin-right: 15px;
}

.bottom {
  color: #D7E0E6;
  background-color: #092F4B;
  padding: 50px;
  text-align: center;
  margin: 15px 0 30px 0;
}
{% endhighlight %}
</p>
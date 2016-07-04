---
title: Barcrawl - Deploy!
category: tech
tags: [website, bar, barcrawl, app]
---

I am pleased to announce that gobarcrawl.com has become official!

In my [previous post]({% post_url 2015-10-16-barcrawl-announcement %})
announcing the Barcrawl project, I mentioned that a web app was in the works
to create a bar crawl route based on the most popular bars found by Yelp and
I am pleased to announce that Barcrawl has been officially deployed to
[www.gobarcrawl.com](http://www.gobarcrawl.com/)!

There is still a lot of work to be done, but the core feature is currently
working and will give you a list of top bars to check out. One note of caution:
If you try creating a bar crawl spanning multiple countries it won't work
since the app is currently relying on the Google Maps Directions API and
won't be able to get directions for international travel.

For those of you who are curious, the technologies used are:
- Python 2
- Django
- Yelp API
- Google Maps Directions API
- Google Maps Geocode API
- Google Maps Javascript API

<p class="blog-image">
    <img src="/images/blog/posts/barcrawl.gif"
             class="img-responsive center-block"
             alt="Barcrawl Web App"
             style="box-shadow: 0 0 1px #111">
</p>
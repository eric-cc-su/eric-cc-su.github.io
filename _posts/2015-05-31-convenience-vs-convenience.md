---  
title: Convenience vs. Convenience 
category: tech
tags: [HTML, markdown, convenience, tech] 
---

*DISCLAIMER: I am writing this post in Markdown*

The very first language related to web design I ever learned was HTML. I had a
textbook and every online tutorial related to beginning web design starts off
with writing simple webpages in pure HTML. After lots of practice I have grown
comfortable with writing in HTML and containing everything in tags. So when I
started using git (a version control system) and I ran into Markdown I thought
"Oh great, some silly little syntax thing I have to learn to use just to write
up a README file for git/GitHub/BitBucket...". Also while I was setting up this
blog I read that I have the option to write my posts in either HTML or
Markdown...with an emphasis on using Markdown. Although I wrote my initial post
in HTML I did some thinking and decided that maybe this new Markdown language is
worth getting accustomed to if it's meant to simplify the amount of writing I
have to do for a blog post. So here is my simple breakdown of HTML and Markdown
the way I see it.

## HTML

**The convenience:** I've known how to use it first and I use it the most

HTML is the undefeated world champion with pedigree in my mind. It is the
original fruit of the web page as we know it and it is still the skeleton of all
web pages that we use today. Without HTML everything on the web would be a messy
blob of data with little structure. HTML is the web markup language that uses
tags to contain and format webpage data. Headers are contained within `<h#>` and
`</h#>`, paragraphs are contained within `<p>` and `</p>`, links are contained
within `<a>` and `</a>` and so forth.

Logically, an HTML file is a list of containers of data and the tag of the
container determines how the data should be presented. The open-close syntax is
very important to make sure that each containers' contents are clearly defined.
In addition, each container tag can be complemented with specifiers to give any
additional information on how the container should be presented. A link
container requires a specifier for the URL(the destination) of the link, and all
tags can be complemented with a `class` and/or `id` specifier that will
categorize or uniquely identify that specific container and its contents.

Finally the killer feature with HTML is that HTML supports integration with the
CSS and Javascript languages. CSS stands for Cascading Style Sheets and is used
in web design to specify the visual details of the data in HTML. These details
include text color, background color, margins, spacing and every other detail
that contributes to the page's visual layout. Javascript is a scripting language
used alongside HTML to provide some logic to the web page. Javascript is big on
modern web pages to provide neat animations and user interactions to make the
web page more dynamic. Both of these languages can be included right in the HTML
file if needed to provide some quick details. Blocks of CSS can be included with
the `<style>` tag or CSS for one specific item can be written inline with the
`style=` specifier, while Javascript can be defined with the `<script>` tag.

For full documentation on HTML visit [w3schools](http://www.w3schools.com/html/) for a tutorial and documents on all the different tags.

##Markdown

**The convenience:** It simplifies writing by reducing the need for tags

To be fair, Markdown is not quite a head-to-head contender with HTML since it's
meant to be a way to simplify writing static HTML files that don't require much
Javascript or CSS. I think of Markdown as an optional layer on top of the
HTML...but in the case of blog posts, either language can be solely responsible
for the content (because [Jekyll](http://jekyllrb.com/docs/home/) can convert
both). Markdown is not all about the tags like HTML, but uses spacing and
character combinations to define different containers of data. Paragraphs are
simply separated by one line of whitespace before and after the text. Headers
are defined by leading pound symbols (`#` correlates to `<h1>` and `###`
correlates to `<h3>`) and links are defined with the link text in brackets
immediately followed by the URL in parentheses (the above link to Jekyll is
written as: `[Jekyll](http://jekyllrb.com/docs/home/)`). Once you look over the
basics of Markdown it is easy to see how writing in Markdown can be really
convenient.

I'm definitely still a beginner in Markdown so all of my hesitation to adopt the language comes from my need for more education. But if you would like to learn more about using Markdown you can visit [Daring Fireball](http://daringfireball.net/projects/markdown/syntax) or GitHub Guide's [Mastering Markdown](https://guides.github.com/features/mastering-markdown/) for documentation and runthroughs.
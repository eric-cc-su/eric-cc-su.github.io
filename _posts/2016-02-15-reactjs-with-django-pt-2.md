---
title: Integrating ReactJS with Your Django Project (Part 2)
layout: post
date: 2016-02-15
category: blog
tags:
  - python
  - django
  - web development
  - ReactJS
author: ericsu
---

This is part two of a two part introduction on how to integrate ReactJS with your Django project.

In [part one]({% post_url 2016-02-14-reactjs-with-django %}) I went over how you can install ReactJS since it
requires a little bit of work if you don't
primarily develop in node.js. In this article I want to go through ReactJS's [tutorial](https://facebook.github.io/react/docs/tutorial.html)
and include my own notes about how you can get the test code working with a Django back-end. This article assumes
that you either have an existing Django project running or you have experience in Django/Python so I won't go over
details on general Django or Python development.

## Running a Server & Getting Started

React's tutorial suggests that you run your server. For this I simply used Django's development server:

`python manage.py runserver`

I also created a new HTML file in my templates directory using ReactJS's tutorial code and just named it `test.html`.
In order to see this file on the front end you'll need to create a view for it (or plug the template into an existing view)
and map the url if you created a new view.

In my `views.py` file I simply plugged my test.html file into my index page view, which inherits from the TemplateView class and
just returns a TemplateResponse.

    class IndexPageView(TemplateView):
        def get_context_data(self, request=None, **kwargs):
            ...
            return context

        def get(self, request):
            context = self.get_context_data(request)

            return TemplateResponse(request, template="test.html", context=context)

Now you should be able to run your development environment and see the test template (It'll probably be blank).

Continue through the tutorial until you get to [**Fetching from the Server**](https://facebook.github.io/react/docs/tutorial.html#fetching-from-the-server).

## Fetching from the Server

Follow the tutorial and use whatever endpoint you want as the source URL. For example, I set the source url to be `/react-test`:

    ReactDOM.render(<CommentBox url="/react-test"/>, document.getElementById('content'));

Now in your `urls.py` file, you will need to declare the url endpoint and attach it to a view.
But you will not be attaching your new url to the view that serves your test template. Instead you will need to define
a new view that returns HttpResponse objects instead of TemplateResponse objects. This view will only serve as a data
endpoint, so you do not need it to return a TemplateResponse.

Here is my url declaration:

    url(r'^react-test/?$', ReactTest.as_view())

And here is my view so far:

    class ReactTest(View):
        def get(self, request):
            data = [
              {"id": 1, "author": "Pete Hunt", "text": "This is one comment"},
              {"id": 2, "author": "Jordan Walke", "text": "This is *another* comment"}
            ]
            return HttpResponse(json.dumps(data))

I didn't want to bother with using actual data in my database, so I just locally defined the sample data that the tutorial uses.
Notice that you will need to encode the data into JSON so the front-end can read it.

Continue the tutorial until you reach [Adding New Comments - Submitting the Form](https://facebook.github.io/react/docs/tutorial.html#submitting-the-form)

## Adding New Comments - Submitting the Form

Follow the tutorial's instructions to add more HTML and JSX code to your text template. But when you define the
`handleSubmit` callback, you will need to add a CSRF token to the POST data so Django knows your React code isn't an
attempt at [Cross Site Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting). Therefore in your handleSubmit function,
modify the `this.props.onCommentSubmit` line with the following:

`this.props.onCommentSubmit({author: author, text: text, csrfmiddlewaretoken: {{ "{% csrf_token " }}%}.props.value});`

This is kind of a hacky solution, so this might not be the most secure for production and I encourage you to find a
solution that works better for your project. But this will do for the tutorial code.

Now continue through the rest of the tutorial. You should be all set with integrating ReactJS with you Django project for
this simple tutorial.

## Congrats!

You've now integrated ReactJS with Django! Now you should have a baseline to further integrate ReactJS
into the rest of your project structure. Since this is also only tutorial code, you can keep it for future reference or
you can easily delete it. I'm learning as a I go so I'll be sure to write up any further ReactJS tips I come across.

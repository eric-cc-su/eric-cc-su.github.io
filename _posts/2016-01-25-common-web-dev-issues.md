---
title: Common Web Dev Issues and Solutions
layout: post
date: 2016-01-25
category: blog
tags:
  - python
  - django
  - web development
  - MySQL
author: ericsu
---

<p></p>

UPDATE: Thanks to reddit user awesomeo1989's idea, I've turned this article into it's own
[Git repository](https://github.com/eric-cc-su/common-web-dev-issues) so others can contribute.

So you're having some issues in your web environment. Before you start diving
deep into documentation and Stack Overflow, check this guide to make sure you're not
experiencing one of the really simple configuration issues that countless people have most likely experienced
before. This is basically a reminder to myself for stupid things that I personally run into, so I might have left
out some other issues that other developers or other configurations usually run into.

# **General**

### Browser shows "502 Bad Gateway"

Try starting/restarting your server or any server modules you use (e.g. nginx and uwsgi).

On Unix systems you can try `sudo service nginx restart`

### Browser shows "Connection refused"

If you're running a virtual machine, check the settings to ensure that you set up port forwarding so you can access
your environment. If you're not running a virtual machine, double check your configuration to make sure that traffic
is being sent to the intended port on your localhost. (My environments typically forward to host port 8000 or 8080)

### SSH Connection Refused

1. Check your credentials: username, host, password
2. Check the port you're connecting to: `ssh user@host -p 2222` connects through port 2222

# **Django**

**TIP**: Make sure you set `DEBUG = True` in your settings file if you're testing on your local environment

### 'No module named...' on startup

If you're using virtual environments make sure you activated the environment before you try starting the django
development server. This is as simple as calling `. /dir/to/env/activate` on the command line (for UNIX systems)

### 'No module named...' elsewhere

It is convenient to have a "requirements.txt" file that keeps track of the modules that your environment needs. If
you're getting a "no module named..." error, check if the module is listed in your requirements and add it if it's not.
Then try installing the module with pip or another appropriate package manager.

UNIX: `sudo pip install module`

### Static Files Issues

- Make sure STATIC_URL in your settings file(s) is properly set. Typically to `/static/`
- Check that your templates call on your static files with `{{ "{% load staticfiles" }} %}` at the top of the file
- Make sure you're not accidentally including your STATIC_URL in your HTML links (e.g. `href="static/css/file.css"`)

[Django docs](https://docs.djangoproject.com/en/1.9/howto/static-files/)

### MySQL errors

If you've made any changes to your models you will have to make and apply
[django migrations](https://docs.djangoproject.com/en/1.9/topics/migrations/) to update your MySQL tables
unless you have a custom configuration.

- make migrations - `python manage.py makemigrations`
- apply migrations - `python manage.py migrate`

# **Javascript/jQuery**

jQuery is very commonly used with Javascript so I've decided to combine the two.
Especially since there is always the possibility of accidentally mixing up Javascript and
jQuery syntax.

### '\_' is not a function

If you're using a built-in function, make sure that you're using the proper notation/function
name for either Javascript or jQuery. For example, `html()` is a jQuery function that
will return the HTML contents of the selected element. But it will not work if you did
not select your element with the jQuery selector syntax `$('#id'/'.class')`.

If you're using a function that you have defined yourself, make sure you've spelled
the function name correctly and the that the function exists in the scope of your
function call. This error may come up if you're calling a function that's not in the right
Javascript file or if you're calling a function that hasn't been defined for the entire
script.

### Nothing gets selected when I try selecting an element

There are two ways that I select elements. You can either use the
[document object](https://developer.mozilla.org/en-US/docs/Web/API/Document),
or you can use [jQuery](https://learn.jquery.com/using-jquery-core/selecting-elements/).

If you are using the document interface, you will need to make sure that you are using
the [proper function](http://www.w3schools.com/js/js_htmldom_document.asp) and that you
are NOT including the ID/class selector in your text.
(`document.getElementById("the_id")` NOT `document.getElementById("#the_id")`)

If you are using jQuery, you will need to inclde the ID/class select and you will
need to make sure that you are calling it with jQuery syntax. e.g. `$("#the_id")`.

# **MySQL**

### Can't connect to local MySQL server

Make sure that you've started your MySQL server. There are command line options or GUIs that you can use for this.

### Access Denied

Slowly re-type your password or make sure that you're using the right username and host. Sometimes you will need to
explicitly tell MySQL to log you in with a username and password using the -u and -p options.

[Connecting to the MySQL Server](https://dev.mysql.com/doc/refman/5.7/en/connecting.html):

- logging in with a username: `mysql -u bob`
- logging in with a username and password: `mysql -u bob -p`
- logging in with a username and password and your password is "thebuilder": `mysql -u bob -pthebuilder` OR `mysql -u bob --password=thebuilder`
- logging in with a username and password to the table "bricks": `mysql -u bob -p bricks`

**But I swear my credentials are right!** - If you're using a virtual machine, make sure you're SSH'd into your machine
before you try logging in to MySQL. (Yes, I've done this before)

EDIT: You should also make sure that any users you set up in MySQL have proper permissions to access or edit the
database you need.

### "Field Doesn't Have a Default Value"

This sometimes occurs if you're applying new changes and for some reason your database doesn't get
the memo that a column was given a default value. This can be fixed with an
[ALTER TABLE](http://dev.mysql.com/doc/refman/5.7/en/alter-table.html) command.

ex. `ALTER TABLE table_name ALTER column_name SET DEFAULT NULL;` would set the default as NULL

# **NGINX**

## Cached Static Files Issues

This is in the case that either old versions of files are being served or static files are cut off.

I've had an issue where some of my javascript files are not only old, but the rest of the file had
been severed. This can be fixed by changing your nginx configuration, especially if you are running
on a virtual machine.

In your nginx.conf (`/etc/nginx/nginx.conf`), set "sendfile" to off, or remove the line entirely.

_This article will continue to be updated as I find or remember more typical issues_

---
title: Common Web Dev Issues and Solutions
category: tech
tags: [python, django, web-development, MySQL]
---

So you're having some issues in your web environment. Before you start diving
deep into documentation and Stack Overflow, check this guide to make sure you're not
experiencing one of the really simple configuration issues that countless people have most likely experienced
before. This is basically a reminder to myself for stupid things that I personally run into, so I might have left
out some other issues that other developers or other configurations usually run into.

## **General**

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

## **Django**

**TIP**: Make sure you set `DEBUG = True` in your settings file if you're testing on your local environment

### 'No module named...' on startup

If you're using virtual environments make sure you activated the environment before you try starting the django
development server. This is as simple as calling `. /dir/to/env/activate` on the command line (for UNIX systems)

### 'No module named...' elsewhere

It is convenient to have a "requirements.txt" file that keeps track of the modules that your environment needs. If 
you're getting a "no module named..." error, check if the module is listed in your requirements and add it if it's not. 
Then try installing the module with pip or another appropriate package manager. 

UNIX: `sudo pip install module`

### MySQL errors

If you've made any changes to your models you will have to make and apply 
[django migrations](https://docs.djangoproject.com/en/1.9/topics/migrations/) to update your MySQL tables
unless you have a custom configuration.

- make migrations - `python manage.py makemigrations`
- apply migrations - `python manage.py migrate`

## **MySQL**

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

### "Field Doesn't Have a Default Value"

This sometimes occurs if you're applying new changes and for some reason your database doesn't get
 the memo that a column was given a default value. This can be fixed with an 
 [ALTER TABLE](http://dev.mysql.com/doc/refman/5.7/en/alter-table.html) command.

ex. `ALTER TABLE table_name ALTER column_name SET DEFAULT NULL;` would set the default as NULL


*This article will continue to be updated as I find or remember more typical issues*
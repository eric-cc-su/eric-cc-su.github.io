---
title: Rebuilding Your MySQL Database
category: tech
tags: [back-end, web-development, mysql, database]
---

Sh*t happens and sometimes you need to rebuild your MySQL database. It might be because you need
to reconstruct your environment or just duplicate your environment. But here's some things to remember
when you're rebuilding a MySQL database.

## Take a Dump

It's always a good idea to occasionally dump your database every now and then so you have a backup for
this exact purpose. If you haven't done so yet (and your original database hasn't been completely destroyed), all you need is the mysqldump command which works like so:

`mysqldump [options] database_name > filepath/filename`

Usage cases:

- username: `mysqldump -u'username' database_name > filepath/filename`
- username & password: `mysqldump -u'username' -p'password' database_name > filepath/filename`
- only 100 entries per table: `mysqldump --opt --where '1 limit 100' database_name > filepath/filename`

Tip: Running into permissions issues? Log into root (`sudo su`) and run mysqldump. Ask your administrator if you don't have these privileges.

Make sure you save the dump file somewhere you'll remember and can keep track of.

## Create the New Database

Run the following in the MySQL console:

`CREATE DATABASE IF NOT EXISTS database_name;`

Simple! If the database already exists then you can skip this step. If you need to empty the database,
consider [dropping the database](http://dev.mysql.com/doc/refman/5.7/en/drop-database.html)

## Recreate the Database with your Dump

Now, outside of the MySQL console, you should be able to run:

`mysql [options] database_name < filepath/filename`

to recreate the database based on your MySQL dump.

Example - with a database named "test" and a dump file at `dumps/dump1.sql`:

`mysql test < dumps/dump1.sql`

Be sure to include credentials if you run into permissions issues.

## All Set!

You should be all set! This is usually a simple process but let me know if I missed anything.


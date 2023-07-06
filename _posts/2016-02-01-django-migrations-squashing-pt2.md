---
title: Fun with Squashing Django Migrations Pt. 2
layout: post
date: 2016-02-01
category: blog
tags:
  - python
  - django
  - migrations
  - web development
  - git
author: ericsu
---

This is part two of a previous article on squashing Django migrations to lighten the memory load on your system.

You can read [Part 1 here]({% post_url 2016-02-01-django-migrations-squashing %}).

## Update Django's Migrations Table

Now that you've consolidated all your past migrations into squashed migrations, you will need to
update Django's migrations table to let Django know that you don't actually need
to run the squashed migration since your database already exists.

Using the `--fake` parameter for Django's `migrate` command, you can tell Django to skip a migration
and label it as if it has already been applied. The syntax is as such:

`python manage.py migrate --fake app_label migration_name`

When this command is run, Django will mark all migrations from 0001 to `migration_name` as already
executed. If you accidentally typed in a migration that was too far ahead, you can just call
the command with an earlier migration and it will mark anything past that migration as
undone.

**IMPORTANT**: This is why you **SHOULD NOT** have squashed any migrations that have not already been migrated.
If you have accidentally done so, your un-migrated changes will not be run unless you destroy
your database and re-construct it with the squashed migration. BUT it is not too late as you can
simply delete the squashed file and revert any dependencies that were changed to point to the squashed
migration. If you have deleted your old migrations, read on to find out how to restore them with Git.

## Do Your Work and Revert Once Done

Once you have applied and made your migrations, you can use [Git](https://git-scm.com/) to revert
your migrations to the way they were before.
If you run `git status`, you will notice that all the migrations that you had deleted earlier will be listed
as "deleted". Run `git reset HEAD .` to restore all the files you deleted and then run `git checkout -- .` to
revert all changes made to existing files. If you created any migrations, they will not be affected since they are
new files. Once you have reverted all old files you will be able to remove the squashed migration file,
add any new migrations and commit them.

Note that this is a very simple umbrella solution so you will need to verify that you did not define any
custom dependencies or make any changes to existing files that you wanted to keep.

## Well Done!

By now you should have successfully squashed your migrations, run and made any new migrations,
and reverted everything back before committing it to your repository! If I've missed something or
if you have a more efficient method I'm all ears.

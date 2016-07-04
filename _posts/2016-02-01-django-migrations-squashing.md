---
title: Fun with Squashing Django Migrations Pt. 1
category: tech
tags: [python, django, migrations, web-development, git]
---

Today at work I realized that my virtual machine didn't have enough memory to process all the Django migrations that
had built up over time. So I decided that the best solution 
would be to squash the migrations, which would hopefully reduce the memory load required to migrate changes. 

Django provides [documentation on squashing migrations]([squash the migrations](https://docs.djangoproject.com/en/1.9/topics/migrations/#squashing-migrations), 
but since I was working on a repository that everyone else uses, I didn't want to completely remove
all the past migrations in case someone else's environment is not caught up. Using Git and Django,
I was able to temporarily squash migrations so I could apply and make migrations within my virtual
machine's memory limits before reverting everything and only committing the migrations I added. All
the information on migrations and git can be found in their respective documentation if you want to
go further in detail.

## Squash

Step one is to squash as many migrations as possible using the django command:

`python manage.py squashmigrations app_label migration_name`

Since my virtual machine has 1Gb of memory and I had no idea when the kernel would kill
the process, I used some trial and error. You will need to specify the application name and the 
migration that you want to squash up until. If you had an app with the label "myApp" and you want 
to squash migrations 0001 to 0150 you will call:

`python manage.py squashmigrations myApp 0150`

However, if you have multiple migration files with the prefix 0150, you will need to explicitly state
which migration to use:

`python manage.py squashmigrations myApp 0150_auto_123456_1234`

Where `0150_auto_123456_1234` is the file name of the migration.

**IMPORTANT**: DO NOT include any migrations that have not already been migrated into your squash. Read further to learn why.

It is important to note that Django **does not** delete your migrations for you, so once you squash
your migrations you will be left with a new migration file with a name like `0001_squashed_0150_migration_name`
which replaces all your migrations from 0001 to `0150_migration_name`.

### Conflicts and Other Notes

If you recieved an error concerning function definitions in a particular migration, it is important to note
that Django with Python 2 will not support the definition of methods within the Migration class. So you will
need to define any needed functions outside the Migration class.

If you received a nonthreatening message from django concerning function definitions when you squashed your migrations,
 this simply means that you need to redefine some functions in the squashed file.
 In the new migration file you will find comments at the top of the file which specify the functions 
 that will need to taken from their original migration files and defined in the squashed file. 
 Copy the function definitions from the specified migrations, paste them in the squashed file,
  and find each `RunPython()` call in the squashed file and remove the prefixes that 
 call the original migration files. For example, given files `0053_original_migration.py` and 
 `0001_squashed_0120_original.py`: 
 
    """
    0053_original_migration.py
    """
    
    def function1():
        foo
        ...
        bar
    
    class Migration(migrations.Migration):
        ...
        ...
    

`function1()` will need to be copied entirely from `0053_original_migration.py` and 
pasted into `0001_squashed_0120_original.py`:

    """
    0001_squashed_0120_original.py
    """
    
    def function1():
        foo
        ...
        bar
    
    class Migration(migrations.Migration):
        ...
        ...
        RunPython(django.path.to.migrations.0053_original_migration.function1)
                    |
                    v
        RunPython(function1)
        
Notice that the line `RunPython...` has also been shortened to exclude the prefix of the original migration.

## Replace Old Migrations

In order to make Django ignore all old migrations that have been squashed into the new file, you will
need to:

1. Delete all old migrations that the squashed file replaces
2. Replace dependencies on old migration files to use the new file instead:
    
        class Migration(migrations.Migration):
        
        dependencies = [
            ('app_label', '0053_original_migration'),
                            |
                            v
            ('app_label', '0001_squashed_0120_original'),           
        ]
3. Remove the `replaces` attribute of the Migration class in the squashed migration file

Read [Part 2]({% post_url 2016-02-01-django-migrations-squashing-pt2 %}) to learn how to use your squashed migrations
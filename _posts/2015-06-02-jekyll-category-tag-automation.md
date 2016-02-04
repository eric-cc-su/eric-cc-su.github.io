---
title: Automating the Implementation of Tags and Categories in Jekyll
category: tech
tags: [jekyll, programming, automation, ruby, tags, categories]
mtime: 12:00
---

This website and blog is built with the static web page generator
[Jekyll](http://jekyllrb.com/) and published through GitHub Pages. Jekyll is a blog aware static site generator that provides support for tags and categories, but this is a feature that needs to be manually implemented
by the user.

I used instructions and code provided by
[Minddust](http://www.minddust.com/post/tags-and-categories-on-github-pages/) to put together the infrastructure
needed for tags and categories (T&C) so **this is not about how to set up tags and categories with Jekyll**.

This is not particularly for beginner programmers since I tend to write a lot and I can't go through every detail here. **BUT** I am a newbie to Ruby and I basically learned Ruby as I was coding this...or I coded this to learn Ruby... however you want to see it. So if you have experience in programming logic you should be fine.

This article is solely about how I automated Minddust's approach to Jekyll T&C.
The approach here may not be the most efficient, but keep in mind that this is
my first full Ruby program so I just hacked together whatever worked. It must
also be noted that this automation only works **if you render the website in
development**. GitHub Pages deploys all Pages repositories in safe mode, which
prevents custom plugins (this automation code) from running on GitHub's end.

For those people who like to skip to the end, you can view the plugin code via [this gist](https://gist.github.com/eric-cc-su/c4f637f769cd85615225)

and you can view my site's repo [right here](https://github.com/eric-cc-su/eric-cc-su.github.io)

## The Infrastructure

**Since Minddust is the source of the infrastructure code/logic I highly recommend reading how he implements T&C first.**

In short, all T&C items must be defined in their respective YAML lists (one for tags, one for categories), which are kept in the root `_data` directory
. Within the YAML list, each T&C is defined with a `slug` field and a `name` field as so:

    - slug: general
      name: General

In addition to the YAML lists, each T&C item must have its own file in the format `(T&C item).(extension)`. For example a tag of "programming" would need a file `programming.md`. These files exist in `/blog/tag/` or `/blog/category/` as appropriate. Each of these files contains the following front matter:

    ---
    layout: *layout*
    tag: *tag*
    permalink: /blog/tag/*tag*/
    ---

The permalink is relative to the project root so it should start at `/blog`. The format is the same for both tags and
 categories.These files produce a landing page for each T&C where all the corresponding articles will be presented.
 Unless you plan on using your default layout for the T&C landing pages you should also create and define your custom
  layouts, which would be defined in these files.

Without automation, each new T&C requires defining the T&C in the proper YAML
file and creating its own file  by hand. Failing to update the YAML file means
that the tag may not show up in blog posts while failing to create T&C file
means that there will be no web page to compile the articles that belong to the
T&C.

## Automation

So there are two things that have to be automated for each T&C: the YAML entry
and the Markdown file.  The plugin is written in Ruby in order to easily
integrate the plugin with the development Jekyll environment and is kept in
the root `_plugin` directory for Jekyll's access, it does not matter what the
file is named. The only Ruby module required is `fileutils` for path lookups.

We are techincally writing a generator for Jekyll, so the Jekyll-recommended
structure is to define everything within one module. I decided not to name the
module as `Jekyll` because I was too afraid of any possible side effects.
Instead, the primary class is inherited from `Jekyll::Generator`. The basic
structure of the  plugin is as follows:

    require 'fileutils'

    module CatTag
        *Some directory path logic*

        class Primary < Jekyll::Generator

            def generate(site)
                ...parses YAML data and calls the other functions...
            end

            def check_source(rel_path)
                ...check existing T&C names...

            def compile_post_data(data_array)
                ...check T&C used in all articles...
            end

            def construct(type, data_array)
                ...create the files and YAML entries...
            end

         end
    end

### The Constructor

We'll start at the top and work our way down. The directory path logic being referred to is just some code for the
plugin to make sure it's in the working directory that it wants to be in. Although the plugin is meant to exist in
the `_plugins` directory, it will need to work in the root project directory to access all of the files it needs. It
is a good idea to save the root project path into a global variable so that it can used to construct the other paths
needed.

Next is the `generate(site)` function. This is the only function that is
required by Jekyll so the name of this  function **can not be changed**. The
`site` parameter is actually not needed in this code, but it is required by
Jekyll  since we are inheriting from its Generator. This function acts as the
class' constructor, so class-wide variables will  be defined here and I have
also written the function to parse through all of the posts in the `_posts`
directory and   save their YAML front matter. I have defined one master list
that will house all of the parsed front matter, two lists that will house all
the T&C currently implemented, and two most lists that house any T&C that needs
to be integrated. Except for the master list, all lists will be defined by
external methods (explained below). The only logic within the generate
method has the following code structure:

    Dir.foreach(*_posts directory path*){
        |file|
        if not ['.','..'].include?(file)            # Exclude "." and ".."
            data = Hash.new                         # new Hash for file
            file_object = open(*filepath*)
            oneline = onepost.readline              # Start at the first line
            *if '---' not in oneline*        
                * while '---' not in oneline *       # Search for opening ---
                    oneline = onepost.readline
                end
            else                                    # Found the opening ---
                oneline = onepost.readline
                * while '---'not in oneline *       # Read front matter
                    keyval = oneline.split(":")     # Split line into a list
                    data[* key *] = data[* value *]
                    oneline = onepost.readline
                end
            end
            * append Hash to master list *
            file_object.close
        end
    }

Any pseudo-code is contained within asterisks. The reason I read every line individually is because it allows the plugin
 to parse only the first bit of every post we need instead of flooding the memory with loads of text it's not going
 to use. Once the master list has been constructed with each file's front matter, `generate(list)` calls upon its
 sibling methods to complete the automation.

### Checking Currently Implemented T&C

In order to avoid rewriting or corrupting existing files for the T&C already in
place, it is a good idea to first check what T&C exists. This is the first
method below the constructor as it is the first step in adding new T&C.

    def check_source(source_path)
        empty_array = []
        directory_path = * $base path + file path *
        Dir.foreach(directory_path){
            |file|
            * if filename is neither . nor .. *
                * append filename (strip file ext) to empty_array *
            end
        }
        return empty_array
    end

It is important to note that the `source_path` parameter is the path of the T&C
directory currently being searched, *relative* to the root project path.
`$base` is the global directory holding the root directory path. We are simply
constructing the T&C directory path, reading the file names, and shaving off the file extensions to give us  the T&C name. This method needs to be called twice, once for tags and once for categories.

### Compare Current and Needed T&C

We must now compare the currently implemented T&C item to the T&C items we read
from the files in order to find any discrepencies and add missing items.

    def compile_post_data(data_array)
        data_array.each do |ITEM|
            * if CATGRY not in existing category list  *
                * append CATGRY to @pcat_list *
            end
            * converted_tags_string *.split(",").each do |TAG|
                TAG = * strip whitespace from TAG *
                * if TAG not in existing tags list *
                    * append TAG to @ptag_list *
                end
            end
        end
    end

`@pcat_list`, `@ptag_list` are the arrays containing the respective T&C that needs to be implemented. The `data_array`
parameter refers to the master list which is passed in and parsed. This method was written to take care of both tags
and categories so it only needs to be called once.

### Constructing T&C Files and YAML Entries

The `compile_post_data` function gave us the T&C items to be added in the form of the arrays `@pcat_list` and
`@tcat_list`. The final step is to create a file and a YAML entry for each of the T&C items that needs to be added.

    def construct(type, data_array)
        dpath = * path of category/tag directory *
        * if cat/tag dir doesn't exist *
            FileUtils.mkdir_p(* directory path *)
        end

        ytype = type  # either "tag" or "category"
        case type
        * convert "tag"/"category" to "tags"/"categories" *
        end
        yfname = * ../_data/categories or ../_data/tags *

        data_array.each do |ITEM|
            fname = * ../_data/tags/ITEM.md *
            newfile = * open file in WRITE mode *
            * write Markdown text specified in INFRASTRUCTURE *
            newfile.close()

            ycfile = * open cats/tags.yml file in APPEND mode*
            * write Markdown text specified in INFRASTRUCTURE *
            ycfile.close()
        end
    end

Due to the way that the YAML files were named this method requires translating "tag" and "category" to their plural
tense. This is one inefficiency that I may look into should I decide to optimize the plugin.

Missing directories are first created. The required YAML front
matter is explained in the infrastructure description above. I decided to automatically capitalize T&C items and
replace hyphens with spaces when writing in each items `name:` attribute, but this is up to the programmer. The `type`
parameter is a string that should have the value `tag` or `category` in order
for the function to point to the correct YAML file in the `_data` directory.

## Implementing the Plugin

As long as you have constructed the plugin as instructed by Jekyll standards, and you have placed the plugin in the
root `_plugins` directory, Jekyll will be able to find and execute the code when the development server is run. If
Jekyll produces any errors, or files end up being created in the wrong place make sure you double check your syntax
and directory paths for any mistakes.

This code was written as a hack to solve the automation problem and I was pretty much learning Ruby as I went, so if
you have any suggestions or fixes, feel free to comment.

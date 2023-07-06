---
title: Re-Associating Vagrant to your VM
layout: post
date: 2016-05-10
category: blog
tags: [devops, vagrant, virtual-machine]
author: ericsu
---

If you notice that vagrant is no longer connecting to your box, or vagrant is trying to create a new box
and telling you that a box with the same name already exists you can check to make sure
that your existing vagrant box gets re-associated. _(I'm using vagrant version 1.8.1)_

1.  Find your box's ID by running `vboxmanage list vms` in your terminal.

    This should return something along the lines of:

        "box1" {########-####-####-####-############}
        "box2" {########-####-####-####-############}

2.  With the vagrant ID, go to `.vagrant/machines/default/virtualbox` within your project directory
    and find the file `id`. If there is no such file, you will have to create it.

3.  Paste the ID so it is the first and only line in the file. _(Do NOT include the brackets)_

4.  Save the file and you should be able to run `vagrant up` just fine.

_Note: If your `.vagrant/machines/default/virtualbox` directory is empty, or is missing the `private_key` file, you will
need to destroy and remake the box (unless you have a backup of the private key)`_

_Credits to [this StackOverflow thread](http://stackoverflow.com/questions/9434313/how-do-i-associate-a-vagrant-project-directory-with-an-existing-virtualbox-vm)
and [this article (outdated)](http://www.grasmash.com/article/restoring-accidentally-deleted-vagrant-directory)_

---
title: Quick Tip - Defining Source Folders in PyCharm
category: tech
tags: [python, pycharm, web-development]
---

If you're getting unresolved reference warnings in your project but it's simply because you're importing a module
from a directory that's a child of the root, you can specify a folder as a "source folder". This will let PyCharm
know that some of your modules are rooted from that source folder rather than the root.
An example of this is when you decide to define your apps and modules in a subdirectory
so your modules' source is `root/subdirectory` rather than `root/`.

If you don't need to define an entire source folder, you can check
[JetBrains' "Resolving References" guide](https://www.jetbrains.com/pycharm/help/resolving-references.html).

1. Go to "Preferences -> Project: 'project_name'" and open "Project Structure"
2. You will see your project structure, a row labelled "Mark as: " with four categories: Sources, Excluded, Templates, Resources, and a column that says "Add Content Root" at the top.

    <img src="/images/blog/posts/pycharm-project-structure.png" alt="PyCharm project structure" style="max-height: 400px">

3. Select the folder that you want to label as a source, then select the "Sources" label in the "Mark as:"
row.

4. Your new source folder should now be listed in the column that says "Add Content Root" at the top under the "Source Folders" category.

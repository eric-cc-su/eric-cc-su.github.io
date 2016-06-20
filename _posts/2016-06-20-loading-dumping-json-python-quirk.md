---
title: Dumping Nested Dictionaries to JSON for Python+Django
category: tech
tags: [python, JSON, django, dictionaries, dict, dump]
---

Disclaimer: I'm using a Python/Django back-end and using Django to handle a MySQL database.

I've been working with nested dictionaries lately and I need to load and dump these dictionaries into JSON
in order to save it on the database. A problem came up where I would try to add a new top-level key to my dictionary
where the key's value was a dictionary and each key in the sub-dictionary had its own dictionary. 
The data structure looks like this:

    dict = {
        "key0": {"subkey0_0": "value", ...},
        "key1": {
            "subkey1_0": {key: val, key1: val1},
            "subkey1_1": {key: val, key1: val1},
        }
        "new_key": {
            "newsubkey0": {key: val, ...},
            "newsubkey1": {key: val, ...}
        }
    }

I would dump the new dictionary, save it to an object, and save that
object to the database. However, I noticed that when I pulled the object back out of the database and loaded
the dictionary, the new key and dictionary were no longer there. Now if you notice: I did not end the `new_key` 
dictionary with a comma on the last key-value pair. Normally you would expect this to be the proper convention. 
However when I add that trailing comma so the `new_key` dictionary looks like so:

    "new_key": {
        "newsubkey0": {...},
        "newsubkey1": {...},
    }

Everything works fine. I have yet to confirm that this is legit, so if you have any more insight please comment below
 because I would really like to know the reason for this questionable behavior.
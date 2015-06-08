---
title: Remapping Your Mac OS X Keyboard
category: tech
layout: posts
tags: [OS-X, keyboard, apple, macbook]
---

I've recently decided to [open myself up to Apple]({% post_url 2015-06-01-joining-apple %}) and buy myself a 
MacBook Pro. I figured the Unix base, the isolationist nature of OS X and iOS development, the tools available to 
artists, and the competitive hardware and battery life would make it worth it to finally invest in. Long story short,
 It's been 8 days since I picked it up and I love it. Everything is as great as a I anticipated...it's just that my 
 habits with Windows keyboard layouts have left me limping a little. 

Since I'm keeping my Windows machines I've decided that remapping my OS X keyboard is necessary to get my Mac 
productivity up to par with Windows and reduce the possible confusion when switching between machines. You will only 
need one piece of software for and yes...you should get this particular software. 
[Karabiner](https://pqrs.org/osx/karabiner/), formally known as KeyRemap4MacBook, is the 
top keyboard remapping tool for OS X according to my couple of Google searches. Once you open the program, you are 
presented with a huge list of typical re-mappings that cover much more than you may need. 

To re-map a key all you need to do is scroll down the to the key you want to re-map, click the checkbox next to the 
new re-mapping you want and you're good to go. You don't even need to click an "apply" or "save" button because the 
changes are implemented right away. As a heavy Windows user here is the only thing I changed:
 
* Fn key to Command key (including Fn + letter --> Command + letter)

If you're looking at your keyboard you may be wondering: ***but now you have two left-hand Command keys and no function
(Fn) key!***

Sure, I'm leaving out the function key, but when you look at Apple's list of 
[keyboard shortcuts](https://support.apple.com/en-us/HT201236) you can see that the function key is only necessary 
for forward delete and page scrolling. The other purpose of the function key is to allow you to use the F# keys as 
function keys rather than OS X shortcut keys. However the typical user does not need these functionalities, and 
although I do like using the "Home" and "End" keys on full keyboards, I can live without them. If you are dead-set 
on using those F# keys as function keys you might as well change your settings to switch them to full-time function 
keys because I'm assuming you want to use them somewhat often. (Hint: Ctrl + R works just as well as F5 for 
refreshing web pages and the 
[Google Chrome developer shortcuts](https://developer.chrome.com/devtools/docs/shortcuts) are different anyways)

Why did I keep the left-hand Command key as a Command key? Two words: **Alt + Tab**. As a Windows user,
 my finger is primarily attracted to the key on the left-hand side of the space bar for Alt + Tab related shortcuts.
 
Now why did I keep the left-hand control key as a control key? Quite simply because the control key is still relevant
. For development, Ctrl + C stops programs and development server instances and in 
[JetBrains](https://www.jetbrains.com) IDEs the control key can still be used for Windows themed shortcuts (this 
confused me at first but you can change the settings to use an OS X keymap).

If you're not quite comfortable with my set-up you can keep playing around with Karabiner yourself to re-map your 
keyboard the way you want. 
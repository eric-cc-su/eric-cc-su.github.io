---
title: "The 10 Most Common Mistakes That Python Developers Make"
layout: post
date: 2016-06-24
category: blog
description: Python can be misinterpreted by beginners and regular programmers alike. This article presents a top 10 list of mistakes that even experienced Python programmers can make.
meta_description: Python can be misinterpreted by beginners and regular programmers alike. This article presents a top 10 list of mistakes that even experienced Python programmers can make.
referrer: 'Originally posted on <a href="https://www.toptal.com/python/top-10-mistakes-that-python-programmers-make">Toptal</a>'
referrer_author: 'By <a href="https://www.toptal.com/resume/martin-chikilian">Martin Chikilian</a> - Python Software Engineer @ <a href="https://www.toptal.com/">Toptal</a>'
meta_image: "{{ site.url }}/assets/images/posts/toptal-bi-python10.png"
tcard_type: summary_large_image
tags: [python, programming]
---

<p>
    <a href="https://www.python.org/">Python</a> is an interpreted, object-oriented,
    high-level programming language with dynamic semantics. Its high-level built in data structures, combined
    with dynamic typing and dynamic binding, make it very attractive for
    <a href="https://en.wikipedia.org/wiki/Rapid_application_development">Rapid Application Development</a>, as well
    as for use as a scripting or glue language to connect existing components or services. Python supports modules
    and packages, thereby encouraging program modularity and code reuse.</p>
</p>

<h2>About this article</h2>
<p>
    Python’s simple, easy-to-learn syntax can mislead
    <a href="https://www.toptal.com/python/job-description">Python developers</a> – especially those who are newer
    to the language – into missing some of its subtleties and underestimating the power of the
    <a href="https://www.toptal.com/python/why-are-there-so-many-pythons">diverse Python language</a>.
</p>
<p>
    With that in mind, this article presents a “top 10” list of somewhat subtle, harder-to-catch mistakes
    that can bite even some more <a href="https://www.toptal.com/python">advanced Python developers</a> in the rear.
</p>
<p>
    <img class="img-responsive" src="{{ site.url }}/assets/images/posts/toptal-bi-python10.png" alt="This Python found himself caught in an advanced Python programming mistakes.">
</p>

<p>
    <em>
        (Note:  This article is intended for a more advanced audience than
        <a href="http://www.onlamp.com/pub/a/python/2004/02/05/learn_python.html" rel="noopener noreferrer" target="_blank">
            Common Mistakes of Python Programmers</a>,
        which is geared more toward those who are newer to the language.)
    </em>
</p>

<h2>Common Mistake #1: Misusing expressions as defaults for function arguments</h2>
<p>
    Python allows you to specify that a function argument is
    <em>optional</em> by providing a <em>default value</em> for it.  While this is a great feature of the language,
    it can lead to some confusion when the default value is
    <em><a href="https://docs.python.org/2/reference/datamodel.html" rel="noopener noreferrer" target="_blank">mutable</a></em>.
    For example, consider this Python function definition:
</p>
<pre><code>&gt;&gt;&gt; def foo(bar=[]):        # bar is optional and defaults to [] if not specified
...    bar.append("baz")    # but this line could be problematic, as we'll see...
...    return bar</code></pre>
<p>
    A common mistake is to think that the optional argument will be set to the specified default expression
    <em>each time</em> the function is called without supplying a value for the optional argument.
    In the above code, for example, one might expect that calling <code>foo()</code> repeatedly
    (i.e., without specifying a <code>bar</code> argument) would always return <code>'baz'</code>, since
    the assumption would be that <em>each time</em> <code>foo()</code> is called (without a <code>bar</code>
    argument specified) <code>bar</code> is set to <code>[]</code> (i.e., a new empty list).
</p>
<p>But let’s look at what actually happens when you do this:</p>

<pre><code>&gt;&gt;&gt; foo()
["baz"]
&gt;&gt;&gt; foo()
["baz", "baz"]
&gt;&gt;&gt; foo()
["baz", "baz", "baz"]
</code></pre>

<p>Huh?  Why did it keep appending the default value of <code>"baz"</code> to an <em>existing</em> list each time <code>foo()</code> was called, rather than creating a <em>new</em> list each time?</p>

<p>The more advanced Python programming answer is that <em>the default value for a function argument is only evaluated once, at the time that the function is defined.</em>  Thus, the <code>bar</code> argument is initialized to its default (i.e., an empty list) only when <code>foo()</code> is first defined, but then calls to <code>foo()</code> (i.e., without a <code>bar</code> argument specified) will continue to use the same list to which <code>bar</code> was originally initialized.</p>

<p>FYI, a common workaround for this is as follows:</p>

<pre><code>&gt;&gt;&gt; def foo(bar=None):
...    if bar is None:		# or if not bar:
...        bar = []
...    bar.append("baz")
...    return bar
...
&gt;&gt;&gt; foo()
["baz"]
&gt;&gt;&gt; foo()
["baz"]
&gt;&gt;&gt; foo()
["baz"]
</code></pre>

<h2 id="common-mistake-2-using-class-variables-incorrectly">Common Mistake #2: Using class variables incorrectly</h2>

<p>Consider the following example:</p>

<pre><code>&gt;&gt;&gt; class A(object):
...     x = 1
...
&gt;&gt;&gt; class B(A):
...     pass
...
&gt;&gt;&gt; class C(A):
...     pass
...
&gt;&gt;&gt; print A.x, B.x, C.x
1 1 1
</code></pre>

<p>Makes sense.</p>

<pre><code>&gt;&gt;&gt; B.x = 2
&gt;&gt;&gt; print A.x, B.x, C.x
1 2 1
</code></pre>

<p>Yup, again as expected.</p>

<pre><code>&gt;&gt;&gt; A.x = 3
&gt;&gt;&gt; print A.x, B.x, C.x
3 2 3
</code></pre>

<p>What the <em>$%#!&amp;</em>??  We only changed <code>A.x</code>.  Why did <code>C.x</code> change too?</p>

<p>In Python, class variables are internally handled as dictionaries and follow what is often referred to as <a href="http://python-history.blogspot.com.ar/2010/06/method-resolution-order.html" rel="noopener noreferrer" target="_blank">Method Resolution Order (MRO)</a>.  So in the above code, since the attribute <code>x</code> is not found in class <code>C</code>, it will be looked up in its base classes (only <code>A</code> in the above example, although Python supports multiple inheritance).  In other words, <code>C</code> doesn’t have its own <code>x</code> property, independent of <code>A</code>.  Thus, references to <code>C.x</code> are in fact references to <code>A.x</code>. This causes a Python problem unless it’s handled properly. Learn more aout <a href="https://www.toptal.com/python/python-class-attributes-an-overly-thorough-guide">class attributes in Python</a>.</p>

<h2 id="common-mistake-3-specifying-parameters-incorrectly-for-an-exception-block">Common Mistake #3: Specifying parameters incorrectly for an exception block</h2>

<p>Suppose you have the following code:</p>

<pre><code>&gt;&gt;&gt; try:
...     l = ["a", "b"]
...     int(l[2])
... except ValueError, IndexError:  # To catch both exceptions, right?
...     pass
...
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 3, in &lt;module&gt;
IndexError: list index out of range
</code></pre>

<p>The problem here is that the <code>except</code> statement does <em>not</em> take a list of exceptions specified in this manner.  Rather, In Python 2.x, the syntax <code>except Exception, e</code> is used to bind the exception to the <em>optional</em> second parameter specified (in this case <code>e</code>), in order to make it available for further inspection.  As a result, in the above code, the <code>IndexError</code> exception is <em>not</em> being caught by the <code>except</code> statement; rather, the exception instead ends up being bound to a parameter named <code>IndexError</code>.</p>

<p>The proper way to catch multiple exceptions in an <code>except</code> statement is to specify the first parameter as a <a href="https://docs.python.org/2/tutorial/datastructures.html#tut-tuples" rel="noopener noreferrer" target="_blank">tuple</a> containing all exceptions to be caught.  Also, for maximum portability, use the <code>as</code> keyword, since that syntax is supported by both Python 2 and Python 3:</p>

<pre><code>&gt;&gt;&gt; try:
...     l = ["a", "b"]
...     int(l[2])
... except (ValueError, IndexError) as e:
...     pass
...
&gt;&gt;&gt;
</code></pre>

<h2 id="common-mistake-4--misunderstanding-python-scope-rules">Common Mistake #4:  Misunderstanding Python scope rules</h2>

<p>Python scope resolution is based on what is known as the <a href="https://blog.mozilla.org/webdev/2011/01/31/python-scoping-understanding-legb/" rel="noopener noreferrer" target="_blank">LEGB</a> rule, which is shorthand for <strong>L</strong>ocal, <strong>E</strong>nclosing, <strong>G</strong>lobal, <strong>B</strong>uilt-in.  Seems straightforward enough, right?  Well, actually, there are some subtleties to the way this works in Python, which brings us to the common more advanced Python programming problem below.  Consider the following:</p>

<pre><code>&gt;&gt;&gt; x = 10
&gt;&gt;&gt; def foo():
...     x += 1
...     print x
...
&gt;&gt;&gt; foo()
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in &lt;module&gt;
  File "&lt;stdin&gt;", line 2, in foo
UnboundLocalError: local variable 'x' referenced before assignment
</code></pre>

<p>What’s the problem?</p>

<p>The above error occurs because, when you make an <em>assignment</em> to a variable in a scope, <em>that variable is automatically considered by Python to be local to that scope</em> and shadows any similarly named variable in any outer scope.</p>

<p>Many are thereby surprised to get an <code>UnboundLocalError</code> in previously working code when it is modified by adding an assignment statement somewhere in the body of a function.  (You can read more about this <a href="https://docs.python.org/2/faq/programming.html#why-am-i-getting-an-unboundlocalerror-when-the-variable-has-a-value" rel="noopener noreferrer" target="_blank">here</a>.)</p>

<p>It is particularly common for this to trip up developers when using <a href="https://docs.python.org/2/tutorial/datastructures.html" rel="noopener noreferrer" target="_blank">lists</a>.  Consider the following example:</p>

<pre><code>&gt;&gt;&gt; lst = [1, 2, 3]
&gt;&gt;&gt; def foo1():
...     lst.append(5)   # This works ok...
...
&gt;&gt;&gt; foo1()
&gt;&gt;&gt; lst
[1, 2, 3, 5]

&gt;&gt;&gt; lst = [1, 2, 3]
&gt;&gt;&gt; def foo2():
...     lst += [5]      # ... but this bombs!
...
&gt;&gt;&gt; foo2()
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in &lt;module&gt;
  File "&lt;stdin&gt;", line 2, in foo
UnboundLocalError: local variable 'lst' referenced before assignment
</code></pre>

<p>Huh?  Why did <code>foo2</code> bomb while <code>foo1</code> ran fine?</p>

<p>The answer is the same as in the prior example problem, but is admittedly more subtle.  <code>foo1</code> is not making an <em>assignment</em> to <code>lst</code>, whereas <code>foo2</code> is.  Remembering that <code>lst += [5]</code> is really just shorthand for <code>lst = lst + [5]</code>, we see that we are attempting to <em>assign</em> a value to <code>lst</code> (therefore presumed by Python to be in the local scope).  However, the value we are looking to assign to <code>lst</code> is based on <code>lst</code> itself (again, now presumed to be in the local scope), which has not yet been defined.  Boom.</p>

<h2 id="common-mistake-5-modifying-a-list-while-iterating-over-it">Common Mistake #5: Modifying a list while iterating over it</h2>

<p>The problem with the following code should be fairly obvious:</p>

<pre><code>&gt;&gt;&gt; odd = lambda x : bool(x % 2)
&gt;&gt;&gt; numbers = [n for n in range(10)]
&gt;&gt;&gt; for i in range(len(numbers)):
...     if odd(numbers[i]):
...         del numbers[i]  # BAD: Deleting item from a list while iterating over it
...
Traceback (most recent call last):
  	  File "&lt;stdin&gt;", line 2, in &lt;module&gt;
IndexError: list index out of range
</code></pre>

<p>Deleting an item from a list or array while iterating over it is a Python problem that is well known to any experienced software developer.  But while the example above may be fairly obvious, even advanced developers can be unintentionally bitten by this in code that is much more complex.</p>

<p>Fortunately, Python incorporates a number of elegant programming paradigms which, when used properly, can result in significantly simplified and streamlined code.  A side benefit of this is that simpler code is less likely to be bitten by the accidental-deletion-of-a-list-item-while-iterating-over-it bug.  One such paradigm is that of <a href="https://docs.python.org/2/tutorial/datastructures.html#tut-listcomps" rel="noopener noreferrer" target="_blank">list comprehensions</a>.  Moreover, list comprehensions are particularly useful for avoiding this specific problem, as shown by this alternate implementation of the above code which works perfectly:</p>

<pre><code>&gt;&gt;&gt; odd = lambda x : bool(x % 2)
&gt;&gt;&gt; numbers = [n for n in range(10)]
&gt;&gt;&gt; numbers[:] = [n for n in numbers if not odd(n)]  # ahh, the beauty of it all
&gt;&gt;&gt; numbers
[0, 2, 4, 6, 8]
</code></pre>

<p>Considering the following example:</p>

<pre><code>&gt;&gt;&gt; def create_multipliers():
...     return [lambda x : i * x for i in range(5)]
&gt;&gt;&gt; for multiplier in create_multipliers():
...     print multiplier(2)
...
</code></pre>

<p>You might expect the following output:</p>

<pre><code>0
2
4
6
8
</code></pre>

<p>But you actually get:</p>

<pre><code>8
8
8
8
8
</code></pre>

<p>Surprise!</p>

<p>This happens due to Python’s <em>late binding</em> behavior which says that the values of variables used in closures are looked up at the time the inner function is called.  So in the above code, whenever any of the returned functions are called, the value of <code>i</code> is looked up <em>in the surrounding scope at the time it is called</em> (and by then, the loop has completed, so <code>i</code> has already been assigned its final value of 4).</p>

<p>The solution to this common Python problem is a bit of a hack:</p>

<pre><code>&gt;&gt;&gt; def create_multipliers():
...     return [lambda x, i=i : i * x for i in range(5)]
...
&gt;&gt;&gt; for multiplier in create_multipliers():
...     print multiplier(2)
...
0
2
4
6
8
</code></pre>

<p>Voilà! We are taking advantage of default arguments here to generate anonymous functions in order to achieve the desired behavior.  Some would call this elegant.  Some would call it subtle.  Some hate it.  But if you’re a Python developer, it’s important to understand in any case.</p>

<h2 id="common-mistake-7-creating-circular-module-dependencies">Common Mistake #7: Creating circular module dependencies</h2>

<p>Let’s say you have two files, <code>a.py</code> and <code>b.py</code>, each of which imports the other, as follows:</p>

<p>In <code>a.py</code>:</p>

<pre><code>import b

def f():
    return b.x

print f()
</code></pre>

<p>And in <code>b.py</code>:</p>

<pre><code>import a

x = 1

def g():
    print a.f()
</code></pre>

<p>First, let’s try importing <code>a.py</code>:</p>

<pre><code>&gt;&gt;&gt; import a
1
</code></pre>

<p>Worked just fine.  Perhaps that surprises you.  After all, we do have a circular import here which presumably should be a problem, shouldn’t it?</p>

<p>The answer is that the mere <em>presence</em> of a circular import is not in and of itself a problem in Python.  If a module has already been imported, Python is smart enough not to try to re-import it.  However, depending on the point at which each module is attempting to access functions or variables defined in the other, you may indeed run into problems.</p>

<p>So returning to our example, when we imported <code>a.py</code>, it had no problem importing <code>b.py</code>, since <code>b.py</code> does not require anything from <code>a.py</code> to be defined <em>at the time it is imported</em>.  The only reference in <code>b.py</code> to <code>a</code> is the call to <code>a.f()</code>.  But that call is in <code>g()</code> and nothing in <code>a.py</code> or <code>b.py</code> invokes <code>g()</code>.  So life is good.</p>

<p>But what happens if we attempt to import <code>b.py</code> (without having previously imported <code>a.py</code>, that is):</p>

<pre><code>&gt;&gt;&gt; import b
Traceback (most recent call last):
  	  File "&lt;stdin&gt;", line 1, in &lt;module&gt;
  	  File "b.py", line 1, in &lt;module&gt;
    import a
  	  File "a.py", line 6, in &lt;module&gt;
	print f()
  	  File "a.py", line 4, in f
	return b.x
AttributeError: 'module' object has no attribute 'x'
</code></pre>

<p>Uh-oh.  That’s not good!  The problem here is that, in the process of importing <code>b.py</code>, it attempts to import <code>a.py</code>, which in turn calls <code>f()</code>, which attempts to access <code>b.x</code>.  But <code>b.x</code> has not yet been defined.  Hence the <code>AttributeError</code> exception.</p>

<p>At least one solution to this is quite trivial.  Simply modify <code>b.py</code> to import <code>a.py</code> <em>within</em> <code>g()</code>:</p>

<pre><code>x = 1

def g():
    import a	# This will be evaluated only when g() is called
    print a.f()
</code></pre>

<p>No when we import it, everything is fine:</p>

<pre><code>&gt;&gt;&gt; import b
&gt;&gt;&gt; b.g()
1	# Printed a first time since module 'a' calls 'print f()' at the end
1	# Printed a second time, this one is our call to 'g'
</code></pre>

<h2 id="common-mistake-8-name-clashing-with-python-standard-library-modules">Common Mistake #8: Name clashing with Python Standard Library modules</h2>

<p>One of the beauties of Python is the wealth of library modules that it comes with “out of the box”.  But as a result, if you’re not consciously avoiding it, it’s not that difficult to run into a name clash between the name of one of your modules and a module with the same name in the standard library that ships with Python (for example, you might have a module named <code>email.py</code> in your code, which would be in conflict with the standard library module of the same name).</p>

<p>This can lead to gnarly problems, such as importing another library which in turns tries to import the Python Standard Library version of a module but, since you have a module with the same name, the other package mistakenly imports your version instead of the one within the Python Standard Library.  This is where bad Python errors happen.</p>

<p>Care should therefore be exercised to avoid using the same names as those in the Python Standard Library modules.  It’s way easier for you to change the name of a module within your package than it is to file a <a href="http://legacy.python.org/dev/peps/" rel="noopener noreferrer" target="_blank">Python Enhancement Proposal (PEP)</a> to request a name change upstream and to try and get that approved.</p>

<h2 id="common-mistake-9-failing-to-address-differences-between-python-2-and-python-3">Common Mistake #9: Failing to address differences between Python 2 and Python 3</h2>

<p>Consider the following file <code>foo.py</code>:</p>

<pre><code>import sys

def bar(i):
    if i == 1:
        raise KeyError(1)
    if i == 2:
        raise ValueError(2)

def bad():
    e = None
    try:
        bar(int(sys.argv[1]))
    except KeyError as e:
        print('key error')
    except ValueError as e:
        print('value error')
    print(e)

bad()
</code></pre>

<p>On Python 2, this runs fine:</p>

<pre><code>$ python foo.py 1
key error
1
$ python foo.py 2
value error
2
</code></pre>

<p>But now let’s give it a whirl on Python 3:</p>

<pre><code>$ python3 foo.py 1
key error
Traceback (most recent call last):
  File "foo.py", line 19, in &lt;module&gt;
    bad()
  File "foo.py", line 17, in bad
    print(e)
UnboundLocalError: local variable 'e' referenced before assignment
</code></pre>

<p>What has just happened here?  The “problem” is that, in Python 3, the exception object is not accessible beyond the scope of the <code>except</code> block. (The reason for this is that, otherwise, it would keep a reference cycle with the stack frame in memory until the garbage collector runs and purges the references from memory.  More technical detail about this is available <a href="https://docs.python.org/3/reference/compound_stmts.html#except" rel="noopener noreferrer" target="_blank">here</a>).</p>

<p>One way to avoid this issue is to maintain a reference to the exception object <em>outside</em> the scope of the <code>except</code> block so that it remains accessible.  Here’s a version of the previous example that uses this technique, thereby yielding code that is both Python 2 and Python 3 friendly:</p>

<pre><code>import sys

def bar(i):
    if i == 1:
        raise KeyError(1)
    if i == 2:
        raise ValueError(2)

def good():
    exception = None
    try:
        bar(int(sys.argv[1]))
    except KeyError as e:
        exception = e
        print('key error')
    except ValueError as e:
        exception = e
        print('value error')
    print(exception)

good()
</code></pre>

<p>Running this on Py3k:</p>

<pre><code>$ python3 foo.py 1
key error
1
$ python3 foo.py 2
value error
2
</code></pre>

<p>Yippee!</p>

<p>(Incidentally, our <a href="https://www.toptal.com/python#hiring-guide">Python Hiring Guide</a> discusses a number of other important differences to be aware of when migrating code from Python 2 to Python 3.)</p>

<h2 id="common-mistake-10-misusing-the-del-method">Common Mistake #10: Misusing the <code>__del__</code> method</h2>

<p>Let’s say you had this in a file called <code>mod.py</code>:</p>

<pre><code>import foo

class Bar(object):
   	    ...
    def __del__(self):
        foo.cleanup(self.myhandle)
</code></pre>

<p>And you then tried to do this from <code>another_mod.py</code>:</p>

<pre><code>import mod
mybar = mod.Bar()
</code></pre>

<p>You’d get an ugly <code>AttributeError</code> exception.</p>

<p>Why?  Because, as reported <a href="https://mail.python.org/pipermail/python-bugs-list/2009-January/069209.html" rel="noopener noreferrer" target="_blank">here</a>, when the interpreter shuts down, the module’s global variables are all set to <code>None</code>.  As a result, in the above example, at the point that <a href="https://docs.python.org/2/reference/datamodel.html#object.__del__" rel="noopener noreferrer" target="_blank"><code>__del__</code></a> is invoked, the name <code>foo</code> has already been set to <code>None</code>.</p>

<p>A solution to this somewhat more advanced Python programming problem would be to use <a href="https://docs.python.org/2/library/atexit.html" rel="noopener noreferrer" target="_blank"><code>atexit.register()</code></a> instead.  That way, when your program is finished executing (when exiting normally, that is), your registered handlers are kicked off <em>before</em> the interpreter is shut down.</p>

<p>With that understanding, a fix for the above <code>mod.py</code> code might then look something like this:</p>

<pre><code>import foo
import atexit

def cleanup(handle):
    foo.cleanup(handle)


class Bar(object):
    def __init__(self):
        ...
        atexit.register(cleanup, self.myhandle)
</code></pre>

<p>This implementation provides a clean and reliable way of calling any needed cleanup functionality upon normal program termination.  Obviously, it’s up to <code>foo.cleanup</code> to decide what to do with the object bound to the name <code>self.myhandle</code>, but you get the idea.</p>

<h2 id="wrap-up">Wrap-up</h2>

<p>Python is a powerful and flexible language with many mechanisms and paradigms that can greatly improve productivity.  As with any software tool or language, though, having a limited understanding or appreciation of its capabilities can sometimes be more of an impediment than a benefit, leaving one in the proverbial state of “knowing enough to be dangerous”.</p>

<p>Familiarizing oneself with the key nuances of Python, such as (but by no means limited to) the moderately advanced programming problems raised in this article, will help optimize use of the language while avoiding some of its more common errors.</p>

<p>You might also want to check out our <a href="https://www.toptal.com/python#hiring-guide">Insider’s Guide to Python Interviewing</a> for suggestions on interview questions that can help identify Python experts.</p>

<p>We hope you’ve found the pointers in this article helpful and welcome your feedback.</p>

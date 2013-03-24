ThreadBubble
============

**Note: ThreadBubble is no longer required if you're using Thunderbird 3.1 or
newer...and you should be.**

This is a very small extension for Thunderbird that resorts the threaded view
by date when new mail arrives (similar to what gmail does). It should fix [Bug
262319](https://bugzilla.mozilla.org/show_bug.cgi?id=262319) and the 13(!)
duplicate bugs.

To Install:
-----------

* Right-click, save the file somewhere
*  In Thunderbird, click tools -> extensions
* Click Install, and find the file on your computer
* Restart Thunderbird

Frequently Asked Questions
--------------------------

**I installed the extension but nothing happens!**
The extension checks to make sure you are sorting by date before it does
anything (to keep from messing up your view if you temporarily sorted by
another column). If nothing happens after you install, that's the first thing
to check.

**Can you change the extension so it sorts by order received instead of date?**
When Thunderbird gets a new message on a thread it sorts by the date
of the first message in the thread - not the last. Since it sorts this way,
sorting by order received wouldn't do any good. Other people who think this
behavior is strange have congregated in [bug
254159](https://bugzilla.mozilla.org/show_bug.cgi?id=254159).

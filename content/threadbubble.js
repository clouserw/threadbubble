/**
 * Thanks to all the other people who wrote thunderbird extensions - most of this
 * code is cobbled together from looking at other people's code.
 */

var threadBubbleListener = {

    // When a new message arrives
    itemAdded: function(item)
     {
         setTimeout( function() {
             try {
                 var msg = item.QueryInterface(Components.interfaces.nsIMsgDBHdr);

                 // We got some new mail, woo
                 if (msg) {

                     var itemFolder = item.folder.QueryInterface(Components.interfaces.nsIMsgFolder);

                     var currentFolder = threadbubble_getCurrentFolder();

                     var itemAccount = threadbubble_getServerName(itemFolder);

                     var currentAccount = threadbubble_getServerName(currentFolder);

                     var dbview = GetDBView();

                     // If mail came in on a different account, ignore it
                     if (itemAccount != currentAccount) {
                         return;
                     }

                     // Make sure we're only updating the view if we're looking at the folder
                     // getting the mail.  Otherwise we could get mail in a completely
                     // different folder, but our current one would resort.
                     if (itemFolder.prettyName != currentFolder.prettyName) {
                         return;
                     }

                     // If they aren't sorted by date, this extension is probably going to be
                     // annoying.  This way if you sort by sender and get new mail, it doesn't
                     // re-sort your inbox while you're messing with stuff.
                     if (dbview.sortType != nsMsgViewSortType.byDate) {
                         return;
                     }

                     // Save our current sort order
                     var sortOrder = dbview.sortOrder;

                     // Resort the messages by date.  Firefox3 changed the parameter
                     // of MsgSortThreadPane so we've got to do special detection here
                     if (typeof MsgSortByDate == 'function') {
                         MsgSortByDate(); // firefox 2
                     } else {
                         MsgSortThreadPane('byDate');
                     }


                     // If the sort order is reversed, we have to flip it back, since
                     // MsgSortByDate() overrides it
                     if (sortOrder == nsMsgViewSortOrder.descending) {
                         eval(remotecode);
                         MsgReverseSortThreadPane();

                         // Scroll up so the new mail shows.  @todo this should probably only scroll if
                         // they are at the top/bottom already...
                         ScrollToMessage(nsMsgNavigationType.firstMessage, true, false);
                     } else {

                         ScrollToMessage(nsMsgNavigationType.lastMessage, true, false);

                     }
                 }

             } catch (exception) {
                 dump("[threadbubble] Exception: " + exception + "\n");
             }
         }, 1);
     },

    // Thunderbird 3 implements msgAdded instead of itemAdded
    msgAdded: function(item)
     {
         this.itemAdded(item);
     },

    // Other TB3 methods in this interface
    msgsDeleted:             function() {},
    msgsMoveCopyCompleted:   function() {},
    folderDeleted:           function() {},
    folderMoveCopyCompleted: function() {},
    folderRenamed:           function() {},
    itemEvent:               function() {},

    // TB2 only
    itemDeleted:             function() {},
    itemMoveCopyCompleted:   function() {}

};


function threadBubbleInit() {

    try {

        // Fire up our mail session
        var notificationService = Components.classes["@mozilla.org/messenger/msgnotificationservice;1"].getService(Components.interfaces.nsIMsgFolderNotificationService);

        // Add the threadbubble listener
        notificationService.addListener(threadBubbleListener);

        // remove to avoid duplicate initialization
        removeEventListener("load", threadBubbleInit, true);

    } catch (exception) {
        dump("[threadbubble] Exception: " + exception + "\n");
    }

}

addEventListener("load", threadBubbleInit, true);

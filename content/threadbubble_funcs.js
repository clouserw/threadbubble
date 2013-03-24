
/**
 * Get the name of the currently selected folder.
 *
 * Example: Inbox
 */
function threadbubble_getCurrentFolder() {

        var folders = GetSelectedMsgFolders();

        if (folders.length > 0) {
            return folders[0];
        }

	dump("[threadbubble] Strangenes: Couldn't find a current folder.\n");

	return null;
}

/**
 * Get the name of the currently chosen server.  This is the name the user entered
 * for the account.  (Inspired by mailboxalert extension)
 */
function threadbubble_getServerName(folder) {

    i = 0;

    // @todo 10 is totally arbitrary, just to keep us from hitting an infinite loop
	while(!folder.isServer && i < 10) {
		folder = folder.parent;
		i++;
	}
	
	return folder.prettiestName;
}

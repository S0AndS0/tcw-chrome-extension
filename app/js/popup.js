'use strict';
// null defaults to current window
chrome.tabs.getSelected(null, (tab) => {
    const title = tab.title;
    const url = tab.url;
    const saveLink = document.getElementById('save-link');
    if (saveLink !== null) {
        saveLink.href = `http://www.thiscodeworks.com/newlink?url=${url}&pagetitle=${title}`;
    }
});
//# sourceMappingURL=popup.js.map
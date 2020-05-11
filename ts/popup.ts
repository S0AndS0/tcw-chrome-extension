'use strict';


// null defaults to current window
chrome.tabs.getSelected(null, (tab: chrome.tabs.Tab) => {
  const title: string = tab.title;
  const url: string = tab.url;
  const saveLink = <HTMLAnchorElement> document.getElementById('save-link');

  if (saveLink !== null) {
    saveLink.href = `http://www.thiscodeworks.com/newlink?url=${url}&pagetitle=${title}`;
  }
});

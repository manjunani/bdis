// content.js
chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
  var bookmarks = flattenBookmarkTree(bookmarkTreeNodes);
  var bookmarksid = document.getElementById('bookmarks');
  bookmarks.forEach(function (bookmark) {
    var card = createCard(bookmark);
    bookmarksid.appendChild(card);
  });
});

chrome.topSites.get(function (topSites) {
  var topSitesid = document.getElementById('topSites');
  topSites.forEach(function (topSite) {
    var card = createCard(topSite);
    topSitesid.appendChild(card);
  });
});

function flattenBookmarkTree(bookmarkTreeNodes) {
  var bookmarks = [];

  function traverseNodes(nodes) {
    nodes.forEach(function (node) {
      if (node.url) {
        bookmarks.push(node);
      } else if (node.children) {
        traverseNodes(node.children);
      }
    });
  }

  traverseNodes(bookmarkTreeNodes);
  return bookmarks;
}

function createCard(bookmark) {
  var card = document.createElement('div');
  card.className = 'card';
  card.innerHTML =
    "<a style='text-decoration:none; color: darkblue;' href='" +
    bookmark.url +
    "'>" +
    bookmark.title +
    '</a>';
  return card;
}

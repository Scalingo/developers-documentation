function replaceUrl(url) {
  var location = new URL(window.location);
  var newBaseURL = `${location.protocol}//${location.host}/`;
  var prodBaseURL = 'https://developers.scalingo.com/';
  var new_url = url.replace(prodBaseURL, newBaseURL);

  return new_url;
}

define(['docsearch'], function (docsearch) {
  var search = docsearch({
    apiKey: '01dfcfcaa73e641dcec0272579da54c0',
    appId: 'IENC6UT9AA',
    indexName: 'scalingo',
    container: '#search-input',
    transformItems(items) {
      return items.map((item) => {
        item.url = replaceUrl(item.url);
        return item;
      });
    },
  })
})


function fetchJSON(url) {
  return fetch(url).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
}

function marvelFactory(config) {
  return function(path) {
    var timestamp = new Date().getTime();
    var hash = CryptoJS.MD5(timestamp + config.privateKey + config.publicKey).toString();
    var url = config.hostname + '/v' + config.version + '/public' + path + '?apikey=' + config.publicKey + '&ts=' + timestamp + '&hash=' + hash;
    console.log(url);

    return fetchJSON(url);
  }; //missing semicolon?
}

// Get an instance of the marvel api
var marvel = marvelFactory({
  hostname: 'http://gateway.marvel.com',
  publicKey: '9228da88dd1a2a154f40ddbaf5f7d37b',
  privateKey: '1a274b4e099b1110ac94cb3772e82705be286c3f',
  version: '1'
});

//  STRUCTURE OUTLINE (BODY BY API)
//    <comics>
//
//      <comic>
//        <thumbnail> </thumbnail>
//        <title>  </title>
//        <price> </price>
//      </comic>

//      <comic>
//        <thumbnail> </thumbnail>
//        <title>  </title>
//        <price> </price>
//      </comic>

//      <comic>
//        <thumbnail> </thumbnail>
//        <title>  </title>
//        <price> </price>
//      </comic>
//
//    </comics>

// in this section I used some of the $. $.create $.createText to eliminate some of the document.createElement etc. Not sure that it really matters much but thought I'd point that out.
marvel('/comics').then(function(json){
json.data.results.map(function(comic){

var comicContainer= document.createElement('comic'); //missing semicolon

var imgPath = comic.thumbnail.path + '.' + comic.thumbnail.extension;
var comicTitle = comic.title;
var prices = comic.prices[0].price;

var img = document.createElement('img');
img.setAttribute('src', imgPath);

var titleTag = document.createElement('comic-title');
var priceTag = document.createElement('price-tag');
var buybtn = document.createElement('buybtn');

var buyTextNode = document.createTextNode('BUY');
var titleTextNode = document.createTextNode(comicTitle);
var priceTextNode = document.createTextNode('Price: $' + prices);

titleTag.appendChild(titleTextNode);
priceTag.appendChild(priceTextNode);
buybtn.appendChild(buyTextNode);

comicContainer.appendChild(img);
comicContainer.appendChild(titleTag);
comicContainer.appendChild(priceTag);
comicContainer.appendChild(buybtn);

var container = document.querySelector('comics');
container.appendChild(comicContainer);

  });
});

console.log('Hello Friends, Test Text'); //missing semicolon
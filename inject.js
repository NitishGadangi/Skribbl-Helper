// inject script.js to page
var script = document.createElement('script');
script.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(script);

// append 'hints' div
var hints = document.createElement('div');
hints.id = "hints";
hints.innerText = "";
hints.style="color:white; word-wrap: break-word;";
var gameHeader= document.getElementById("round").parentElement;
gameHeader.parentElement.insertBefore(hints, gameHeader.nextSibling);

// load words list
script.onload = function() {
  script.parentNode.removeChild(script);
  var e = document.createEvent("CustomEvent");;
  var xhr = new XMLHttpRequest;
  xhr.open("GET", chrome.runtime.getURL("words.json"));
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      e.initCustomEvent("loadWordsEvent", true, true, JSON.parse(xhr.responseText));
      document.dispatchEvent(e);
    }
  };
  xhr.send();
};

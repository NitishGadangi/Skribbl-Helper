var currentWordElement = document.getElementById('currentWord');

// start listening for changes in the current word
if(window.addEventListener) {
  currentWordElement.addEventListener('DOMSubtreeModified', handler, false);
} else if(window.attachEvent) {
  currentWordElement.attachEvent('DOMSubtreeModified', handler); // IE
}

// re-search hints upon current word change
function handler() {
  var text = currentWordElement.innerText;
  if(text && text.includes('_')) {
    matching_words = find_matching_words(text);
    console.log(matching_words.slice(0, 100));
    document.getElementById("hints").innerHTML = "<b><i><u>Hints (" + matching_words.length + "):</u> " + matching_words.slice(0, 100).toString() + "</i></b>";
  }
}

var words;

// load words from file
document.addEventListener('loadWordsEvent', function (e)
{
    words = e.detail;
});

function is_pattern_matching(pattern, text) {
  if (pattern.length != text.length) {
    return false;
  }
  for (var i=0; i < pattern.length; i++) {
    if (pattern[i] != '_' && pattern[i] != text[i]) {
      return false;
    }
  }
  return true;
}

function find_matching_words(pattern) {
  if (!(pattern.length in words)) {
    return [];
  }
  var res=[];
  for (var i=0; i < words[pattern.length].length; i++) {
    if (is_pattern_matching(pattern, words[pattern.length][i])) {
      res.push(words[pattern.length][i]);
    }
  }
  return res;
}

// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here

  // length of original json
  var length = json.length;

  // current charactor position of the json
  var charPos = 0;

  var nextChar = function(charPos) {
    return json[charPos + 1];
  };

  var parseString = function(str) {
    return String(str);
  };

  var parseNumber = function(str) {
    return Number(str);
  };

  // Figure out the top level value
  switch (json[0]) {
  case '\"':
    return parseString(json.slice(1, length - 2));
    break;
  case '{':

  default:
    break;
  }
  
  '\"'
  '9' // number -, 0~9
  '{'
  '['
  't' // true
  'f' // false
  'n' // null



};

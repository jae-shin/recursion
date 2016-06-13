// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here

  // length of original json
  var length = json.length;

  // current charactor position of the json
  var pos = 0;

  // returns next char that is not a irrelevant space
  var nextChar = function() {
    // TODO: need to account for spaces
    // 
    return json[pos];
  };

  var findPos = function(str) {
    if (str)
  };

  var parseObject = function(str) {
    pos++;

    if (nextChar() === '}') {
      return {};
    } else {
      return parseMember(str.slice(1, -1));
    }
  };

  var parseMember = function(str, obj) {
    obj = obj || {};

    if (str.length === 0) {
      return obj;
    }
    
    pos++;
    while (nextChar() !== '\"') {
      pos++;
    }
    while (nextChar() !== ':') {
      pos++;
    }
    var end = findPos();
    obj = _.extend(obj, parsePair(str.slice(0, findPos() + 1)));
    while (nextChar() !== ',') {
      pos++;
    }
    while (nextChar() === ' ') {
      pos++;
    }
    return parseMember(str.slice(pos), obj);
  };

  var parsePair = function(str, obj) {


  };

  var parseArray = function(str) {
    var result = [];

    if (nextChar() === ']') {
      return result;
    } else {
      if (nextChar() === '\"') {

      }
    }
    
  };

  var parseString = function(str) {
    return String(str);
  };

  var parseNumber = function(str) {
    return Number(str);
  };

  // var charTest = function(pos) {
  //   if (json[pos] === '[') {
  //     return parseArray(json.slice(pos + 1));
  //   } else if (json[pos] === '{') {
  //     return parseObject(json.slice(pos + 1));
  //   }
  // };

  // return charTest(0);
  
  if (json[0] === '[') {
    return parseArray(json);
  } else if (json[0] === '{') {
    return parseObject(json);
  } 

/*  '\"'
  '9' // number -, 0~9
  '{'
  '['
  't' // true
  'f' // false
  'n' // null
*/

};

// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var pos = 0;

  var reg = {
    arr: /\[.*\]/,
    obj: /\{.*\}/,
    str: /\"[A-Za-z]*\"/,
    boo: /(true|false)/, 
    num: /-?\d+\.?\d*/,
    null: /null/
  };

  var parsePair = function(str) {
    // key : value pair
    var result = {};
    var match = str.match(/([^:]+):([^:]+)/);
    
    pos += match[1].length + 1;
    if (json[pos] === ' ') {
      pos++;
    }
    result[parseString(match[1])] = charTest(pos);
    pos += match[2].length + 1;

    return result;
  };

  // extend obj properties
  var extend = function(obj) {
    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  var parseMember = function(str) {
    var result = {};

    if (str === '') {
      return result;
    }

    //var regPair = /([^:]+):([^,]+)/;
    var regPair = /([^:]+):(\[[^\]]*\] | \"[^\"]*\" | \{[^\}]*\} | [^,]+)/;
    var match = str.match(regPair);
    
    //pos += match[0].length + 1;
    
    return extend(result, parsePair(match[0]), parseMember(json.slice(pos, -1))); 

  };

  var parseElement = function(str) {
    var result = [];
    var elements = str.split(',');

    // for (var i = 0; i < elements.length; i++) {
    //   // result.push(charTest(pos));
    //   result.push(parseValue(elements[i]));
    //   pos += elements[i].length + 1;
    //   if (json[pos] === ' ') {
    //     pos++;
    //   }
    // }
    // return result;

    for (var i = 0; i < elements.length; i++) {
      result.push(parseValue(elements[i].trim()));
    }

    return result;
  };

  var parseValue = function(str) {
    return parseJSON(str);
  };

  var parseArray = function(str) {
    //empty
    if (str.length === 2) {
      return [];
    }

    // not empty 
    nextChar();
    return parseElement(str.slice(1, -1));
  };

  var parseObject = function(str) {
    //empty
    if (str.length === 2) {
      return {};
    }
    //not empty
    nextChar();
    return parseMember(str.slice(1, -1));

  };

  var parseString = function(str) {
    return str.trim().slice(1, -1);
  };

  var parseBoolean = function(str) {
    if (str === 'true') {
      return true;
    } else {
      return false;
    }
  };

  var parseNull = function(str) {
    return null;
  };

  var parseNum = function(str) {
    return Number(str);
  };

  var nextChar = function() {
    pos++;
  };

  var charTest = function(pos) {
    if (json[pos] === '[') {
      return parseArray(reg.arr.exec(json.slice(pos))[0]);
    } else if (json[pos] === '{') {
      return parseObject(reg.obj.exec(json.slice(pos))[0]);
    } else if (json.slice(pos, pos + 4) === 'true' || json.slice(pos, pos + 5) === 'false') {
      return parseBoolean(reg.boo.exec(json.slice(pos))[0]);
    } else if (json.slice(pos, pos + 4) === 'null') {
      return parseNull(reg.null.exec(json.slice(pos))[0]);
    } else if (json.slice(pos).search(reg.num) > -1) {
      return parseNum(reg.num.exec(json.slice(pos))[0]);
    } else {
      return parseString(reg.str.exec(json.slice(pos))[0]);
    } 
  };

  return charTest(pos);


};
// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	/*	
	Primitives: number, string, boolean 
	Other: array [ ], object { }

	SKIP: 
	undefined, function, symbol
		(ignored in an object OR converted to null in an array)
  non-enumerable properties are ignored
  */

  // Base case
  switch (typeof obj) {
  case 'undefined':
  case 'function':
  case 'symbol':
    return undefined;
    break;
  case 'number':
  case 'boolean':
    return '' + obj;
    break;
  case 'string':
    return '\"' + obj + '\"';
  default:
    break;
  }

  // obj is null
  if (obj === null) {
    return 'null';
  }

  var typesToSkip = ['undefined', 'function', 'symbol'];

  // Recursive case
  // obj is an array
  if (Array.isArray(obj)) {
    var iteratorArr = function(result, item) {
      if (_.contains(typesToSkip, (typeof item))) {
        return result + ',' + 'null';
      }
      result = result + ',' + stringifyJSON(item);
      return result;
    };
    var innerString = _.reduce(obj, iteratorArr, '').slice(1);
    return '[' + innerString + ']';
  } else if (typeof obj === 'object') {
    // obj is an object
    var iteratorObj = function(result, val, key) {
      // skip properties that are one of undefined, function, symbol
      if (_.contains(typesToSkip, (typeof val))) {
        return result;
      }
      result = result + ',' + stringifyJSON(key) + ':' + stringifyJSON(val);
      return result;
    };
    var innerString = _.reduce(obj, iteratorObj, '').slice(1);
    return '{' + innerString + '}';
  } else {
    // Termination case
    alert('Error: missed a case!');
  }

};




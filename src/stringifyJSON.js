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
    console.log('you missed a case!');
  }

};

/*
var stringifiableObjects = [
  9,
  null,
  true,
  false,
  'Hello world',
  [],
  [8],
  ['hi'],
  [8, 'hi'],
  [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999],
  [8, [[], 3, 4]],
  [[[['foo']]]],
  {},
  {'a': 'apple'},
  {'foo': true, 'bar': false, 'baz': null},
  {'boolean, true': true, 'boolean, false': false, 'null': null },
  // basic nesting
  {'a': {'b': 'c'}},
  {'a': ['b', 'c']},
  [{'a': 'b'}, {'c': 'd'}],
  {'a': [], 'c': {}, 'b': true}
];

console.log(stringifyJSON(stringifiableObjects[5]));
*/



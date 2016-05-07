// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  // document.body, element.childNodes, element.classList
  
  var recursiveFunc = function(element, className) {
    var result = [];

    // check element itself
    var classList = element.classList;
    if (classList && classList.contains(className)) {
      result.push(element);
    }

    var childNodes = element.childNodes;
    
    // Base case
    // check if childNodes is null
    if (!childNodes) {
      return result;
    }

    // Recursive case
    _.each(childNodes, function(item) {
      result = result.concat(recursiveFunc(item, className));
    });
    return result;
  };

  return recursiveFunc(document.body, className);
};

// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  // document.body, element.childNodes, element.classList
  var result = [];

  var recursiveFunc = function(element, className) {
    // check element itself
    var classList = element.classList;
    if (classList && classList.contains(className)) {
      result.push(element);
    }

    var childNodes = element.childNodes;
    // Base case
    // check if childNodes is null
    if (!childNodes) {
      return;
    }

    // Recursive case
    _.each(childNodes, function(item) {
      recursiveFunc(item, className);
    });
  };

  recursiveFunc(document.body, className);
  return result;
};

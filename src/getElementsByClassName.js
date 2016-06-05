// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, element) {
  // your code here
  // use document.body, element.childNodes, element.classList
  element = element || document.body;

  var result = [];

  // Base Case
  var classList = element.classList;
  if (classList && classList.contains(className)) {
    result.push(element);
  }

  var childNodes = element.childNodes;
  
  if (childNodes) {
    _.each(childNodes, function(child) {
      result = result.concat(getElementsByClassName(className, child));
    });
  }

  return result;
};

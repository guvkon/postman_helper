# Postman Helper

## Description
Tool which adds some helpful functions to test JSON responses in Postman/Newman.

## How to Use?
Copy contents of `/dist/postman_helper.min.js` and add as a global variable to Postman (e.g. `postman_helper`). Then use it like so:
```javascript
eval(globals.postman_helper);
var tester = new Tester();

tester.isResponseCorrect({
  message: '{{response_message}}',
  elements: [
    {id: 10, name: 'First!'},
    {id: 17, name: 'Second value'}
  ],
  missingFromResponse: undefined
});
```

[Postman style variables](http://blog.getpostman.com/2014/02/20/using-variables-inside-postman-and-collection-runner/) (`{{some_variable}}`) are supported.

### List of Tester methods/fields:
#### `isResponseCorrect(referenceResponse)`

Adds a test which asserts response based on `referenceElement` object provided.

#### `addTest(name, result)`
A small wrapper method around `tests[name] = result` which prefixes a number to the test's name (based on internal counter).

#### `isElementInArray(needle, haystack)`
Adds a test which asserts existence of an element in an array.

#### `isEnvsEqual(env1, env2)`
Adds a test which asserts that two environment variables are equal (`==`).

#### `isEnvsNotEqual(env1, env2)`
Adds a test which asserts that two environment variables aren't equal (`!=`).

#### `sleep(delayInMilliseconds)`
Pauses a test script execution by `delayInMilliseconds` milliseconds.

#### `debug(variable, name)`
Outputs `variable` as stringified JSON.

#### `data`
Field which contains response JS object decoded from the received JSON.

## Credits
This project was initially developed for [ManagingLife](http://www.managinglife.com/).

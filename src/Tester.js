/**
 * Tester is the main class which purpose is to add actual Postman tests.
 *
 * @param data (optional) Object with response data
 * @constructor
 */
var Tester = function (data) {
    this.data = data || JSON.parse(responseBody.trim());
    /**
     * @type {Validator}
     */
    this.validator = new Validator(this.data);
    this.testNumber = 0;
};

Tester.prototype.addTest = function (name, result) {
    this.testNumber++;
    name = '#' + this.testNumber + '. ' + name;
    tests[name] = result;
    return tests[name];
};

Tester.prototype.isEnvsEqual = function (env1, env2) {
    return this.addTest('Envs are equal', this.validator.isEnvsEqual(env1, env2));
};

Tester.prototype.isEnvsNotEqual = function (env1, env2) {
    return this.addTest('Envs are not equal', !this.validator.isEnvsEqual(env1, env2));
};

Tester.prototype.isResponseCorrect = function (referenceElement) {
    return this.addTest('Correct response', this.validator.isResponseCorrect(referenceElement));
};

Tester.prototype.isElementInArray = function (array, referenceElement) {
    return this.addTest('Element is in array', this.validator.isElementInArray(array, referenceElement));
};

Tester.prototype.sleep = function (delayInMilliseconds) {
    var date = new Date();
    var curDate = null;
    do {
        curDate = new Date();
    } while (curDate - date < delayInMilliseconds);
};

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

Tester.prototype.isResponseCorrect = function (referenceResponse) {
    return this.addTest('Correct response', this.validator.isResponseCorrect(referenceResponse));
};

Tester.prototype.isElementInArray = function (needle, haystack) {
    return this.addTest('Element is in array', this.validator.isElementInArray(needle, haystack));
};

Tester.prototype.sleep = function (delayInMilliseconds) {
    var date = new Date();
    var curDate = null;
    do {
        curDate = new Date();
    } while (curDate - date < delayInMilliseconds);
};

Tester.prototype.debug = function (variable, name) {
    this.validator.debug(variable, name);
};

/**
 * Validator purpose is to validate response data. It's used inside Tester class
 * and its methods should return boolean value.
 *
 * @param jsonData
 * @constructor
 */
var Validator = function (jsonData) {
    this.data = jsonData;
    this.debugNumber = 0;
};

Validator.prototype.debug = function (variable, name) {
    this.debugNumber++;
    name = name || 'Debug';
    name += ' #' + this.debugNumber + '. ' + JSON.stringify(variable);
    tests[name] = true;
};

Validator.prototype.replaceTemplateVariables = function (string) {
    if (typeof string !== 'string') {
        return string;
    }

    var re = /{{(.*?)}}/g;
    var match;

    do {
        match = re.exec(string);
        if (match === null) {
            break;
        }
        string = string.replace(match[0], this.eg(match[1]));
    } while (true);

    return string;
};

Validator.prototype.isElementFieldCorrect = function (field, subjectValue) {
    if (undefined === field && subjectValue !== undefined) {
        return false;
    }

    if (typeof subjectValue === 'string') {
        subjectValue = this.replaceTemplateVariables(subjectValue);
        // Environment or global variable name is provided. Variables are stored as strings so we need to compare using "==".
        return field == subjectValue;
    }
    else if (typeof subjectValue !== 'object' || subjectValue === null) {
        return field === subjectValue;
    }

    // Handle an empty array case
    if (Array.isArray(subjectValue)) {
        if (subjectValue.length === 0) {
            return field.length === 0;
        }
    }

    // Handle arrays and objects
    for (var index in subjectValue) {
        if (!this.isElementFieldCorrect(field[index], subjectValue[index])) {
            return false;
        }
    }

    return field.length === subjectValue.length;
};

Validator.prototype.isElementCorrect = function (referenceElement, subjectElement) {
    for (var referenceElementKey in referenceElement) {
        var subjectValue = referenceElement[referenceElementKey];
        if (!this.isElementFieldCorrect(subjectElement[referenceElementKey], subjectValue)) {
            return false;
        }
    }

    return true;
};

Validator.prototype.isEnvsEqual = function (env1, env2) {
    return environment[env1] == environment[env2];
};

Validator.prototype.isResponseCorrect = function (referenceElement) {
    return this.isElementCorrect(referenceElement, this.data);
};

Validator.prototype.isElementInArray = function (referenceElement, subjectArray) {
    for (var index in subjectArray) {
        if (this.isElementCorrect(referenceElement, subjectArray[index])) {
            return true;
        }
    }

    return false;
};

Validator.prototype.eg = function (variable) {
    return environment[variable] || globals[variable];
};

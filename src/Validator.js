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
        string = string.replace(match[0], _.eg(match[1]));
    } while (true);

    return string;
};

Validator.prototype.isElementFieldCorrect = function (field, subjectValue) {
    if (undefined === field && subjectValue !== undefined) {
        return false;
    }

    if (_.eg(subjectValue) === undefined) {
        // Handle simple types
        if (typeof subjectValue !== 'object' || subjectValue === null) {
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
    }
    else {
        // Environment or global variable name is provided. Variables are stored as strings so we need to compare using "==".
        return field == _.eg(subjectValue);
    }
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
    return _.e(env1) == _.e(env2);
};

Validator.prototype.isResponseCorrect = function (referenceElement) {
    return this.isElementCorrect(referenceElement, this.data);
};

Validator.prototype.isElementInArray = function (subjectArray, referenceElement) {
    for (var index in subjectArray) {
        if (this.isElementCorrect(referenceElement, subjectArray[index])) {
            return true;
        }
    }

    return false;
};

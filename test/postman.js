var environment = {};
var globals = {};
var tests = {};

var postman = {
    clearEnvironmentVariable: function (variable) {
        if (undefined !== globals[variable]) {
            delete globals[variable];
        }
    },
    setEnvironmentVariable: function (variable, value) {
        environment[variable] = value;
    }
};

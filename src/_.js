var _ = {
    isNumeric: function (value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },
    getGlobal: function (variable) {
        if (!variable) {
            return undefined;
        }
        return globals[variable];
    },
    g: function (variable) {
        return _.getGlobal(variable);
    },
    getEnv: function (variable) {
        return environment[variable];
    },
    e: function (variable) {
        return _.getEnv(variable);
    },
    setEnv: function (variable, value) {
        postman.setEnvironmentVariable(variable, value);
    },
    clearEnv: function (variable) {
        if (Array.isArray(variable)) {
            for (var index in variable) {
                postman.clearEnvironmentVariable(variable[index]);
            }
        }
        else {
            postman.clearEnvironmentVariable(variable);
        }
    },
    getEnvOrGlobal: function (variable) {
        return _.e(variable) || _.g(variable);
    },
    eg: function (variable) {
        return _.getEnvOrGlobal(variable);
    }
};

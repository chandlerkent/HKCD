var Driver = exports.Driver = function(steps) {
    this.steps = []; // steps;
    
    // randomization to test steps are not dependent on order
    var i = 0;
    while (i < steps.length) {
        var random = Math.floor(Math.random()*steps.length);
        if (this.steps.indexOf(steps[random]) < 0) {
            this.steps[i] = steps[random];
            i++;
        }
    }
};

Driver.prototype.process = function(ast, env) {
    var currentResult = {"ast": ast, "env": env};
    
    this.steps.forEach(function(step) {
        currentResult = step.process(currentResult.ast, currentResult.env);
    });
    
    return currentResult;
};
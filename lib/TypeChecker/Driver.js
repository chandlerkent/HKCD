var Driver = exports.Driver = function(steps) {
    this.steps = steps;
};

Driver.prototype.process = function(ast, env) {
    var currentResult = {"ast": ast, "env": env};
    
    this.steps.forEach(function(step) {
        currentResult = step.process(currentResult.ast, currentResult.env);
    });
    
    return currentResult;
};
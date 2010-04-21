var Driver = exports.Driver = function(steps) {
    this.steps = steps;
};

Driver.prototype.process = function(ast) {
    var currentAST = ast;
    this.steps.forEach(function(step) {
        currentAST = step.process(currentAST);
    });
    return currentAST;
};
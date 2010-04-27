var TypeError = require("../TypeError").TypeError;

exports.process = function(ast, env) {
    env = ast.walk(checkReturnType, env);
    
    return {"ast": ast, "env": env};
};

function checkReturnType(node, env) {
    if(node.isMethodDeclaration()) {
        if(!node.getReturnExpression().checkType(node.getReturnType(), env)) {
            env.addError(new TypeError("Type of return expression does not match " + node.getReturnType(), node.getLineNumber()));
        }
    }
}
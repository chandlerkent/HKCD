exports.process = function(ast, env) {
    env = ast.walk(checkPrintLine, env);
    
    return {"ast": ast, "env": env};
};

function checkPrintLine(node, env) {
    if (node.isPrintLine()) {
        if (!node.getValue().checkType("int", env)) {
            env.addPrintLineError(node.getLineNumber());
        }
    }
}
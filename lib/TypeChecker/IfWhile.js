exports.process = function(ast, env) {
    env = ast.walk(checkIfsAndWhiles, env);
    
    return {"ast": ast, "env": env};
};

function checkIfsAndWhiles(node, env) {
    if (node.isIf() || node.isWhile()) {
        if (!node.getCondition().checkType("boolean", env)) {
            env.addBadConditionError(node.getName(), node.getLineNumber());
        }
    }
}
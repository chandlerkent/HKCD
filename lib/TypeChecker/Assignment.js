exports.process = function(ast, env) {
    env = ast.walk(checkAssignments, env);
    
    return {"ast": ast, "env": env};
};

function checkAssignments(node, env) {
    if (node.isAssignment()) {
        var varName = node.getVariableName();
        if (!env.isVariableInCurrentScope(varName)) {
            env.addVariableOutOfScopeError(varName, node.getLineNumber());
        } else if (
            (env.isPrimitiveType(node.getValue().getExpressionType(env)) ||
                    env.isPrimitiveType(env.getVariableInCurrentScope(varName).getType())) &&
                !node.getValue().checkType(env.getVariableInCurrentScope(varName).getType(), env)) {
            env.addVariableRedeclaredWithMismatchedTypesError(varName, env.getVariableInCurrentScope(varName).getType(), node.getLineNumber());
        }
    }
}
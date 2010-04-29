exports.process = function(ast, env) {
    env = ast.walk(checkAssignments, env);
    
    return {"ast": ast, "env": env};
};

function checkAssignments(node, env) {
    if (node.isAssignment()) {
        var varName = node.getVariableName();
        if (!env.variableIsInCurrentScope(varName)) {
            env.addVariableOutOfScopeError(varName, node.getLineNumber());
        } else if (!node.getValue().checkType(env.getCurrentScope().getVariable(varName).getType(), env)) {
            env.addVariableRedeclaredWithMismatchedTypesError(varName, env.getCurrentScope().getVariable(varName).getType(), node.getLineNumber());
        }
    }
}
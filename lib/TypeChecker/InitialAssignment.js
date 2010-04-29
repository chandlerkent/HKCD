exports.process = function(ast, env) {
    env = ast.walk(checkInitialAssignments, env);
    
    return {"ast": ast, "env": env};
};

function checkInitialAssignments(node, env) {
    if (node.isInitialAssignment()) {
        if (env.variableIsInCurrentScope(node.getVariableName())) {
            env.addVariableRedeclaredInScopeError(node.getVariableName(), node.getLineNumber());
        } else if (!node.getValue().checkType(node.getType(), env)) {
            env.addVariableDeclaredWithMismatchedTypesError(node.getVariableName(), node.getLineNumber());
        }
    }
}
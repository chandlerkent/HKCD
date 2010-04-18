exports.process = function(ast) {
    ast.walk(checkMethodOverloading);
    return ast;
};

var checkMethodOverloading = function(node, env) {
    var classDecls = ["ClassDecl"];
    if (classDecls.indexOf(node.name) >= 0) {
        if(!env["classes"])
            env.classes = {};
            
        if(!env.classes[node.value])
            env.classes[node.value] = { "name" : node.value, "methods" : [] };
        
        env.classes[node.value].methods = [];
        node.children[3].children.forEach(function(methodDecl) {
           if(env.classes[node.value].methods.indexOf(methodDecl.children[0]) >= 0) {
               throw new Error("A method named " + methodDecl.children[0] + " has already been defined in this class!");
           }
           env.classes[node.value].methods.push(methodDecl.children[0]);
        });
    }
};
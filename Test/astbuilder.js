File = require("file");
ASTNode = require(File.absolute("lib/astnode")).ASTNode;

exports.buildValidAST = function() {
    var program = ProgramNode();
    
    program.addChild(MainClassNode());
    
    var firstClass = ClassNode("Prius");
    firstClass.addChild(FieldNode("mpg", "int"));
    firstClass.addMethod(MethodNode("start", "boolean"));
    
    program.addChild(firstClass);
    
    var secondClass = ClassNode("Hummer");
    secondClass.addChild(FieldNode("carsDestroyed", "int"));
    
    var methodOne = MethodNode("destroy", "boolean");
    methodOne.addChild(ParameterNode("car", "Prius"));
    secondClass.addMethod(methodOne);
    
    program.addChild(secondClass);
    
    return program;
}

var ProgramNode = export.ProgramNode = function() {
    return new ASTNode("Program",[]);
}

var MainClassNode = export.MainClassNode = function() {
    return new ASTNode('MainClassDecl', [], { 'className': 'SomeClassWeNeverUse', 'param': 'args' });
}

var ClassNode = export.ClassNode = function(name) {
    return new ASTNode('ClassDecl', [], { 'className': name, 'superClassName': null });
}

var FieldNode = export.FieldNode = function(name, type) {
    return new ASTNode('ClassVarDecl', [], { 'type': type, 'fieldName': name });
}

var MethodNode = export.MethodNode = function(name, type ) {
    return new ASTNode('MethodDecl', [], { 'returnType': type, 'methodName': name });
}

var ParameterNode = export.ParameterNode = function(name, type) {
    return new ASTNode('Formal', [], { 'type': type, 'parameterName': name });
}
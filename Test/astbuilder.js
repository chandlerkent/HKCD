File = require("file");
ASTNode = require(File.absolute("lib/astnode")).ASTNode;

exports.buildValidAST = function() {
    var program = ProgramNode();
    
    program.addChild(MainClassNode());
    
    var firstClass = ClassNode("Prius");
    firstClass.addChild(FieldNode("mpg", "int"));
    firstClass.addChild(MethodNode("start", "boolean"));
    
    program.addChild(firstClass);
    
    var secondClass = ClassNode("Hummer");
    secondClass.addChild(FieldNode("carsDestroyed", "int"));
    
    var methodOne = MethodNode("destroy", "boolean");
    methodOne.addChild(ParameterNode("car", "Prius"));
    secondClass.addChild(methodOne);
    
    program.addChild(secondClass);
    
    return program;
}

var ProgramNode = exports.ProgramNode = function() {
    return new ASTNode("Program",[]);
}

var MainClassNode = exports.MainClassNode = function() {
    return new ASTNode('MainClassDecl', [], { 'className': 'SomeClassWeNeverUse', 'param': 'args', 'superClassName': null });
}

var ClassNode = exports.ClassNode = function(name, superclass) {
    return new ASTNode('ClassDecl', [], { 'className': name, 'superClassName': superclass ? superclass : null });
}

var FieldNode = exports.FieldNode = function(name, type) {
    return new ASTNode('ClassVarDecl', [], { 'type': type, 'fieldName': name });
}

var MethodNode = exports.MethodNode = function(name, type ) {
    return new ASTNode('MethodDecl', [], { 'returnType': type, 'methodName': name });
}

var ParameterNode = exports.ParameterNode = function(name, type) {
    return new ASTNode('Formal', [], { 'type': type, 'parameterName': name });
}
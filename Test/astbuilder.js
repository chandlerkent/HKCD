File = require("file");
ASTNode = require(File.absolute("lib/astnode")).ASTNode;

exports.buildValidAST = function() {
    var program = ProgramNode();
    
    program.addChild(MainClassNode());
    
    var firstClass = ClassNode("Prius");
    firstClass.addChild(FieldNode("mpg", "int"));
    var method = MethodNode("start", "boolean");
    
    method.returnExpression = TrueExpression();
    firstClass.addChild(method);
    
    program.addChild(firstClass);
    
    var secondClass = ClassNode("Hummer");
    secondClass.addChild(FieldNode("carsDestroyed", "int"));
    
    var methodOne = MethodNode("destroy", "boolean");
    methodOne.addChild(ParameterNode("car", "Prius"));
    methodOne.returnExpression = FalseExpression();
    secondClass.addChild(methodOne);
    
    program.addChild(secondClass);
    
    return program;
}

var ProgramNode = exports.ProgramNode = function() {
    return new ASTNode("Program",[]);
};

var MainClassNode = exports.MainClassNode = function() {
    return new ASTNode('MainClassDecl', [], { 'className': 'SomeClassWeNeverUse', 'param': 'args', 'superClassName': null });
};

var ClassNode = exports.ClassNode = function(name, superclass) {
    return new ASTNode('ClassDecl', [], { 'className': name, 'superClassName': superclass ? superclass : null });
};

var FieldNode = exports.FieldNode = function(name, type) {
    return new ASTNode('ClassVarDecl', [], { 'type': type, 'fieldName': name });
};

var MethodNode = exports.MethodNode = function(name, type ) {
    return new ASTNode('MethodDecl', [], { 'returnType': type, 'methodName': name });
};

var ParameterNode = exports.ParameterNode = function(name, type) {
    return new ASTNode('Formal', [], { 'type': type, 'parameterName': name });
};

var IntegerExpression = exports.IntegerExpression = function(intValue) {
    return new ASTNode('IntegerExpression', [], {'expression': intValue, 'checkType': ASTNode.expressionCheck.Integer });
};

var AddExpression = exports.AddExpression = function(leftHandSide, rightHandSide) {
    return new ASTNode('Add', [leftHandSide, rightHandSide], { 'checkType': ASTNode.expressionCheck.Add });
};

var SubtractExpression = exports.SubtractExpression = function(leftHandSide, rightHandSide) {
    return new ASTNode('Subtract', [leftHandSide, rightHandSide], { 'checkType': ASTNode.expressionCheck.Subtract });
};

var TrueExpression = exports.TrueExpression = function() {
    return new ASTNode('TrueExpression', [], { 'checkType': ASTNode.expressionCheck.True });
};

var FalseExpression = exports.FalseExpression = function() {
    return new ASTNode('FalseExpression', [], { 'checkType': ASTNode.expressionCheck.False });
};

var NullExpression = exports.NullExpression = function() {
    return new ASTNode('NullExpression', [], { 'checkType': ASTNode.expressionCheck.Null });
};

var ThisExpression = exports.ThisExpression = function() {
    return new ASTNode('ThisExpression', [], { 'checkType': ASTNode.expressionCheck.This });
};

var ConstructExpression = exports.ConstructExpression = function(type) {
    return new ASTNode('ConstructExpression', [], { 'constructor':type, 'checkType': ASTNode.expressionCheck.Construct });
};
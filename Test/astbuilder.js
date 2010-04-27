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
    return new ASTNode('IntegerExpression', [], {'expression': intValue });
};

var AddExpression = exports.AddExpression = function(leftHandSide, rightHandSide) {
    return new ASTNode('AddExpression', [leftHandSide, rightHandSide]);
};

var SubtractExpression = exports.SubtractExpression = function(leftHandSide, rightHandSide) {
    return new ASTNode('SubtractExpression', [leftHandSide, rightHandSide]);
};

var MultiplyExpression = exports.MultiplyExpression = function(leftHandSide, rightHandSide) {
    return new ASTNode('MultiplyExpression', [leftHandSide, rightHandSide]);
};

var DivideExpression = exports.DivideExpression = function(leftHandSide, rightHandSide) {
    return new ASTNode('DivideExpression', [leftHandSide, rightHandSide]);
};

var TrueExpression = exports.TrueExpression = function() {
    return new ASTNode('TrueExpression', []);
};

var FalseExpression = exports.FalseExpression = function() {
    return new ASTNode('FalseExpression', []);
};

var NullExpression = exports.NullExpression = function() {
    return new ASTNode('NullExpression', []);
};

var ThisExpression = exports.ThisExpression = function() {
    return new ASTNode('ThisExpression', []);
};

var ConstructExpression = exports.ConstructExpression = function(type) {
    return new ASTNode('ConstructExpression', [], { 'constructor':type });
};

var NegateExpression = exports.NegateExpression = function(integerExpression) {
    return new ASTNode('NegateExpression', [integerExpression]);
};

var NotExpression = exports.NotExpression = function(booleanExpression) {
    return new ASTNode('NotExpression', [booleanExpression]);
};

var OrExpression = exports.OrExpression = function(lhs, rhs) {
    return new ASTNode('OrExpression', [lhs, rhs]);
};

var LessThanExpression = exports.LessThanExpression = function(lhs, rhs) {
    return new ASTNode('LessThanExpression', [lhs, rhs]);
};

var AndExpression = exports.AndExpression = function(lhs, rhs) {
    return new ASTNode('AndExpression', [lhs, rhs]);
};
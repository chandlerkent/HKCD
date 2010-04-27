var ASSERT = require("test/assert");
var MethodOverride = require("../lib/TypeChecker/MethodOverride");
var ASTBuilder = require("./astbuilder");
var GatherTypeInfo = require("../lib/TypeChecker/GatherTypeInfo");

exports.testThatValidASTReturnsSameAST = function() {
    var ast = ASTBuilder.buildValidAST();
    var env = GatherTypeInfo.process(ast).env;
    var otherAST = MethodOverride.process(ast, env);
    
    ASSERT.eq(ast, otherAST.ast);
};

exports.testThatOverrideMethodWithDifferentTypeIsInvalid = function() {
    var ast = buildInvalidReturnTypeAST();
    var env = GatherTypeInfo.process(ast).env;
    var result = MethodOverride.process(ast, env);
    
    ASSERT.eq(1, result.env.errors.length);
};

exports.testThatOverrideMethodWithDifferentParameterTypesIsInvalid = function() {
    var ast = buildInvalidParameterTypeAST();
    var env = GatherTypeInfo.process(ast).env;
    var result = MethodOverride.process(ast, env);

    ASSERT.eq(1, result.env.errors.length);
};

function buildInvalidReturnTypeAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());
    
    var classNode = ASTBuilder.ClassNode("Bar", null);
    
    var method = ASTBuilder.MethodNode("bar", "int");
    
    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("y", "Test"));
    
    classNode.addChild(method);
    
    var classNode2 = ASTBuilder.ClassNode("Baz", "Bar");
    
    var method2 = ASTBuilder.MethodNode("bar", "boolean");
    
    method2.addChild(ASTBuilder.ParameterNode("x", "int"));
    method2.addChild(ASTBuilder.ParameterNode("y", "Test"));
    
    classNode2.addChild(method2);
    
    ast.addChild(classNode);
    ast.addChild(classNode2);
    
    return ast;
}

function buildInvalidParameterTypeAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "int");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("y", "Test"));

    classNode.addChild(method);

    var classNode2 = ASTBuilder.ClassNode("Baz", "Bar");

    var method2 = ASTBuilder.MethodNode("bar", "int");

    method2.addChild(ASTBuilder.ParameterNode("x", "int"));
    method2.addChild(ASTBuilder.ParameterNode("y", "boolean"));

    classNode2.addChild(method2);

    ast.addChild(classNode);
    ast.addChild(classNode2);

    return ast;
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
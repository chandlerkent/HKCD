var ASSERT = require("test/assert");
var ReturnType = require("../../lib/TypeChecker").ReturnType;
var ASTBuilder = require("../astbuilder");
var GatherTypeInfo = require("../../lib/TypeChecker").GatherTypeInfo;
var Environment = require("../../lib/Environment").Environment;

exports.testThatValidASTReturnsSameAST = function() {
    var ast = ASTBuilder.buildValidAST();
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var otherAST = ReturnType.process(ast, env);
    
    ASSERT.eq(ast, otherAST.ast);
    ASSERT.eq(0, env.errors.length);
};

exports.testThatWrongReturnTypeIsInvalid = function() {
    var ast = buildInvalidParameterAST();
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);
    
    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatAddWithBadReturnTypeIsInvalid = function() {
    var ast = buildBinaryOperatorAST("Add");
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatSubtractWithBadReturnTypeIsInvalid = function() {
    var ast = buildBinaryOperatorAST("Subtract");
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatMultiplyWithBadReturnTypeIsInvalid = function() {
    var ast = buildBinaryOperatorAST("Multiply");
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);
    
    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatDivideWithBadReturnTypeIsInvalid = function() {
    var ast = buildBinaryOperatorAST("Divide");
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatOrWithBadReturnTypeIsInvalid = function() {
    var ast = buildBooleanBinaryOperatorAST("Or");
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatAndWithBadReturnTypeIsInvalid = function() {
    var ast = buildBooleanBinaryOperatorAST("And");
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatNotEqualWithBadReturnTypeIsInvalid = function() {
    var ast = buildBooleanBinaryOperatorAST("NotEqual");
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatEqualsWithBadReturnTypeIsInvalid = function() {
    var ast = buildBooleanBinaryOperatorAST("Equals");
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);
    
    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatLessThanWithBadReturnTypeIsInvalid = function() {
    var ast = buildBooleanBinaryOperatorAST("LessThan");
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(6, result.env.errors.length);
};

exports.testThatLessThanEqualWithBadReturnTypeIsInvalid = function() {
    var ast = buildBooleanBinaryOperatorAST("LessThanEqual");
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(6, result.env.errors.length);
};

exports.testThatGreaterThanEqualWithBadReturnTypeIsInvalid = function() {
    var ast = buildBooleanBinaryOperatorAST("GreaterThanEqual");
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(6, result.env.errors.length);
};

exports.testThatGreaterThanWithBadReturnTypeIsInvalid = function() {
    var ast = buildBooleanBinaryOperatorAST("GreaterThan");
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(6, result.env.errors.length);
};

exports.testThatNullWithPrimitiveReturnTypeIsInvalid = function() {
    var ast = buildNullAST();
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);
    
    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatConstructTypeIsInvalid = function() {
    var ast = buildConstructAST();
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatThisWithOtherReturnTypeIsInvalid = function() {
    var ast = buildThisAST();
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatNegateWithBooleanReturnTypeIsInvalid = function() {
    var ast = buildNegateAST();
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatNotWithIntegerReturnTypeIsInvalid = function() {
    var ast = buildNotAST();
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

function buildInvalidParameterAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());
    
    var classNode = ASTBuilder.ClassNode("Bar", null);
    
    var method = ASTBuilder.MethodNode("bar", "boolean");
    
    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder.IntegerExpression("4");
    
    classNode.addChild(method);
    
    ast.addChild(classNode);
    
    return ast;
}

function buildBinaryOperatorAST(exprType) {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "boolean");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder[exprType + "Expression"](ASTBuilder.IntegerExpression("4"), 
        ASTBuilder.IntegerExpression("6"));

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

function buildBooleanBinaryOperatorAST(exprType) {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "int");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder[exprType + "Expression"](ASTBuilder.TrueExpression(), 
        ASTBuilder.FalseExpression());

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

function buildNullAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "boolean");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder.NullExpression();

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

function buildThisAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "boolean");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder.ThisExpression();

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

function buildConstructAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "boolean");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder.ConstructExpression("Foo");

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

function buildNegateAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "boolean");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder.NegateExpression(ASTBuilder.IntegerExpression("7"));

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

function buildNotAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "int");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder.NotExpression(ASTBuilder.TrueExpression());

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
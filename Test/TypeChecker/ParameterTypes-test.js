var ASSERT = require("test/assert");
var ParameterTypes = require("../../lib/TypeChecker").ParameterTypes;
var ASTBuilder = require("../astbuilder");
var GatherTypeInfo = require("../../lib/TypeChecker").GatherTypeInfo;
var Environment = require("../../lib/Environment").Environment;

exports.testThatValidASTReturnsSameAST = function() {
    var ast = ASTBuilder.buildValidAST();
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var otherAST = ParameterTypes.process(ast, env);
    
    ASSERT.eq(ast, otherAST.ast);
};

exports.testThatParameterWithUndefinedTypeIsInvalid = function() {
    var ast = buildInvalidParameterAST();
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    var result = ParameterTypes.process(ast, env);
    
    ASSERT.eq(1, result.env.errors.length);
};

function buildInvalidParameterAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());
    
    var classNode = ASTBuilder.ClassNode("Bar", null);
    
    var method = ASTBuilder.MethodNode("bar", "int");
    
    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("y", "Test"));
    
    classNode.addChild(method);
    
    ast.addChild(classNode);
    
    return ast;
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
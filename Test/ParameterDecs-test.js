var ASSERT = require("test/assert");
var ParameterDecs = require("../lib/ParameterDecs");
var ASTBuilder = require("./astbuilder")

exports.testThatValidASTReturnsSameAST = function() {
    var ast = ASTBuilder.buildValidAST();
    var env = require("../lib/GatherTypeInfo").process(ast);
    var otherAST = ParameterDecs.process(ast, env);
    
    ASSERT.eq(ast, otherAST);
};

exports.testThatParametersWithDuplicateNamesAreInvalid = function() {
    var ast = buildInvalidParameterAST();
    var env = require("../lib/GatherTypeInfo").process(ast).env;
    ASSERT.throwsError(function() {ParameterDecs.process(ast, env)});
};

function buildInvalidParameterAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());
    
    var classNode = ASTBuilder.ClassNode("Bar", null);
    
    var method = ASTBuilder.MethodNode("bar", "int");
    
    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    
    classNode.addChild(method);
    
    ast.addChild(classNode);
    
    return ast;
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
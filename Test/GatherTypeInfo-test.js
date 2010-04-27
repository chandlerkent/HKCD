var ASSERT = require("test/assert");
var ASTNode = require("../lib/ASTNode").ASTNode;
var GatherTypeInfo = require("../lib/GatherTypeInfo");
var Environment = require("../lib/Environment").Environment;

exports.testGatheringTypeInfo = function() {
    var ast = new ASTNode("Program", [
        new ASTNode("MainClassDecl", [], {"className": "Foo", "param": "args"}),
        new ASTNode("ClassDecl", [
            new ASTNode("ClassVarDecl", [], {"type": "int", "fieldName": "x"}),
            new ASTNode("ClassVarDecl", [], {"type": "Foo", "fieldName": "foo"}),
            new ASTNode("MethodDecl", [
                new ASTNode('Formal', [], { 'type': "int", 'parameterName': "hello" })
            ], {"returnType": "int", "methodName": "foo"}),
            new ASTNode("MethodDecl", [], {"returnType": "boolean", "methodName": "foo"}),
            new ASTNode("MethodDecl", [], {"returnType": "int", "methodName": "bar"}),
        ], {"className": "Bar", "superClassName": null}),
        new ASTNode("ClassDecl", [
            new ASTNode("ClassVarDecl", [], {"type": "int", "fieldName": "x"}),
            new ASTNode("ClassVarDecl", [], {"type": "boolean", "fieldName": "x"}),
        ], {"className": "Bar", "superClassName": "Foo"}),
        new ASTNode("ClassDecl", [
            new ASTNode("ClassVarDecl", [], {"type": "int", "fieldName": "x"}),
            new ASTNode("ClassVarDecl", [], {"type": "Bar", "fieldName": "z"}),
        ], {"className": "Baz", "superClassName": "Oof"}),
    ]);
    
    var result = GatherTypeInfo.process(ast, new Environment());
    
    ASSERT.eq(ast, result.ast);
};

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
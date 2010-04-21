var ASSERT = require("test/assert");
var fielddecs = require("../lib/fielddecs");
var ASTNode = require("../lib/astnode").ASTNode;

exports.testThatValidASTReturnsSameAST = function() {
    var ast = buildValidAST();
    var otherAST = fielddecs.process(ast);
    
    ASSERT.eq(ast, otherAST);
};

exports.testThatClassVarsOfSameNameAreInvalid = function() {
    var ast = buildInvalidFieldsAST();
    ASSERT.throwsError(function() {fielddecs.process(ast)});
};

function buildInvalidFieldsAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [
            new ASTNode('ClassVarDecl', [], { 'type': 'int', 'var_name':'x'}),
            new ASTNode('ClassVarDecl', [], { 'type': 'boolean', 'var_name':'x'}),
            new ASTNode('MethodDecl', [3], { 'return_type': 'int', 'method_name': 'bar'}),
        ], { 'class_decl': 'Bar', 'extension': null})
    ]);
}

function buildValidAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [
            new ASTNode('ClassVarDecl', [], { 'type': 'int', 'var_name':'x'}),
            new ASTNode('ClassVarDecl', [], { 'type': 'boolean', 'var_name':'y'}),
            new ASTNode('MethodDecl', [3], { 'return_type': 'int', 'method_name': 'bar'}),
        ], { 'class_decl': 'Bar', 'extension': null}),
    ]);
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
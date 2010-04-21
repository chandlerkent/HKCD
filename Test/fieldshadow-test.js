var ASSERT = require("test/assert");
var fieldshadow = require("../lib/fieldshadow");
var ASTNode = require("../lib/astnode").ASTNode;

exports.testThatValidASTReturnsSameAST = function() {
    var ast = buildValidAST();
    var otherAST = fieldshadow.process(ast);
    
    ASSERT.eq(ast, otherAST);
};

exports.testThatShadowedFieldsAreInvalid = function() {
    var ast = buildInvalidFieldsAST();
    ASSERT.throwsError(function() {fieldshadow.process(ast)});
};

function buildInvalidFieldsAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [
            new ASTNode('ClassVarDecl', [], { 'type': 'int', 'var_name':'x'}),
            new ASTNode('MethodDecl', [3], { 'return_type': 'int', 'method_name': 'bar'}),
        ], { 'class_decl': 'Bar', 'extension': null}),
        new ASTNode('ClassDecl', [
            new ASTNode('ClassVarDecl', [], { 'type': 'boolean', 'var_name':'x'}),
        ], { 'class_decl': 'Foo', 'extension': 'Bar'}),
    ]);
}

function buildValidAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [
            new ASTNode('ClassVarDecl', [], { 'type': 'int', 'var_name':'x'}),
            new ASTNode('MethodDecl', [3], { 'return_type': 'int', 'method_name': 'bar'}),
        ], { 'class_decl': 'Bar', 'extension': null}),
        new ASTNode('ClasDecl', [
            new ASTNode('ClassVarDecl', [], { 'type': 'boolean', 'var_name':'y'}),
        ], { 'class_decl': 'Foo', 'extension': 'Bar'}),
    ]);
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
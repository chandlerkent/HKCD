var ASSERT = require("test/assert");
var parametertypes = require("../lib/parametertypes");
var ASTNode = require("../lib/astnode").ASTNode;

exports.testThatValidASTReturnsSameAST = function() {
    var ast = buildValidAST();
    var otherAST = parametertypes.process(ast);
    
    ASSERT.eq(ast, otherAST);
};

exports.testThatParameterWithUndefinedTypeIsInvalid = function() {
    var ast = buildInvalidParameterAST();
    ASSERT.throwsError(function() {parametertypes.process(ast)});
};

function buildInvalidParameterAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [
            new ASTNode('ClassVarDecl', [], { 'type': 'boolean', 'var_name':'x'}),
            new ASTNode('MethodDecl', [
                new ASTNode('Formal', [], { 'type': 'Baz', 'param_name':'y'}),
                3
            ], { 'return_type': 'int', 'method_name': 'bar'}),
        ], { 'class_decl': 'Bar', 'extension': null})
    ]);
}

function buildValidAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [
            new ASTNode('ClassVarDecl', [], { 'type': 'int', 'var_name':'x'}),
            new ASTNode('ClassVarDecl', [], { 'type': 'boolean', 'var_name':'y'}),
            new ASTNode('MethodDecl', [
                new ASTNode('Formal', [], { 'type': 'int', 'param_name':'y'}),
                3
            ], { 'return_type': 'int', 'method_name': 'bar'}),
        ], { 'class_decl': 'Bar', 'extension': null}),
    ]);
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
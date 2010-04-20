var ASSERT = require("test/assert");
var classtypes = require("../lib/classtypes");
var ASTNode = require("../lib/astnode").ASTNode;

exports.testThatValidASTReturnsSameAST = function() {
    var ast = buildValidAST();
    var otherAST = classtypes.process(ast);
    
    ASSERT.eq(ast, otherAST);
};

exports.testThatTwoClassWithSameNameAreInvalid = function() {
    var ast = buildSameClassesAST();

    ASSERT.throwsError(function() { classtypes.process(ast) });
};

exports.testThatExtendingAnUndefinedClassIsInvalid = function() {
    var ast = buildBadExtensionAST();
    
    ASSERT.throwsError(function() { classtypes.process(ast) });
};

function buildBadExtensionAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [], { 'class_decl': 'Bar', 'extension': 'Baz'})
    ]);
}

function buildSameClassesAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [], { 'class_decl': 'Foo', 'extension': null})
    ]);
}

function buildValidAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [], { 'class_decl': 'Bar', 'extension': null}),
        new ASTNode('ClassDecl', [], { 'class_decl': 'Baz', 'extension': null})
    ]);
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
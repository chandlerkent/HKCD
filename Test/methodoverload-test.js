var ASSERT = require("test/assert");
var methodoverload = require("../lib/methodoverload");
var Node = require("../lib/Node").Node;

exports.testThatValidASTReturnsSameAST = function() {
    var ast = buildValidAST();
    var otherAST = methodoverload.process(ast);
    
    ASSERT.eq(ast, otherAST);
};

exports.testThatTwoMethodsWithSameNameAreInvalid = function() {
    var ast = buildInvalidAST();
    ASSERT.throwsError(function() {methodoverload.process(ast)});
};

exports.testThatOverriddenMethodFromSuperclassMustHaveSameArgsAndType = function() {
    var ast = buildInvalidExtendsAST();
    ASSERT.throwsError(function() {methodoverload.process(ast)});
};

function buildInvalidExtendsAST() {
    return new Node('Program', [
        new Node('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new Node('ClassDecl', [
            new Node('MethodDecl', [3], { 'return_type': 'int', 'method_name': 'bar'}),
            new Node('MethodDecl', [false], { 'return_type': 'boolean', 'method_name': 'hasBar'})
        ], { 'class_decl': 'Bar', 'extension': null}),
        new Node('ClassDecl', [
            new Node('MethodDecl', [42], { 'return_type': 'int', 'method_name': 'baz'}),
            new Node('MethodDecl', [true], { 'return_type': 'boolean', 'method_name': 'hasBaz'}),
            new Node('MethodDecl', [false], { 'return_type': 'boolean', 'method_name': 'bar',})
        ], { 'class_decl': 'Baz', 'extension': 'Bar'})
    ]);
}

function buildInvalidAST() {
    return new Node('Program', [
        new Node('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new Node('ClassDecl', [
            new Node('MethodDecl', [3], { 'return_type': 'int', 'method_name': 'bar'}),
            new Node('MethodDecl', [false], { 'return_type': 'boolean', 'method_name': 'bar'})
        ], { 'class_decl': 'Bar', 'extension': null}),
        new Node('ClassDecl', [
            new Node('MethodDecl', [42], { 'return_type': 'int', 'method_name': 'baz'}),
            new Node('MethodDecl', [true], { 'return_type': 'boolean', 'method_name': 'hasBaz'})
        ], { 'class_decl': 'Baz', 'extension': null})
    ]);
}

function buildValidAST() {
    return new Node('Program', [
        new Node('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new Node('ClassDecl', [
            new Node('MethodDecl', [3], { 'return_type': 'int', 'method_name': 'bar'}),
            new Node('MethodDecl', [false], { 'return_type': 'boolean', 'method_name': 'hasBar'})
        ], { 'class_decl': 'Bar', 'extension': null}),
        new Node('ClassDecl', [
            new Node('MethodDecl', [42], { 'return_type': 'int', 'method_name': 'baz'}),
            new Node('MethodDecl', [true], { 'return_type': 'boolean', 'method_name': 'hasBaz'})
        ], { 'class_decl': 'Baz', 'extension': null})
    ]);
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
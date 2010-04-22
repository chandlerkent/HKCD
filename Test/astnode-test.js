var ASTNode = require("../lib/ASTNode").ASTNode;
var ASSERT = require("test/assert");

exports.testNodeConstruction = function() {
    var namedNode = new ASTNode('NAME');
    ASSERT.eq('NAME', namedNode.name);
    ASSERT.eq([], namedNode.children);
    
    var someChildren = ['1', '2', '3'];
    var nodeWithChildren = new ASTNode('Chandler', someChildren);
    ASSERT.eq(someChildren, nodeWithChildren.children);

    var nodeWithProperties = new ASTNode('Derek', [], {"value": 1, "type": "int"});
    ASSERT.eq(1, nodeWithProperties.value);
    ASSERT.eq("int", nodeWithProperties.type);
};

exports.testAddChild = function() {
    var node = new ASTNode('Test');
    var child = new ASTNode('Nothing');
    node.addChild(child);
    ASSERT.eq([child], node.children);
};

exports.testIsLeafNode = function() {
    var nodeWithoutChildren = new ASTNode('Test');
    ASSERT.isTrue(nodeWithoutChildren.isLeafNode());
    
    var nodeWithChildren = new ASTNode('Test1', [new ASTNode('Test2')]);
    ASSERT.isFalse(nodeWithChildren.isLeafNode());
};

exports.testWalk = function() {
    var ast = buildAST();
    var actual = [];
    ast.walk(function(node) {
        actual.push(node.name);
    });
    
    var expected = "StmtList MainClassDecl ClassDeclList Program";
    ASSERT.eq(expected, actual.join(" "));
};

function buildAST() {
    return new ASTNode("Program", [
        new ASTNode("MainClassDecl", [
            "Foo",
            "args",
            new ASTNode("StmtList"),
        ]),
        new ASTNode("ClassDeclList")
    ]);
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
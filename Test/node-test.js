var Node = require("../lib/Node").Node;
var ASSERT = require("test/assert");

exports.testNodeConstruction = function() {
    var namedNode = new Node('NAME');
    ASSERT.eq('NAME', namedNode.name);
    ASSERT.eq([], namedNode.children);
    
    var someChildren = ['1', '2', '3'];
    var nodeWithChildren = new Node('Chandler', someChildren);
    ASSERT.eq(someChildren, nodeWithChildren.children);

    var nodeWithProperties = new Node('Derek', [], {"value": 1, "type": "int"});
    ASSERT.eq(1, nodeWithProperties.value);
    ASSERT.eq("int", nodeWithProperties.type);
};

exports.testAddChild = function() {
    var node = new Node('Test');
    var child = new Node('Nothing');
    node.addChild(child);
    ASSERT.eq([child], node.children);
};

exports.testIsLeafNode = function() {
    var nodeWithoutChildren = new Node('Test');
    ASSERT.isTrue(nodeWithoutChildren.isLeafNode());
    
    var nodeWithChildren = new Node('Test1', [new Node('Test2')]);
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
    return new Node("Program", [
        new Node("MainClassDecl", [
            "Foo",
            "args",
            new Node("StmtList"),
        ]),
        new Node("ClassDeclList")
    ]);
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
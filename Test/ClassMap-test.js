var ASSERT = require("test/assert");
var ClassMap = require("../lib/ClassMap").ClassMap;

exports.testClassMapConstructor = function() {
    var classMap = buildTestClassMap();
    ASSERT.eq("bar", classMap.name);
    ASSERT.eq("foo", classMap.superclass);
    ASSERT.eq([], classMap.fields);
    ASSERT.eq([], classMap.methods);
};

exports.testAddField = function() {
    var classMap = buildTestClassMap();
    classMap.addField("x", "int");
    classMap.addField("y", "boolean");
    
    ASSERT.eq(2, classMap.fields.length);
};

exports.testHasMultipleOfField = function() {
    var classMap = buildTestClassMap();
    classMap.addField("x", "int");
    classMap.addField("x", "boolean");
    
    ASSERT.isTrue(classMap.hasMultipleOfField("x"));
    ASSERT.isFalse(classMap.hasMultipleOfField("y"));
};

exports.testHasField = function() {
    var classMap = buildTestClassMap();
    classMap.addField("x", "int");
    classMap.addField("y", "boolean");
    
    ASSERT.isTrue(classMap.hasField("x"));
    ASSERT.isTrue(classMap.hasField("y"));
    ASSERT.isFalse(classMap.hasField("z"));
};

exports.testGetFieldType = function() {
    var classMap = buildTestClassMap();
    classMap.addField("x", "int");
    classMap.addField("y", "boolean");
    
    ASSERT.eq("int", classMap.getFieldType("x"));
    ASSERT.eq("boolean", classMap.getFieldType("y"));
    ASSERT.throwsError(function() {classMap.getFieldType("z")});
};

exports.testGetSuperclass = function() {
    var classMap = buildTestClassMap();

    ASSERT.eq("foo", classMap.getSuperclass());
};

function buildTestClassMap() {
    return new ClassMap("bar", "foo");
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
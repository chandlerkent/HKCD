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

function buildTestClassMap() {
    return new ClassMap("bar", "foo");
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
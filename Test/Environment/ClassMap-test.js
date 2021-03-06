var ASSERT = require("test/assert");
var ClassMap = require("../../lib/Environment").ClassMap;
var MethodMap = require("../../lib/Environment").MethodMap;
var VariableMap = require("../../lib/Environment").VariableMap;

exports.testClassMapConstructor = function() {
    var classMap = buildTestClassMap();
    ASSERT.eq("bar", classMap.name);
    ASSERT.eq("foo", classMap.superclass);
    ASSERT.eq([], classMap.fields);
    ASSERT.eq([], classMap.methods);
};

exports.testAddField = function() {
    var classMap = buildTestClassMap();
    classMap.addField(new VariableMap("x", "int"));
    classMap.addField(new VariableMap("y", "boolean"));
    
    ASSERT.eq(2, classMap.fields.length);
};

exports.testHasMultipleOfField = function() {
    var classMap = buildTestClassMap();
    classMap.addField(new VariableMap("x", "int"));
    classMap.addField(new VariableMap("x", "boolean"));
    
    ASSERT.isTrue(classMap.hasMultipleOfField("x"));
    ASSERT.isFalse(classMap.hasMultipleOfField("y"));
};

exports.testHasMultipleOfMethod = function() {
    var classMap = buildTestClassMap();
    classMap.addMethod(buildTestMethodMap());
    classMap.addMethod(buildTestMethodMap());
    
    ASSERT.isTrue(classMap.hasMultipleOfMethod("foo"));
    ASSERT.isFalse(classMap.hasMultipleOfField("bar"));
};

exports.testHasField = function() {
    var classMap = buildTestClassMap();
    classMap.addField(new VariableMap("x", "int"));
    classMap.addField(new VariableMap("y", "boolean"));
    
    ASSERT.isTrue(classMap.hasField("x"));
    ASSERT.isTrue(classMap.hasField("y"));
    ASSERT.isFalse(classMap.hasField("z"));
};

exports.testHasMethod = function() {
    var classMap = buildTestClassMap();
    var methodMap1 = new MethodMap("bar", "int");
    var methodMap2 = new MethodMap("foo", "boolean");
    classMap.addMethod(methodMap1);
    classMap.addMethod(methodMap2);
    
    ASSERT.isTrue(classMap.hasMethod("bar"));
    ASSERT.isTrue(classMap.hasMethod("foo"));
    ASSERT.isFalse(classMap.hasMethod("baz"));
};

exports.testGetFieldType = function() {
    var classMap = buildTestClassMap();
    classMap.addField(new VariableMap("x", "int"));
    classMap.addField(new VariableMap("y", "boolean"));
    
    ASSERT.eq("int", classMap.getFieldType("x"));
    ASSERT.eq("boolean", classMap.getFieldType("y"));
    ASSERT.throwsError(function() {classMap.getFieldType("z")});
};

exports.testGetSuperclass = function() {
    var classMap = buildTestClassMap();

    ASSERT.eq("foo", classMap.getSuperclass());
};

exports.testGetMethod = function() {
    var classMap = buildTestClassMap();
    var methodMap1 = new MethodMap("bar", "int");
    var methodMap2 = new MethodMap("foo", "boolean");
    classMap.addMethod(methodMap1);
    classMap.addMethod(methodMap2);
    
    ASSERT.eq(methodMap1, classMap.getMethod("bar"));
    ASSERT.eq(methodMap2, classMap.getMethod("foo"));
    ASSERT.eq(null, classMap.getMethod("baz"));
};

exports.testAddMethod = function() {
    var classMap = buildTestClassMap();
    classMap.addMethod(buildTestMethodMap());
    classMap.addMethod(buildTestMethodMap());
    
    ASSERT.eq(2, classMap.methods.length);
};

exports.testGetKey = function() {
    var classMap = buildTestClassMap();
    classMap.addField(new VariableMap("x", "int"));
    classMap.addField(new VariableMap("y", "boolean"));

    ASSERT.eq("bar", classMap.getKey());
};

exports.testToString = function() {
    var classMap = buildTestClassMap();
    classMap.addField(new VariableMap("x", "int"));
    classMap.addField(new VariableMap("y", "boolean"));
    var methodMap1 = new MethodMap("bar", "int");
    var methodMap2 = new MethodMap("foo", "boolean");
    classMap.addMethod(methodMap1);
    classMap.addMethod(methodMap2);
    
    var expected = "{name: <bar>, superclass: <foo>, fields: <[{name: <x>, type: <int>}, {name: <y>, type: <boolean>}]>, methods: <[{name: <bar>, returnType: <int>, parameters: <[]>}, {name: <foo>, returnType: <boolean>, parameters: <[]>}]>}";
    ASSERT.eq(expected, classMap.toString());
};

function buildTestClassMap() {
    return new ClassMap("bar", "foo");
}

function buildTestMethodMap() {
    return new MethodMap("foo", "int");
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
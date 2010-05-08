var ArrayMap = require("../../lib/Environment").ArrayMap;
var ASSERT = require("test/assert");

exports.testThatArrayFindsIndexByKey = function() {
    var array = buildArray();
    
    ASSERT.eq(1, array.indexOfByKey("test2"));
};

exports.testThatArrayDoesntFindIndexByKey = function() {
    var array = buildArray();
    
    ASSERT.eq(-1, array.indexOfByKey("a"));
};

exports.testThatArrayGetsByKey = function() {
    var array = buildArray();
    
    ASSERT.eq(array[1], array.getByKey("test2"));
};

exports.testThatArrayContainsKey = function() {
    var array = buildArray();
    
    ASSERT.isTrue(array.containsKey("test2"));
};

exports.testThatArrayDoesNotContainKey = function() {
    var array = buildArray();

    ASSERT.isFalse(array.containsKey("test3"));
};

exports.testThatArrayContainsMultipleOfKey = function() {
    var array = buildArray();

    ASSERT.isTrue(array.hasMultipleByKey("test"));
};

function buildArray() {
    return [
        { getKey: function() { return "test"; } },
        { getKey: function() { return "test2"; } },
        { getKey: function() { return "test"; } }
    ];
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
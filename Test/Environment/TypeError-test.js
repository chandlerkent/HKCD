var TypeError = require("../../lib/Environment").TypeError;
var ASSERT = require("test/assert");

exports.testThatTypeErrorInitializes = function() {
    var error = new TypeError("ERR", 5);
    
    ASSERT.eq("Type error on line 6: ERR.", error.toString());
};

exports.testTypeErrorEquality = function() {
    var lhs = new TypeError("ERR", 2);
    var rhs = new TypeError("ERR", 10);
    
    ASSERT.isTrue(lhs.equals(rhs));
};

exports.testTypeErrorInequality = function() {
    var lhs = new TypeError("ERR", 2);
    var rhs = new TypeError("AERR", 2);
    
    ASSERT.isFalse(lhs.equals(rhs));
};

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
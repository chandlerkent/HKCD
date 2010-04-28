var ASSERT = require("test/assert");
var GatherTypeInfo = require("../../lib/TypeChecker").GatherTypeInfo;
var Environment = require("../../lib/Environment").Environment;
var astbuilder = require("../astbuilder");

exports.testGatheringTypeInfo = function() {
    var ast = astbuilder.buildValidAST();
    
    var result = GatherTypeInfo.process(ast, new Environment());
    
    ASSERT.eq(ast, result.ast);
};

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
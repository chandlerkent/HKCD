exports.testASTNode = require("./ASTNode-test");
exports.testTypeChecker = require("./TypeChecker-test");
exports.testEnvironment = require("./Environment-test");
exports.testParser = require("./parser-test");
exports.testIntegration = require("./integration-test");

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
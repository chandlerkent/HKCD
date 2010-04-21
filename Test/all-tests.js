exports.testNode = require("./astnode-test");
exports.testClassTypes = require("./classtypes-test");
exports.testParser = require("./parser-test");
exports.testDriver = require("./driver-test");
exports.testIntegration = require("./integration-test");

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
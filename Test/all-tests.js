exports.testNode = require("./node-test");
exports.testClassTypes = require("./classtypes-test");
exports.testParser = require("./parser-test");

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
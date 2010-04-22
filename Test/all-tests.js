exports.testNode = require("./astnode-test");
exports.testGatherTypeInfo = require("./gathertypeinfo-test");
//exports.testParser = require("./parser-test");
exports.testDriver = require("./driver-test");
exports.testFieldDecs = require("./fielddecs-test");
exports.testFieldShadow = require("./fieldshadow-test");
exports.testMethodOverload = require("./methodoverload-test");
exports.testMethodOverride = require("./methodoverride-test");
exports.testIntegration = require("./integration-test");

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
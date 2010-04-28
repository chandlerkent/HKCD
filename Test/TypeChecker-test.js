var TypeChecker = require("../lib/TypeChecker").TypeChecker;

exports.testClassDecl = require("./TypeChecker/ClassDecl-test");
exports.testDriver = require("./TypeChecker/Driver-test");
exports.testFieldDecl = require("./TypeChecker/FieldDecl-test");
exports.testFieldShadow = require("./TypeChecker/FieldShadow-test");
exports.testGatherTypeInfo = require("./TypeChecker/GatherTypeInfo-test");
exports.testMethodOverload = require("./TypeChecker/MethodOverload-test");
exports.testMethodOverride = require("./TypeChecker/MethodOverride-test");
exports.testParameterDecl = require("./TypeChecker/ParameterDecl-test");
exports.testParameterTypes = require("./TypeChecker/ParameterTypes-test");
exports.testReturnType = require("./TypeChecker/ReturnType-test");

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
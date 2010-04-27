var Driver = require("../driver").Driver;
var Environment = require("../Environment").Environment;
var ClassDecl = require("./ClassDecl");
var MethodOverload = require("./MethodOverload");
var FieldDecl = require("./FieldDecl");
var FieldShadow = require("./FieldShadow");
var ParameterDecl = require("./ParameterDecl");
var ParameterTypes = require("./ParameterTypes");
var MethodOverride = require("./MethodOverride");
var MethodDecl = require("./MethodDecl");
var GatherTypeInfo = require("./GatherTypeInfo");
var ReturnType = require("./ReturnType");

exports.typeCheck = function(ast) {
    var env = GatherTypeInfo.process(ast).env;
    
    var driver = new Driver([MethodDecl, ClassDecl, ParameterTypes, ParameterDecl, MethodOverload, FieldDecl, FieldShadow, MethodOverride]);
    
    return driver.process(ast, env);
};
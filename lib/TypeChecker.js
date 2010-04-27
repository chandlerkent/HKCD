var Driver = require("./driver").Driver;
var Environment = require("./Environment").Environment;
var ClassDecl = require("./ClassDecl");
var MethodOverload = require("./MethodOverload");
var FieldDecl = require("./FieldDecl");
var FieldShadow = require("./FieldShadow");
var ParameterDecs = require("./ParameterDecs");
var ParameterTypes = require("./ParameterTypes");
var MethodOverride = require("./MethodOverride");
var MethodDecl = require("./MethodDecl");
var GatherTypeInfo = require("./GatherTypeInfo");

exports.typeCheck = function(ast) {
    var env = GatherTypeInfo.process(ast).env;
    
    var driver = new Driver([MethodDecl, ClassDecl, ParameterTypes, ParameterDecs, MethodOverload, FieldDecl, FieldShadow, MethodOverride]);
    
    return driver.process(ast, env);
};
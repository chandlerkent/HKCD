var Environment = require("./Environment").Environment;

var Driver = exports.Driver = require("./TypeChecker/Driver").Driver;
var ClassDecl = exports.ClassDecl = require("./TypeChecker/ClassDecl");
var MethodOverload = exports.MethodOverload = require("./TypeChecker/MethodOverload");
var FieldDecl = exports.FieldDecl = require("./TypeChecker/FieldDecl");
var FieldShadow = exports.FieldShadow = require("./TypeChecker/FieldShadow");
var ParameterDecl = exports.ParameterDecl = require("./TypeChecker/ParameterDecl");
var ParameterTypes = exports.ParameterTypes = require("./TypeChecker/ParameterTypes");
var MethodOverride = exports.MethodOverride = require("./TypeChecker/MethodOverride");
var MethodDecl = exports.MethodDecl = require("./TypeChecker/MethodDecl");
var GatherTypeInfo = exports.GatherTypeInfo = require("./TypeChecker/GatherTypeInfo");
var ReturnType = exports.ReturnType = require("./TypeChecker/ReturnType");
var InitialAssignment = exports.InitialAssignment = require("./TypeChecker/InitialAssignment");
var Assignment = exports.Assignment = require("./TypeChecker/Assignment");
var PrintLine = exports.PrintLine = require("./TypeChecker/PrintLine");
var IfWhile = exports.IfWhile = require("./TypeChecker/IfWhile");

exports.typeCheck = function(ast) {
    var env = GatherTypeInfo.process(ast, new Environment()).env;
    
    var driver = new Driver([ReturnType, Assignment, PrintLine, IfWhile, MethodDecl, ClassDecl, ParameterTypes, ParameterDecl, MethodOverload, FieldDecl, FieldShadow, MethodOverride, InitialAssignment]);
    
    return driver.process(ast, env);
};
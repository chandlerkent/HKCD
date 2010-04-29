var Environment = require("../lib/Environment").Environment;
var ClassMap = require("../lib/Environment").ClassMap;
var ASSERT = require("test/assert");

exports.testClassMap = require("./Environment/ClassMap-test");
exports.testMethodMap = require("./Environment/MethodMap-test");

exports.testThatEnvironmentAddsClass = function() {
    var target = new Environment();
    
    target.addClass(/* ClassMap */"test");
    
    ASSERT.eq(1, target.classes.length);
}

exports.testThatEnvironmentGetsClassByKey = function() {
    var target = new Environment();
    var test2 = {
        "name": "test2", 
        "getKey":
            function(){return "test2";}};
    
    target.addClass({"name":"test"        , 
            "getKey":
                function(){return "test";}});
    target.addClass(test2);
    
    ASSERT.eq(test2, target.getClass("test2"));
}

exports.testThatEnvironmentHasClass = function() {
    var target = new Environment();

    target.addClass({"name":"test", 
    "getKey":
        function(){return "test";}});
    target.addClass({"name":"test2"    , 
        "getKey":
            function(){return "test2";}});

    ASSERT.isTrue(target.hasClass("test"));
}

exports.testThatEnvironmentDoesNotHaveClass = function() {
    var target = new Environment();

    target.addClass({"name":"test", 
    "getKey":
        function(){return "test";}});
    target.addClass({"name":"test2"    , 
        "getKey":
            function(){return "test2";}});

    ASSERT.isFalse(target.hasClass("test3"));
}

exports.testThatEnvironmentHasMultipleOfClass = function() {
    var target = new Environment();

    target.addClass({"name":"test2", 
    "getKey":
        function(){return "test2";}});
    target.addClass({"name":"test2"    , 
        "getKey":
            function(){return "test2";}});

    ASSERT.isTrue(target.hasMultipleOfClass("test2"));
}

exports.testThatEnvironmentDoesNotHaveMultipleOfClass = function() {
    var target = new Environment();

    target.addClass({"name":"test1", 
    "getKey":
        function(){return "test1";}});
    target.addClass({"name":"test2"    , 
        "getKey":
            function(){return "test2";}});

    ASSERT.isFalse(target.hasMultipleOfClass("test2"));
}

exports.testThatEnvironmentDoesScopeClassIfDefinedBefore = function() {
    var target = new Environment();
    
    target.addClass({"name":"test1", 
    "getKey":
        function(){return "test1";}});
    target.addClass({"name":"test2"    , 
        "getKey":
            function(){return "test2";}});
            
    ASSERT.isTrue(target.isClassInScopeForClass("test1", "test2"));
}

exports.testThatEnvironmentDoesNotScopeClassIfDefinedAfter = function() {
    var target = new Environment();

    target.addClass({"name":"test1", 
    "getKey":
        function(){return "test1";}});
    target.addClass({"name":"test2"    , 
        "getKey":
            function(){return "test2";}});

    ASSERT.isFalse(target.isClassInScopeForClass("test2", "test1"));
}

exports.testThatEnvironmentDoesAddError = function() {
    var target = new Environment();
    
    target.addError("this is an error!");
    
    ASSERT.eq(1, target.errors.length);
}

exports.testThatEnvironmentDoesReturnAllDataInToString = function() {
    var target = new Environment();
    
    target.addClass(new ClassMap("test"));
    target.addClass(new ClassMap("test2"));
    
    target.addError("error1");
    target.addError("error2");
    
    ASSERT.eq("\nClasses:\n"+target.classes[0].toString()+"\n"+
        target.classes[1].toString()+"\nScopes:\n[]\nErrors:\n"+"error1\nerror2", target.toString());
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
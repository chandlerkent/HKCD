var Environment = exports.Environment = function() {
    this.classes = {};
    this.errors = [];
};

Environment.prototype.addClass = function(aClass) {
    if (!!this.classes[aClass]) {
        return false;
    }
    
    this.classes[aClass] = { "methods": [] };
    return true;
};

Environment.prototype.getClass = function(aClass) {
    return (this.classes[aClass] || null);
};

Environment.prototype.hasClass = function(aClass) {
    return !!this.classes[aClass];
};

Environment.prototype.classHasMethod = function(aClass, aMethod) {
    return ( (this.hasClass(aClass)) && (this.getClass(aClass).methods.indexOf(aMethod) >= 0) );
};

Environment.prototype.addMethodToClass = function(aClass, aMethod) {
    if (this.hasClass(aClass)) {
        if (!this.classHasMethod(aClass, aMethod)) {
            this.getClass(aClass).methods.push(aMethod);
        }
    } else {
        throw new Error("Cannot add a method " + aMethod + " to non-existant class " + aClass);
    }
};

Environment.prototype.toString = function() {
    var result = "";
    for (var cls in this.classes) {
        result += cls + ": " + this.classes[cls].methods.toString() + "\n";
    }
    return result;
};
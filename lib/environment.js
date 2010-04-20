var environment = exports.environment = function() {
    this.classes = {};
    this.errors = [];
};

environment.prototype.addClass = function(aClass) {
    if (!!this.classes[aClass]) {
        return false;
    }
    
    this.classes[aClass] = { "methods": [] };
    return true;
};

environment.prototype.getClass = function(aClass) {
    return (this.classes[aClass] || null);
};

environment.prototype.hasClass = function(aClass) {
    return !!this.classes[aClass];
};

environment.prototype.classHasMethod = function(aClass, aMethod) {
    return (this.hasClass() && (this.getClass(aClass).methods.indexOf(aMethod) >= 0));
};

environment.prototype.addMethodToClass = function(aClass, aMethod) {
    if (this.hasClass(aClass)) {
        if (!this.classHasMethod(aClass, aMethod)) {
            this.getClass(aClass).methods.push(aMethod);
        }
    } else {
        throw new Error("Cannot add a method " + aMethod + " to non-existant class " + aClass);
    }
};
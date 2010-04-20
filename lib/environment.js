var Environment = exports.Environment = function() {
    this.classes = {};
    this.errors = [];
};

Environment.prototype.addClass = function(aClass, superClass) {
    if (!!this.classes[aClass]) {
        return false;
    }
    
    this.classes[aClass] = { "methods": {}, "superClass": superClass };
    return true;
};

Environment.prototype.getClass = function(aClass) {
    return (this.classes[aClass] || null);
};

Environment.prototype.hasClass = function(aClass) {
    return !!this.classes[aClass];
};

Environment.prototype.classHasMethod = function(aClass, aMethod) {
    return ( (this.hasClass(aClass)) && (!!this.getClass(aClass).methods[aMethod]) );
};

Environment.prototype.superHasMethod = function(aClass, aMethod) {
    if(!this.getClass(aClass).superClass)
        return false;

    return this.classOrSuperHasMethod(this.getClass(aClass).superClass, aMethod);
};

Environment.prototype.classOrSuperHasMethod = function(aClass, aMethod) {
    if(this.classHasMethod(aClass, aMethod))
        return true;
            
    if(!!this.classes[aClass].superClass)
        return this.classOrSuperHasMethod(this.classes[aClass].superClass, aMethod);
                        
    return false;
};

Environment.prototype.supersMethodType = function(aClass, aMethod) {
    if(!this.getClass(aClass).superClass)
        return;
    
    return this.getClass(this.getClass(aClass).superClass).methods[aMethod];
};

Environment.prototype.addMethodToClass = function(aClass, aMethod, methodType) {
    if (this.hasClass(aClass)) {
        if (!this.classHasMethod(aClass, aMethod)) {
            this.getClass(aClass).methods[aMethod] = methodType;
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
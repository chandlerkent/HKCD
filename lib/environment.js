var Environment = exports.Environment = function() {
    this.classes = {};
    this.errors = [];
};

Environment.prototype.addClass = function(aClass, superClass) {
    if (!!this.classes[aClass]) {
        return false;
    }
    
    this.classes[aClass] = { "methods": {}, "superClass": superClass, "fields": {} };
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

Environment.prototype.classHasField = function(aClass, aField) {
    return ( (this.hasClass(aClass)) && (!!this.getClass(aClass).fields[aField]) );
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

Environment.prototype.superClassHasField = function(aClass, aField) {
    if(!this.getClass(aClass).superClass)
        return false;
        
    return this.classOrSuperHasField(this.getClass(aClass).superClass, aField);
};

Environment.prototype.classOrSuperHasField = function(aClass, aField) {
    if(this.classHasField(aClass, aField))
        return true;

    if(!!this.classes[aClass].superClass)
        return this.classOrSuperHasField(this.getClass(aClass).superClass, aField);

    return false;
};

Environment.prototype.superClassThatHasField = function(aClass, aField) {
    return this.classOrSuperClassThatHasField(aClass, aField);
};

Environment.prototype.classOrSuperClassThatHasField = function(aClass, aField) {
    if(this.classHasField(aClass, aField))
        return aClass;
        
    if(!!this.classes[aClass].superClass)
        return this.classOrSuperClassThatHasField(this.classes[aClass].superClass, aField);
        
    return "None";
};

Environment.prototype.supersMethodType = function(aClass, aMethod) {
    return this.classOrSupersMethodType(this.getClass(aClass).superClass, aMethod);
};

Environment.prototype.classOrSupersMethodType = function(aClass, aMethod) {
    if(this.classHasMethod(aClass, aMethod))
        return this.classes[aClass].methods[aMethod];
        
    if(!!this.classes[aClass].superClass)
        return this.classOrSupersMethodType(this.getClass(aClass).superClass, aMethod);
    
    return "None";
};

Environment.prototype.addFieldToClass = function(aClass, aField, aType) {
    if (this.hasClass(aClass)) {
        if (!this.classHasField(aClass, aField)) {
            this.getClass(aClass).fields[aField] = aType;
        }
    } else {
        throw new Error("Cannot add a field " + aMethod + " to non-existant class " + aClass);
    }
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
var Environment = exports.Environment = function() {
    this.classes = [];
    this.errors = [];
};

Environment.prototype.isPrimitiveType = function(aType) {
    return (aType === "int" || aType === "boolean");
}

Environment.prototype.addClass = function(aClass) {
    this.classes.push(aClass);
};

Environment.prototype.getClass = function(aClassName) {
    return this.classes.getByKey(aClassName);
};

Environment.prototype.hasClass = function(aClassName) {
    return this.classes.containsKey(aClassName);
};

Environment.prototype.hasMultipleOfClass = function(aClassName) {
    var count = 0;
    
    for(var i = this.classes.length-1; i >= 0; i--)
        if(this.classes[i].getKey() === aClassName)
            count++;
            
    return (count > 1);
};

Environment.prototype.isClassInScopeForClass = function(classToFind, classToBaseSearchAgainst) {
    var maxSearchIndex = this.classes.indexOfByKey(classToBaseSearchAgainst);
    
    for(var i = 0; i < maxSearchIndex; i++) // go up because we need it to be _before_ base search class
        if(this.classes[i].getKey() === classToFind)
            return true;
            
    return false;
};

Environment.prototype.addError = function(message) {
    this.errors.push(message);
}

Environment.prototype.toString = function() {
    return "ENV\n\nClasses\n" + 
                this.classes.map(function(aClass) {
                    return aClass.toString();
                }).join("\n") + 
            "\nErrors\n" + 
                this.errors.join("\n");
}

Array.prototype.indexOfByKey = function(aKey) {
    for(var i = 0; i < this.length; i++) // go up because we want first hit
        if(this[i].getKey() === aKey)
            return i;
            
    return -1;
}

Array.prototype.getByKey = function(aName) {
    for(var i = this.length-1; i >= 0; i--)
        if(this[i].getKey() === aName)
            return this[i];
            
    return null;
};

Array.prototype.containsKey = function(aName) {
    var i = this.length - 1;
    
    while(i >= 0) {
        if(this[i].getKey() === aName)
            return true;
            
        i--;
    }
    
    return false;
};
Array.prototype.indexOfByKey = function(aKey) {
    for(var i = 0; i < this.length; i++) // go up because we want first hit
        if(this[i].getKey() === aKey)
            return i;
            
    return -1;
};

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

Array.prototype.hasMultipleByKey = function(key) {
    var foundOnce = false;
    
    var i = this.length - 1;
    while (i >= 0) {
        if (this[i].getKey() === key) {
            if (foundOnce)
                return true;
            else
                foundOnce = true;
        }
        i--;
    }
    
    return false;
};
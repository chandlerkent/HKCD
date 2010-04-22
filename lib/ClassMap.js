var ClassMap = exports.ClassMap = function(name, superclass) {
    this.name = name;
    this.superclass = superclass;
    this.fields = [];
    this.methods = [];
};

ClassMap.prototype.addField = function(fieldName, fieldType) {
    this.fields.push({"name": fieldName, "type": fieldType});
};
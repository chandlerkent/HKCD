var CodeEmitter = exports.CodeEmitter = function() {
    this.code = [];
};

CodeEmitter.prototype = {
    addCode: function(code) {
        this.code.push(code);
    },
    
    emitMainClass: function(className) {
        this.addCode(".class public " + className);
        this.addCode(".super java/lang/Object");
    },
    
    emitIntegerConstant: function(val) {
        this.addCode("bipush " + val);
    },
    
    emitMainMethodOpen: function() {
        this.addCode(".method public static main([Ljava/lang/String;)V");
        this.addCode(".limit stack 100");
        this.addCode(".limit locals 1");
    },
    
    emitMethodClose: function() {
        this.addCode("return");
        this.addCode(".end method");
    },
    
    emitGetStatic: function(field, descriptor) {
        this.addCode(["getstatic", field, descriptor].join(" "));
    },
    
    emitInvokeVirtual: function(method) {
        this.addCode(["invokevirtual", method].join(" "));
    },
    
    emitIntegerAdd: function() {
        this.addCode("iadd");
    },
    
    emitIntegerSubtract: function() {
        this.addCode("isub");
    },
    
    emitIntegerMultiply: function() {
        this.addCode("imul");
    },
    
    emitIntegerDivide: function() {
        this.addCode("idiv");
    },
};
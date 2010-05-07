var CodeEmitter = exports.CodeEmitter = function() {
    this.code = [];
    this.labels = [0];
    this.labelPrefix = "Label_";
};

CodeEmitter.prototype = {
    addCode: function(code) {
        this.code.push(code);
    },
    
    getNextLabel: function() {
        this.labels.unshift(this.labels[0]+1);
        return this.getLastLabel();
    },
    
    emitLabel: function(label) {
        this.addCode(label+":");
    },
    
    emitNoop: function() {
        this.addCode("nop");
    },
    
    emitGoto: function(label) {
        this.addCode(["goto", label].join(" "));
    },
    
    getLastLabel: function() {
        return this.labelPrefix + this.labels[0];
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
    
    emitIfLessThan: function() {
        this.addCode(["if_icmplt", this.getNextLabel()].join(" "));
    },
};
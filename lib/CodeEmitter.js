var CodeEmitter = exports.CodeEmitter = function() {
    this.code = [];
    this.labels = [0];
    this.labelPrefix = "Label_";
    this.locals = [0];
    this.localMap = {};
};

CodeEmitter.prototype = {
    addCode: function(code) {
        this.code.push(code);
    },
    
    getNextLabel: function() {
        this.labels.unshift(this.labels[0]+1);
        return this.getLastLabel();
    },
    
    getLastLabel: function() {
        return this.labelPrefix + this.labels[0];
    },
    
    getNextLocalVariable: function(varName) {
        this.locals.unshift(this.locals[0] + 1);
        var local = this.getLastLocalVariable();
        this.localMap[varName] = local;
        return local;
    },
    
    getLastLocalVariable: function() {
        return String(this.locals[0]);
    },
    
    getLocalVariable: function(varName) {
        return this.localMap[varName];
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
    
    emitMainClass: function(className) {
        this.addCode(".class public " + className);
        this.addCode(".super java/lang/Object");
    },
    
    emitIntegerConstant: function(val) {
        this.addCode("sipush " + val);
    },
    
    emitMainMethodOpen: function() {
        this.addCode(".method public static main([Ljava/lang/String;)V");
        this.emitMethodSetup(100, 5);
    },
    
    emitMethodSetup: function(stackSize, locals) {
        this.addCode([".limit stack", stackSize].join(" "));
        this.addCode([".limit locals", locals].join(" "));
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
    
    emitIf: function(trueLabel) {
        this.addCode(["ifne", trueLabel].join(" "));
    },
    
    emitComparator: function(operation) {
        var trueLabel = this.getNextLabel();
        var afterLabel = this.getNextLabel();

        this.addCode([operation, trueLabel].join(" "));
        this.emitFalse();
        this.emitGoto(afterLabel);
        
        this.emitLabel(trueLabel);
        this.emitTrue();
        this.emitGoto(afterLabel);
        
        this.emitLabel(afterLabel);
        this.emitNoop();
    },
    
    emitLessThan: function() {
        this.emitComparator("if_icmplt");
    },
    
    emitGreaterThan: function() {
        this.emitComparator("if_icmpgt");
    },
    
    emitLessThanEqual: function() {
        this.emitComparator("if_icmple");
    },
    
    emitGreaterThanEqual: function() {
        this.emitComparator("if_icmpge");
    },
    
    emitNewIntegerStore: function(varName) {
        this.emitExistingIntegerStore(this.getNextLocalVariable(varName));
    },
    
    emitExistingIntegerStore: function(local) {
        this.addCode(["istore", local].join(" "));
    },
    
    emitIntegerLoad: function(varName) {
        this.addCode(["iload", this.getLocalVariable(varName)].join(" "));
    },
    
    emitIntegerNegate: function() {
        this.addCode("ineg");
    },
    
    emitBooleanNot: function() {
        this.emitTrue();
        this.addCode("ixor");
    },
    
    emitTrue: function() {
        this.addCode("iconst_1");
    },
    
    emitFalse: function() {
        this.addCode("iconst_0");
    },
    
    emitAnd: function() {
        this.addCode("iand");
    },
    
    emitOr: function() {
        this.addCode("ior");
    },
};
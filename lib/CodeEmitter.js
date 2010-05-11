var LABEL_PREFIX = "Label_";

var CodeEmitter = exports.CodeEmitter = function() {
    this.files = {};
    this.currentFile = null;
    this.labels = [];
    this.locals = [];
    this.localMap = {};
};

CodeEmitter.prototype = {
    mapEnvTypeToJasminType: function(type) {
        if (type === "int" || type === "boolean") {
            return "I";
        }
        return "BOOBS";
    },
    
    buildMethodTypeDescriptor: function(paramTypes, returnType) {
        var methodDescriptor = ["("];
        
        // cache this
        var mapEnvTypeToJasminType = this.mapEnvTypeToJasminType;
        
        paramTypes.forEach(function(paramType) {
            methodDescriptor.push(mapEnvTypeToJasminType(paramType));
        });
        
        methodDescriptor.push(")");
        methodDescriptor.push(this.mapEnvTypeToJasminType(returnType));
        return methodDescriptor.join("");
    },
    
    newFile: function(fileName) {
        this.files[fileName] = [];
        this.currentFile = this.files[fileName];
    },

    addCode: function(code) {
        this.currentFile.push(code);
    },
    
    getNextLabel: function() {
        this.labels.unshift((this.labels[0] + 1) || 0);
        return this.getLastLabel();
    },
    
    getLastLabel: function() {
        return LABEL_PREFIX + this.labels[0];
    },
    
    getNextLocalVariable: function(varName) {
        this.locals.unshift((this.locals[0] + 1) || 0);
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
    
    emitNull: function() {
        this.addCode("aconst_null");
    },
    
    emitNoop: function() {
        this.addCode("nop");
    },
    
    emitGoto: function(label) {
        this.addCode(["goto", label].join(" "));
    },
    
    emitMainClass: function(className) {
        this.newFile(className);
        this.addCode(".class public " + className);
        this.addCode(".super java/lang/Object");
    },
    
    emitClass: function(className) {
        this.newFile(className);
        this.addCode([".class public", className].join(" "));
        this.addCode(".super java/lang/Object");
    },
    
    emitIntegerConstant: function(val) {
        this.addCode("ldc " + val);
    },
    
    emitMainMethodOpen: function() {
        this.addCode(".method public static main([Ljava/lang/String;)V");
        this.emitMethodSetup(100, 10);
    },
    
    emitMethodOpen: function(name, type) {
        this.addCode([".method public", name + type].join(" "));
        this.emitMethodSetup(100, 5);
    },
    
    emitMethodSetup: function(stackSize, locals) {
        this.addCode([".limit stack", stackSize].join(" "));
        this.addCode([".limit locals", locals].join(" "));
    },
    
    emitMethodClose: function() {
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
    
    emitObjectStore: function(varName) {
        this.addCode(["astore", this.getNextLocalVariable(varName)].join(" "));
    },
    
    emitExistingIntegerStore: function(local) {
        this.addCode(["istore", local].join(" "));
    },
    
    emitIntegerLoad: function(varName) {
        this.addCode(["iload", this.getLocalVariable(varName)].join(" "));
    },
    
    emitObjectLoad: function(varName) {
        this.addCode(["aload", this.getLocalVariable(varName)].join(" "));
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
    
    emitIntegerEqual: function() {
        this.emitComparator("if_icmpeq");
    },
    
    emitIntegerNotEqual: function() {
        this.emitComparator("if_icmpne");
    },
    
    emitObjectEqual: function() {
        this.emitComparator("if_acmpeq");
    },

    emitObjectNotEqual: function() {
        this.emitComparator("if_acmpne");
    },
    
    emitIntegerReturn: function() {
        this.addCode("ireturn");
    },
    
    emitObjectReturn: function() {
        this.addCode("areturn");
    },
    
    emitNullReturn: function() {
        this.addCode("return");
    },
    
    emitField: function(access, fieldName, type) {
        this.addCode([".field", access, fieldName, this.mapEnvTypeToJasminType(type)].join(" "));
    },
};
var CodeEmitter = exports.CodeEmitter = function() {
    this.files = {};
    this.currentFile = null;
    this.labels = [];
    this.locals = [];
    this.localMap = {};
};

CodeEmitter.prototype = {    
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
    
    resetLocals: function() {
        this.locals = [];
        this.localMap = {};
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
    
    emitClass: function(className, superClassName) {
        this.newFile(className);
        this.addCode([".class public", className].join(" "));
        this.emitSuper(superClassName || "java/lang/Object");
    },
    
    emitClassInitializer: function(superClassName) {
        this.emitMethod("<init>", "public", [], null);
        this.addCode("aload_0");
        this.emitInvokeSpecial(superClassName || "java/lang/Object", "<init>", [], null);
        this.emitNullReturn();
        this.emitMethodClose();
    },
    
    emitSuper: function(className) {
        this.addCode([".super", className].join(" "));
    },
    
    emitIntegerConstant: function(val) {
        this.addCode("ldc " + val);
    },
    
    emitMainMethodOpen: function() {
        this.emitMethod("main", "public static", [["java/lang/String"]], null);
        this.emitMethodSetup(100, 10);
    },
    
    emitMethodOpen: function(name, paramTypes, returnType) {
        this.emitMethod(name, "public", paramTypes, returnType);
        this.emitMethodSetup(100, 5);
    },
    
    emitMethod: function(name, access, paramTypes, returnType) {
        this.addCode(".method " + access + " " + name + buildMethodTypeDescriptor(paramTypes, returnType));
    },
    
    emitMethodSetup: function(stackSize, locals) {
        this.addCode([".limit stack", stackSize].join(" "));
        this.addCode([".limit locals", locals].join(" "));
        this.resetLocals();
    },
    
    emitMethodClose: function() {
        this.addCode(".end method");
    },
    
    emitGetStatic: function(field, descriptor) {
        this.addCode(["getstatic", field, descriptor].join(" "));
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
        this.addCode([".field", access, fieldName, mapEnvTypeToJasminType(type)].join(" "));
    },
    
    emitNew: function(className) {
        this.addCode(["new", className].join(" "));
        this.addCode("dup");
        this.addCode(["invokespecial", className + "/" + "<init>()V"].join(" "));
    },
    
    emitInvokeVirtual: function(className, methodName, paramTypes, returnType) {
        this.emitInvoke("virtual", className, methodName, paramTypes, returnType);
    },
    
    emitInvokeSpecial: function(className, methodName, paramTypes, returnType) {
        this.emitInvoke("special", className, methodName, paramTypes, returnType);
    },
    
    emitInvoke: function(specialOrVirtual, className, methodName, paramTypes, returnType) {
        this.addCode("invoke" + specialOrVirtual + " " + className + "/" + methodName + buildMethodTypeDescriptor(paramTypes, returnType));
    },
    
    emitGetField: function(className, fieldName, type) {
        this.addCode("getfield " + className + "/" + fieldName + " " + mapEnvTypeToJasminType(type));
    },
    
    emitPutField: function(className, fieldName, type) {
        this.addCode("putfield " + className + "/" + fieldName + " " + mapEnvTypeToJasminType(type));
    },
};

// CONSTANTS
var LABEL_PREFIX = "Label_";

var mapEnvTypeToJasminType = function(type) {
    if (type === "int" || type === "boolean") {
        return "I";
    } else if (type instanceof Array) {
        return "[" + mapEnvTypeToJasminType(type[0]);
    } else if (type === null) {
        return "V";
    } else {
        return "L" + type + ";";
    }
};

var buildMethodTypeDescriptor = function(paramTypes, returnType) {
    var methodDescriptor = ["("];
    
    paramTypes.forEach(function(paramType) {
        methodDescriptor.push(mapEnvTypeToJasminType(paramType));
    });
    
    methodDescriptor.push(")");
    methodDescriptor.push(mapEnvTypeToJasminType(returnType));
    return methodDescriptor.join("");
};
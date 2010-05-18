var CodeEmitter = exports.CodeEmitter = function() {
    this.files = {};
    this.currentFile = this.previousFile = null;
    this.labels = [];
    this.locals = [];
    this.localMap = {};
    this.anonymousClasses = [];
};

CodeEmitter.prototype = {    
    newFile: function(fileName) {
        this.files[fileName] = [];
        this.previousFile = this.currentFile;
        this.currentFile = fileName;
    },

    addCode: function(code) {
        this.files[this.currentFile].push(code);
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
    
    createNewAnonymousClass: function() {
        var result = "Anon$"+this.anonymousClasses.length;
        
        this.anonymousClasses.unshift(result);
        
        return this.anonymousClasses[0];
    },
    
    endAnonymousClass: function() {
        this.currentFile = this.previousFile;
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
    
    emitInterface: function(className) {        
        this.files[className] = [];
        this.currentFile = className;
        
        this.addCode([".interface public", className].join(" "));
        this.emitSuper("java/lang/Object");
    },
    
    emitClass: function(className, superClassName, interfaces) {
        this.newFile(className);
        this.addCode([".class public", className].join(" "));
        this.emitSuper(superClassName || "java/lang/Object");
        
        interfaces = interfaces || [];
        for (var i = 0; i < interfaces.length; i++) {
            this.emitImplements(interfaces[i]);
        }
    },
    
    emitDefaultClassInitializer: function(superClassName) {
        this.emitMethod("<init>", "public", [], null);
        this.addCode("aload_0");
        this.emitInvokeSpecial(superClassName || "java/lang/Object", "<init>", [], null);
        this.emitNullReturn();
        this.emitMethodClose();
    },
    
    emitClassInitializer: function(className, params) {        
        var paramTypes = params.map(function(param) { return param.getType(); });
        this.emitMethod("<init>", "public", paramTypes, null);
        this.emitMethodSetup(100, params.length + 1);
        this.resetLocals();
        
        var thisSlot = this.getNextLocalVariable("this");
        this.emitObjectLoad(thisSlot);
        this.emitInvokeSpecial("java/lang/Object", "<init>", [], null);
        
        for (var i = 0; i < params.length; i++) {
            this.emitObjectLoad(thisSlot);
            (params[i].getType() === "int" || params[i].getType() === "boolean") ?
                this.emitIntegerLoad(this.getNextLocalVariable(params[i].getKey())) :
                this.emitObjectLoad(this.getNextLocalVariable(params[i].getKey()));
            
            this.emitPutField(className, params[i].getKey(), params[i].getType());
        }
        
        this.emitNullReturn();
        this.emitMethodClose();
    },
    
    emitSuper: function(className) {
        this.addCode([".super", className].join(" "));
    },
    
    emitImplements: function(className) {
        this.addCode([".implements", className].join(" "));
    },
    
    emitIntegerConstant: function(val) {
        this.addCode("ldc " + val);
    },
    
    emitMainMethodOpen: function() {
        this.emitMethod("main", "public static", [["java/lang/String"]], null);
        this.emitMethodSetup(100, 20);
    },
    
    emitMethodOpen: function(name, paramTypes, returnType) {
        this.emitMethod(name, "public", paramTypes, returnType);
        this.emitMethodSetup(100, 20);
    },
    
    emitMethod: function(name, access, paramTypes, returnType) {
        this.addCode(".method " + access + " " + name + buildMethodTypeDescriptor(paramTypes, returnType));
    },
    
    emitAbstractMethod: function(name, paramTypes, returnType) {
        this.emitMethod(name, "public abstract", paramTypes, returnType);
        this.emitMethodClose();
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

    emitIfEqual: function(trueLabel) {
        this.addCode(["ifeq", trueLabel].join(" "));
    },
    
    emitComparator: function(operation, afterLabel) {
        var trueLabel = this.getNextLabel();
        if(!afterLabel)
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
    
    emitShortCircuit: function(shortOn) {
        if(shortOn === "true") {
            this.emitIf(this.shortCircuitTrueLabel);
        } else {
            this.emitIf(this.shortCircuitFalseLabel);
        }
    },
    
    setupShortCircuit: function(trueLabel, falseLabel) {
        this.shortCircuitTrueLabel = trueLabel;
        this.shortCircuitFalseLabel = falseLabel;
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
    
    emitIntegerStore: function(varSlot) {
        this.addCode(["istore", varSlot].join(" "));
    },
    
    emitObjectStore: function(varSlot) {
        this.addCode(["astore", varSlot].join(" "));
    },
    
    emitIntegerLoad: function(varSlot) {
        this.addCode(["iload", varSlot].join(" "));
    },
    
    emitObjectLoad: function(varSlot) {
        this.addCode(["aload", varSlot].join(" "));
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
    
    emitNew: function(className, params) {
        params = params || [];
        this.addCode(["new", className].join(" "));
        this.addCode("dup");

        for (var i = 0; i < params.length; i++) {
            (params[i].getType() === "int" || params[i].getType() === "boolean") ?
                this.emitIntegerLoad(this.getLocalVariable(params[i].getKey())) :
                this.emitObjectLoad(this.getLocalVariable(params[i].getKey()));
        }
        
        var paramTypes = params.map(function(variable) { return variable.getType(); });
        
        this.addCode(["invokespecial", className + "/" + "<init>" + buildMethodTypeDescriptor(paramTypes, null)].join(" "));
    },
    
    emitInvokeVirtual: function(className, methodName, paramTypes, returnType) {
        this.emitInvoke("virtual", className, methodName, paramTypes, returnType);
    },
    
    emitInvokeSpecial: function(className, methodName, paramTypes, returnType) {
        this.emitInvoke("special", className, methodName, paramTypes, returnType);
    },
    
    emitInvokeInterface: function(className, methodName, paramTypes, returnType) {
        this.addCode("invokeinterface " + className + "/" + methodName + buildMethodTypeDescriptor(paramTypes, returnType) + " " + (paramTypes.length + 1));
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
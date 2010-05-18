var ClassMap = require("../Environment").ClassMap;

var emitBinaryOp = function(lhs, rhs, fn, emitter, env) {
    lhs.emit(emitter, env);
    rhs.emit(emitter, env);
    emitter[fn]();
};

var emitFunctionForType = function(type, env, functions) {
    if(env.isPrimitiveType(type)) {
        functions["int"]();
    } else {
        functions["object"]();
    }
};

exports.Program = function(emitter, env) {
    env.pushScope(this.getScope());
    
    this.children.forEach(function(child) {
        child.emit(emitter, env);
    });
    
    env.popScope();
};

exports.MainClassDecl = function(emitter, env) {
    env.pushScope(this.getScope());
    env.enterClassScope(this.getClassName());
    
    emitter.emitClass(this.getClassName());
    this.children[0].emit(emitter, env); // MainMethodDecl
    
    env.exitClassScope();
    env.popScope();
};

exports.MainMethodDecl = function(emitter, env) {
    env.pushScope(this.getScope());
    env.enterMethodScope(this.getMethodName());
    
    emitter.emitMainMethodOpen();
    this.children.forEach(function(child) {
        child.emit(emitter, env); // statements
    });
    emitter.emitNullReturn();
    emitter.emitMethodClose();
    
    env.exitMethodScope();
    env.popScope();
};

exports.ClassDecl = function(emitter, env) {
    env.pushScope(this.getScope());
    env.enterClassScope(this.getClassName());

    emitter.emitClass(this.getClassName(), this.getSuperClassName());
    var fields = [];
    var methods = [];
    this.children.forEach(function(child) {
        if (child.isFieldDeclaration())
            fields.push(child);
        else if (child.isMethodDeclaration())
            methods.push(child);
    });

    fields.forEach(function(field) {
        field.emit(emitter, env);
    });

    emitter.emitDefaultClassInitializer(this.getSuperClassName());

    methods.forEach(function(method) {
        method.emit(emitter, env);
    });
    
    env.exitClassScope();
    env.popScope();
};

exports.MethodDecl = function(emitter, env) {
    env.pushScope(this.getScope());
    env.enterMethodScope(this.getMethodName());
    
    var params = env.getCurrentMethod().getParameters();

    var paramTypes = [];
    params.forEach(function(param) {
        paramTypes.push(param.getType());
    });

    emitter.emitMethodOpen(this.getMethodName(), paramTypes, this.getReturnType());
    
    // store 'this' as var ref 0
    emitter.getNextLocalVariable("this");

    this.children.forEach(function(child) {
        child.emit(emitter, env);
    });
    
    emitter.emitMethodClose();

    env.exitMethodScope();
    env.popScope();
};

exports.Formal = function(emitter, env) {
    env.pushScope(this.getScope());
    
    emitter.getNextLocalVariable(this.getParameterName());
    
    env.popScope();
};

exports.ReturnExpression = function(emitter, env) {
    env.pushScope(this.getScope());

    this.getExpression().emit(emitter, env);

    emitFunctionForType(this.secretReturnType, env, {
        "int": function() {emitter.emitIntegerReturn();},
        "object": function() {emitter.emitObjectReturn();},
    });
    
    env.popScope();
};

exports.CallExpression = function(emitter, env) {
    this.children[0].emit(emitter, env); // left of dot
    this.children[1].forEach(function(child) { // params
        child.emit(emitter, env);
    });
    
    var className = this.children[0].getExpressionType(env);
    var methodName = this.getMethodCallName();
    var method = env.getMethodForClass(className, methodName);
    
    var paramTypes = method.getParameters().map(function(param) {
        return param.getType();
    });
    
    emitter.emitInvokeVirtual(className, methodName, paramTypes, method.getReturnType());
};

exports.NullExpression = function(emitter, env) {
    emitter.emitNull();
};

exports.PrintLine = function(emitter, env) {
    env.pushScope(this.getScope());
    
    emitter.emitGetStatic("java/lang/System/out", "Ljava/io/PrintStream;");
    this.getValue().emit(emitter, env); // expr
    emitter.emitInvokeVirtual("java/io/PrintStream", "println", ["int"], null);
    
    env.popScope();
};

exports.IntegerExpression = function(emitter, env) {
    emitter.emitIntegerConstant(this.expression);
};

exports.AddExpression = function(emitter, env) {
    emitBinaryOp(this.children[0], this.children[1], "emitIntegerAdd", emitter, env);
};

exports.SubtractExpression = function(emitter, env) {
    emitBinaryOp(this.children[0], this.children[1], "emitIntegerSubtract", emitter, env);
};

exports.MultiplyExpression = function(emitter, env) {
    emitBinaryOp(this.children[0], this.children[1], "emitIntegerMultiply", emitter, env);
};

exports.DivideExpression = function(emitter, env) {
    emitBinaryOp(this.children[0], this.children[1], "emitIntegerDivide", emitter, env);
};

exports.If = function(emitter, env) {
    env.pushScope(this.getScope());
    
    this.getCondition().emit(emitter, env);

    var trueLabel = emitter.getNextLabel();
    var after = emitter.getNextLabel();
    
    emitter.emitIf(trueLabel);
    
    this.children[1].emit(emitter, env);
    emitter.emitGoto(after);
    
    emitter.emitLabel(trueLabel);
    this.children[0].emit(emitter, env);
    emitter.emitGoto(after);
    
    emitter.emitLabel(after);
    emitter.emitNoop();
    
    env.popScope();
};

exports.While = function(emitter, env) {
    env.pushScope(this.getScope());
    
    var loop = emitter.getNextLabel();
    
    emitter.emitLabel(loop);
    this.getCondition().emit(emitter, env);
    
    var trueLabel = emitter.getNextLabel();
    emitter.emitIf(trueLabel);
    
    var after = emitter.getNextLabel();
    emitter.emitGoto(after);

    emitter.emitLabel(trueLabel);
    this.children[0].emit(emitter, env);
    emitter.emitGoto(loop);
    
    emitter.emitLabel(after);
    emitter.emitNoop();
    
    env.popScope();
};

exports.LessThanExpression = function(emitter, env) {
    emitBinaryOp(this.children[0], this.children[1], "emitLessThan", emitter, env);
};

exports.GreaterThanExpression = function(emitter, env) {
    emitBinaryOp(this.children[0], this.children[1], "emitGreaterThan", emitter, env);
};

exports.LessThanEqualExpression = function(emitter, env) {
    emitBinaryOp(this.children[0], this.children[1], "emitLessThanEqual", emitter, env);
};

exports.GreaterThanEqualExpression = function(emitter, env) {
    emitBinaryOp(this.children[0], this.children[1], "emitGreaterThanEqual", emitter, env);
};
exports.Block = function(emitter, env) {
    env.pushScope(this.getScope());
    
    this.children.forEach(function(child) {
        child.emit(emitter, env);
    });
    
    env.popScope();
};

exports.InitialAssignment = function(emitter, env) {
    env.pushScope(this.getScope());

    this.getValue().emit(emitter, env);
    
    var varName = this.getVariableName();
    emitFunctionForType(this.getValue().getExpressionType(env), env, {
        "int":function(){emitter.emitIntegerStore(emitter.getNextLocalVariable(varName));},
        "object":function(){emitter.emitObjectStore(emitter.getNextLocalVariable(varName));}
    });
    
    env.popScope();
};

exports.Assignment = function(emitter, env) {
    env.pushScope(this.getScope());
    
    var curClass = env.getCurrentClass().getKey();
    var varName = this.getVariableName();

    if (env.classHasField(curClass, varName)) {
        var type = env.getFieldForClass(curClass, varName).getType();
        emitter.emitObjectLoad(emitter.getLocalVariable("this"));
        this.getValue().emit(emitter, env);
        emitter.emitPutField(curClass, varName, type);
    } else {
        this.getValue().emit(emitter, env);
        var varSlot = emitter.getLocalVariable(varName);
        emitFunctionForType(this.getValue().getExpressionType(env), env, {
            "int":function(){emitter.emitIntegerStore(varSlot);},
            "object":function(){emitter.emitObjectStore(varSlot);}
        });
    }
    
    env.popScope();
};

exports.IDExpression = function(emitter, env) {
    var curClass = env.getCurrentClass().getKey();
    var varName = this.getValue();
    
    if (env.classHasField(curClass, varName)) {
        var type = env.getFieldForClass(curClass, varName).getType();
        emitter.emitObjectLoad(emitter.getLocalVariable("this"));
        emitter.emitGetField(curClass, varName, type);
    } else {
        var varSlot = emitter.getLocalVariable(varName);
        emitFunctionForType(this.getExpressionType(env), env, {
            "int":function(){emitter.emitIntegerLoad(varSlot)},
            "object":function(){emitter.emitObjectLoad(varSlot)}
        });
    }
};

exports.NegateExpression = function(emitter, env) {
    this.children[0].emit(emitter, env);
    emitter.emitIntegerNegate();
};

exports.NotExpression = function(emitter, env) {
    this.children[0].emit(emitter, env);
    emitter.emitBooleanNot();
};

exports.TrueExpression = function(emitter, env) {
    emitter.emitTrue();
};

exports.FalseExpression = function(emitter, env) {
    emitter.emitFalse();
};

exports.AndExpression = function(emitter, env) {
    var falseLabel = emitter.getNextLabel();
    var endLabel = emitter.getNextLabel();

    this.children[0].emit(emitter, env);
    emitter.emitIfEqual(falseLabel);
    this.children[0].emit(emitter, env);
    this.children[1].emit(emitter, env);
    emitter.emitAnd();
    emitter.emitGoto(endLabel);
    emitter.emitLabel(falseLabel);
    emitter.emitFalse();
    emitter.emitLabel(endLabel);
};

exports.OrExpression = function(emitter, env) {
    var trueLabel = emitter.getNextLabel();
    var endLabel = emitter.getNextLabel();

    this.children[0].emit(emitter, env);
    emitter.emitIf(trueLabel);
    this.children[0].emit(emitter, env);
    this.children[1].emit(emitter, env);
    emitter.emitOr();
    emitter.emitGoto(endLabel);
    emitter.emitLabel(trueLabel);
    emitter.emitTrue();
    emitter.emitLabel(endLabel);
};

exports.EqualExpression = function(emitter, env) {
    var lhs = this.children[0];
    var rhs = this.children[1];
    emitFunctionForType(this.getExpressionType(env), env, {
        "int":function(){emitBinaryOp(lhs, rhs, "emitIntegerEqual", emitter, env);},
        "object":function(){emitBinaryOp(lhs, rhs, "emitObjectEqual", emitter, env);}
    });
};

exports.NotEqualExpression = function(emitter, env) {
    var lhs = this.children[0];
    var rhs = this.children[1];
    
    emitFunctionForType(lhs.getExpressionType(env), env, {
        "int":function(){emitBinaryOp(lhs, rhs, "emitIntegerNotEqual", emitter, env);},
        "object":function(){emitBinaryOp(lhs, rhs, "emitObjectNotEqual", emitter, env);}
    });
};

exports.ClassVarDecl = function(emitter, env) {
    env.pushScope(this.getScope());
    
    emitter.emitField("public", this.getFieldName(), this.getType());
    
    env.popScope();
};

exports.ConstructExpression = function(emitter, env) {
    emitter.emitNew(this.getClassName());
};

exports.ThisExpression = function(emitter, env) {
    emitter.emitObjectLoad(emitter.getLocalVariable("this"));
};

exports.ClosureExpression = function(emitter, env) {
    var localsCache = emitter.locals;
    var localMapCache = emitter.localMap;
    
    var parameterTypes = this.children.filter(function(child) { return child.isParameterDeclaration(); })
            .map(function (parameter) { return parameter.getType(); });
    
    env.pushScope(this.getReturnExpression().getScope());
    var returnType = this.getReturnExpression().getExpressionType(env);
    env.popScope();
    
    var className = emitter.createNewAnonymousClass();
    var interfaceName = env.getInterfaceTypeOfClosure(parameterTypes, returnType);
    
    emitter.emitClass(className, null, [interfaceName]);
    
    var variables = env.getCurrentScope().variables;
    variables.forEach(function(variable) {
        emitter.emitField("private", variable.getKey(), variable.getType());
    });
    
    emitter.emitClassInitializer(className, variables);
    
    emitter.emitMethodOpen("apply", parameterTypes, returnType);

    // store 'this' as var ref 0
    emitter.getNextLocalVariable("this");

    var params = this.children.filter(function(child) { return child.isParameterDeclaration(); });
    params.forEach(function(param) {
        param.emit(emitter, env);
    });
    
    var classMap = new ClassMap(className, null);
    variables.forEach(function(variable) {
        classMap.addField(variable.copy());
    });
    var oldClassName = env.getCurrentClass().getKey();
    env.addClass(classMap);
    env.enterClassScope(classMap.getKey());
    var body = this.children.filter(function(child) { return !child.isParameterDeclaration() && !child.isReturnExpression(); });
    body.forEach(function(stmt) {
        stmt.emit(emitter, env);
    });
    env.exitClassScope();
    env.enterClassScope(oldClassName);
    
    this.getReturnExpression().emit(emitter, env);
    
    emitter.emitMethodClose();
    
    emitter.emitInterface(interfaceName);
    emitter.emitAbstractMethod("apply", parameterTypes, returnType);
    
    emitter.endAnonymousClass();
    
    emitter.locals = localsCache;
    emitter.localMap = localMapCache;

    emitter.emitNew(className, variables);
};

exports.ClosureCallExpression = function(emitter, env) {
    this.children[0].emit(emitter, env);
    this.children[1].forEach(function(child) { // params
        child.emit(emitter, env);
    });
    
    var closure = this.secretClosure;//s env.getVariableInCurrentScope(this.getClosureName()).getValue();

    var parameterTypes = closure.getParameters().map(function(parameter) { return parameter.getType(); });
    
    var className = env.getInterfaceTypeOfClosure(parameterTypes, closure.getReturnType());
    var methodName = "apply";
    
    emitter.emitInvokeInterface(className, methodName, parameterTypes, closure.getReturnType());
};
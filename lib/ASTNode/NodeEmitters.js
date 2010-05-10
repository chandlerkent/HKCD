var emitBinaryOp = function(lhs, rhs, fn, emitter, env) {
    lhs.emit(emitter, env);
    rhs.emit(emitter, env);
    emitter[fn]();
};

var mapEnvTypeToJasminType = function(type) {
    if (type === "int" || type === "boolean") {
        return "I";
    }
    return "BOOBS";
};

exports.Program = function(emitter, env) {
    this.children.forEach(function(child) {
        child.emit(emitter, env);
    });
};

exports.MainClassDecl = function(emitter, env) {
    emitter.emitMainClass(this.getClassName());
    this.children[0].emit(emitter, env); // MainMethodDecl
};

exports.MainMethodDecl = function(emitter, env) {
    emitter.emitMainMethodOpen();
    this.children.forEach(function(child) {
        child.emit(emitter, env); // statements
    });
    emitter.emitMethodClose();
};

exports.ClassDecl = function(emitter, env) {
    emitter.emitClass(this.getClassName());
    this.children.forEach(function(child) {
        child.emit(emitter, env);
    });
};

exports.MethodDecl = function(emitter, env) {
    var methodTypeDescriptor = "(";
    var params = this.children.filter(function(child) {
        return child.isParameterDeclaration();
    });
    
    params.forEach(function(param) {
        methodTypeDescriptor += mapEnvTypeToJasminType(param.getType());
    });
    
    methodTypeDescriptor += ")";
    methodTypeDescriptor += mapEnvTypeToJasminType(this.getReturnType());
    
    emitter.emitMethodOpen(this.getMethodName(), methodTypeDescriptor);
    
    this.children.forEach(function(child) {
        child.emit(emitter, env);
    });

    emitter.emitMethodClose();
};

exports.Formal = function(emitter, env) {
    emitter.getNextLocalVariable(this.getParameterName());
};

exports.ReturnExpression = function(emitter, env) {
    this.getExpression().emit(emitter, env);
};

exports.NullExpression = function(emitter, env) {
    emitter.emitNull();
};

exports.PrintLine = function(emitter, env) {
    emitter.emitGetStatic("java/lang/System/out", "Ljava/io/PrintStream;");
    this.getValue().emit(emitter, env); // expr
    emitter.emitInvokeVirtual("java/io/PrintStream/println(I)V");
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
};

exports.While = function(emitter, env) {
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
    this.children.forEach(function(child) {
        child.emit(emitter, env);
    });
};

exports.InitialAssignment = function(emitter, env) {
    this.getValue().emit(emitter, env);
    emitter.emitNewIntegerStore(this.getVariableName());
};

exports.Assignment = function(emitter, env) {
    this.getValue().emit(emitter, env);
    emitter.emitExistingIntegerStore(emitter.getLocalVariable(this.getVariableName()));
};

exports.IDExpression = function(emitter, env) {
    emitter.emitIntegerLoad(this.getValue());
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
    emitBinaryOp(this.children[0], this.children[1], "emitAnd", emitter, env);
};

exports.OrExpression = function(emitter, env) {
    emitBinaryOp(this.children[0], this.children[1], "emitOr", emitter, env);
};

exports.EqualExpression = function(emitter, env) {
    emitBinaryOp(this.children[0], this.children[1], "emitIntegerEqual", emitter, env);
};

exports.NotEqualExpression = function(emitter, env) {
    emitBinaryOp(this.children[0], this.children[1], "emitIntegerNotEqual", emitter, env);
};
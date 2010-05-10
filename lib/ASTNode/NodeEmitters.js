exports.Program = function(emitter, env) {
    this.children[0].emit(emitter, env); // MainClassDecl
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

exports.PrintLine = function(emitter, env) {
    emitter.emitGetStatic("java/lang/System/out", "Ljava/io/PrintStream;");
    this.getValue().emit(emitter, env); // expr
    emitter.emitInvokeVirtual("java/io/PrintStream/println(I)V");
};

exports.IntegerExpression = function(emitter, env) {
    emitter.emitIntegerConstant(this.expression);
};

exports.AddExpression = function(emitter, env) {
    this.children[0].emit(emitter, env); // left expr
    this.children[1].emit(emitter, env); // right expr
    emitter.emitIntegerAdd();
};

exports.SubtractExpression = function(emitter, env) {
    this.children[0].emit(emitter, env); // left expr
    this.children[1].emit(emitter, env); // right expr
    emitter.emitIntegerSubtract();
};

exports.MultiplyExpression = function(emitter, env) {
    this.children[0].emit(emitter, env); // left expr
    this.children[1].emit(emitter, env); // right expr
    emitter.emitIntegerMultiply();
};

exports.DivideExpression = function(emitter, env) {
    this.children[0].emit(emitter, env); // left expr
    this.children[1].emit(emitter, env); // right expr
    emitter.emitIntegerDivide();
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
    this.children[0].emit(emitter, env); // left expr
    this.children[1].emit(emitter, env);
    emitter.emitIfLessThan();
};

exports.GreaterThanExpression = function(emitter, env) {
    this.children[0].emit(emitter, env); // left expr
    this.children[1].emit(emitter, env);
    emitter.emitIfGreaterThan();
};

exports.LessThanEqualExpression = function(emitter, env) {
    this.children[0].emit(emitter, env); // left expr
    this.children[1].emit(emitter, env);
    emitter.emitIfLessThanEqual();
};

exports.GreaterThanEqualExpression = function(emitter, env) {
    this.children[0].emit(emitter, env); // left expr
    this.children[1].emit(emitter, env);
    emitter.emitIfGreaterThanEqual();
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
    this.children[0].emit(emitter, env); // left expr
    this.children[1].emit(emitter, env); // right expr
    emitter.emitAnd();
};

exports.OrExpression = function(emitter, env) {
    this.children[0].emit(emitter, env); // left expr
    this.children[1].emit(emitter, env); // right expr
    emitter.emitOr();
};
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
    var then = emitter.getLastLabel();
    
    this.children[1].emit(emitter, env);
    var after = emitter.getNextLabel();
    emitter.emitGoto(after);
    
    emitter.emitLabel(then);
    this.children[0].emit(emitter, env);
    emitter.emitGoto(after);
    
    emitter.emitLabel(after);
    emitter.emitNoop();
};

exports.LessThanExpression = function(emitter, env) {
    this.children[0].emit(emitter, env); // left expr
    this.children[1].emit(emitter, env);
    emitter.emitIfLessThan();
};

exports.Block = function(emitter, env) {
    this.children.forEach(function(child) {
        child.emit(emitter, env);
    });
};
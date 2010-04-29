var TypeError = exports.TypeError = function(message, lineno) {
    this.message = message + (message[message.length - 1] === "." ? "" : ".");
    this.lineno = lineno + 1;
};

TypeError.prototype.toString = function() {
    return "Type error on line " + this.lineno + ": " + this.message;
};

TypeError.prototype.equals = function(other) {
    return (this.message === other.message);
};
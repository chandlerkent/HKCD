var File = require("file");
var Parser = require("./parser").Parser;
var TypeChecker = require("./TypeChecker").TypeChecker;
var Utils = require("./utils");

var Compiler = exports.Compiler = function(file, options, steps) {
    this.steps = steps || [new Parser(), new TypeChecker()];
    this.file = file;
    this.errors = [];
    this.options = options;

    this.addErrors = function(errors) {
        this.errors = this.errors.concat([].concat(errors));
    };
    
    this.debug = function(message) {
        if (this.options.debug)
            print(message);
    };
};

Compiler.prototype.compile = function() {
    var i = 0;
    var data = this.file;
    while ((data !== false) && (i < this.steps.length)) {
        data = this.steps[i].execute(data, this);
        i++;
    }
    
    if (data === false) {
        print("===============");
        print("COMPILE FAILED.");
        print("===============");
        print(this.errors.join("\n"));
        return this.errors.join("\n");
    } else {
        print("===============================");
        print("COMPILE FINISHED SUCCESSFULLLY.");
        print("===============================");
        return data;
    }
};

// Options Parser
var optionsParser = new (require("args").Parser)();

optionsParser.usage("INPUT_FILE");
optionsParser.help("Compiles an input file.");

optionsParser.option("-d", "debug")
    .def(false)
    .set(true)
    .help("Outputs useful debug messages along the way.");

optionsParser.helpful();

function main() {
    var options = optionsParser.parse(require("system").args);
    
    if (options.args.length < 1) {
        optionsParser.printUsage(options);
        return;
    }

    if (File.isDirectory(options.args[0])) {
        Utils.processDirectory(options.args[0], function(file) {
            return (new Compiler(file, options)).compile();
        });
    } else {
        (new Compiler(options.args[0], options)).compile();
    }

    return;
}

if (require.main === module)
    require("os").exit(main());
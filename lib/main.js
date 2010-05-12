var File = require("file");
var Compiler = require("./Compiler").Compiler;
var Utils = require("./utils");

var optionsParser = Utils.createOptionsParser();

function main() {
    var options = optionsParser.parse(require("system").args);
    
    if (options.args.length < 1) {
        optionsParser.printUsage(options);
        return -1;
    }

    if (File.isDirectory(options.args[0])) {
        Utils.processDirectory(options.args[0], function(file) {
            options.args[0] = file;
            var compiler = new Compiler(options);
            var success = compiler.compile();
            
            return (success) ? compiler.result : compiler.errors.join("\n");
        });
    } else {
        var compiler = new Compiler(options);
        var success = compiler.compile();
        if (success) {
            print("===============================");
            print("COMPILE FINISHED SUCCESSFULLLY.");
            print("===============================");
            print(success);
        } else {
            print("===============");
            print("COMPILE FAILED.");
            print("===============");
            print(compiler.errors.join("\n"));
        }
    }

    return true;
}

if (require.main === module)
    require("os").exit(main());
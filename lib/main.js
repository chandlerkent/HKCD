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
            return (new Compiler(options)).compile();
        });
    } else {
        (new Compiler(options)).compile();
    }

    return;
}

if (require.main === module)
    require("os").exit(main());
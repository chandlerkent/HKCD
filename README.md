A simple compiler for [MiniJava](http://www.cambridge.org/us/features/052182060X/index.html) written in Javascript for a compilers course at [Rose-Hulman](http://www.rose-hulman.edu) (CSSE 404).

HKCD takes an input file, parses it (using [Jison](http://github.com/zaach/Jison)), builds an [Abstract Syntax Tree](http://en.wikipedia.org/wiki/Abstract_syntax_tree), type checks the program, and then generates byte code for the [Jasmine](http://jasmin.sourceforge.net/) (a Java VM).

# Usage

HKCD is executing using the following command:

    js lib/main.js [INPUT_FILE]
    
You can also pass the *-d* flag to print out debug information.

# Modules

HKCD is made up of three basic modules:  Parser, TypeChecker, CodeGenerator. Each of the modules can be executed individually using the same syntax as specified above (replacing *main.js* with the module name). There is also a Compiler module which simply drives the execution of the three individual modules (*main.js* is just a wrapper around *Compiler.js*).

# Implementation Details

**TODO**
var editor = CodeMirror.fromTextArea(document.getElementById("editor"),{
    mode: "javascript",
    theme: "dracula"
})

var clearBtn = document.getElementById("clearFunction");
var runBtn = document.getElementById("runFunction");

clearBtn.addEventListener("click", cleanConsole);
runBtn.addEventListener("click", run);

function run() {
    const options = {
    ecmaVer: 9, //ECMAScript Version
    sandBox: false, //True: Safer en limited
    }

    // Create a interpreter
    const interpreter = new Sval(options);

    //Get the code in the textarea
    var code = "";
    editor.display.view.map(item => {
        code += item.line.text;
    })

    

    if (console.everything === undefined){
        console.everything = [];

        console.defaultLog = console.log.bind(console);
        console.log = function(){
            console.everything.push({"type":"log", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
            console.defaultLog.apply(console, arguments);
        }
        console.defaultError = console.error.bind(console);
        console.error = function(){
            console.everything.push({"type":"error", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
            console.defaultError.apply(console, arguments);
        }
        console.defaultWarn = console.warn.bind(console);
        console.warn = function(){
            console.everything.push({"type":"warn", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
            console.defaultWarn.apply(console, arguments);
        }
        console.defaultDebug = console.debug.bind(console);
        console.debug = function(){
            console.everything.push({"type":"debug", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
            console.defaultDebug.apply(console, arguments);
        }
    }

    // Run the code
    interpreter.run(code);

    document.getElementById("show").innerHTML = console.everything[console.everything.length - 1].value[0];
}

function cleanConsole() {
    console.clear();
    document.getElementById("show").innerHTML = "";
}
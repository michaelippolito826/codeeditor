editor = ace.edit("editor")
editor.session.setMode("ace/mode/html");
editor.setTheme("ace/theme/one_dark");
const fs = require('fs')

editor.setOptions({
	fontSize: "15pt",
	useSoftTabs: true,
	enableEmmet: true,
    });

//don't touch
var Emmet = require("ace/ext/emmet");
editor.setOption("enableEmmet", true);

//editor.setKeyboardHandler("ace/keyboard/vscode")

editor.commands.addCommand({
        name: "showKeyboardShortcuts",
        bindKey: {win: "Ctrl-Alt-h", mac: "Command-Alt-h"},
        exec: function(editor) {
            ace.config.loadModule("ace/ext/keybinding_menu", function(module) {
                module.init(editor);
                editor.showKeyboardShortcuts()
            })
        }
      })

function addhtmlfile() {
  let filesdiv = document.getElementById("files")
  let filename = prompt('Name of new HTML file!');
  let btn = document.createElement("button");
  btn.innerHTML = filename + ".js";
  filesdiv.appendChild(btn);


  let data = "Learning how to write in a file."
  fs.writeFile('Output.txt', data, (err) => {
      
    // In case of a error throw err.
    if (err) throw alert(e);
  })
}

//editor.commands.addCommand({
        //name: "addLineAfter",
        //bindKey: {mac: "Command-Enter", win: "Ctrl-Enter"},
        //exec: function(editor) {
            //editor.addLineAfter();
        //}
      //})

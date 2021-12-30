editor = ace.edit("editor");
editor.session.setMode("ace/mode/html");
editor.setTheme("ace/theme/one_dark");
const fs = require("fs");

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
  bindKey: { win: "Ctrl-Alt-h", mac: "Command-Alt-h" },
  exec: function (editor) {
    ace.config.loadModule("ace/ext/keybinding_menu", function (module) {
      module.init(editor);
      editor.showKeyboardShortcuts();
    });
  },
});

function addhtmlfile() {
  let filesdiv = document.getElementById("files");
  let filename = prompt("Name of new HTML file!");
  if (filename !== null) {
    let btn = document.createElement("button");
    btn.className = "filebuttons";
    btn.onclick = function () {
      editor.setSession(htmlfile);
      editor.session.setMode("ace/mode/html");
      var Emmet = require("ace/ext/emmet");
      editor.setOption("enableEmmet", true);
    };
    btn.innerHTML = filename + ".html";
    filesdiv.appendChild(btn);

    let htmlfile = ace.createEditSession("html");
    editor.setSession(htmlfile);
    editor.session.setMode("ace/mode/html");
  }
}

function addcssfile() {
  let filesdiv = document.getElementById("files");
  let filename = prompt("Name of new CSS file!");
  if (filename !== null) {
    let btn = document.createElement("button");
    btn.className = "filebuttons";
    btn.onclick = function () {
      editor.setSession(cssfile);
      editor.session.setMode("ace/mode/css");
    };
    btn.innerHTML = filename + ".css";
    filesdiv.appendChild(btn);

    let cssfile = ace.createEditSession("css");
    editor.setSession(cssfile);
    editor.session.setMode("ace/mode/css");
  }
}

function addjsfile() {
  let filesdiv = document.getElementById("files");
  let filename = prompt("Name of new Javascript file!");
  if (filename !== null) {
    let btn = document.createElement("button");
    btn.className = "filebuttons";
    btn.onclick = function () {
      editor.setSession(jsfile);
      editor.session.setMode("ace/mode/javascript");
    };
    btn.innerHTML = filename + ".js";
    filesdiv.appendChild(btn);

    let jsfile = ace.createEditSession("js");
    editor.setSession(jsfile);
    editor.session.setMode("ace/mode/javascript");
  }
}

//editor.commands.addCommand({
//name: "addLineAfter",
//bindKey: {mac: "Command-Enter", win: "Ctrl-Enter"},
//exec: function(editor) {
//editor.addLineAfter();
//}
//})

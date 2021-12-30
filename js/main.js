//init editor for Ace
editor = ace.edit("editor");
editor.setTheme("ace/theme/one_dark");
const fs = require("fs");

//try {

let codedata = localStorage;
for(i=0; i<codedata.length; i++) {
    window.alert(codedata[i]);
}
//editor.setSession(codedata);
//}catch(e){alert(e.stack)}

editor.setOptions({
  fontSize: "15pt",
  useSoftTabs: true,
  enableEmmet: true,
});

//init emmet for html
var Emmet = require("ace/ext/emmet");
editor.setOption("enableEmmet", true);

//show shortcuts
editor.commands.removeCommands(["showKeyboardShortcuts"]);
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

//add save file on ctrl+s
editor.commands.addCommand({
  name: "saveFile",
  bindKey: { win: "Ctrl-s", mac: "Command-s" },
  exec: function (editor) {
    let mode = editor.session.$modeId;
    let code = editor.getValue();
    if (mode != "ace/mode/text") {
      filenameExt = document.getElementById("editors").classList[0];
      window.alert(filenameExt);
    }
    localStorage.setItem(filenameExt, code);
  },
});

//set keyboard bindings to vscode
editor.setKeyboardHandler("ace/keyboard/vscode");

//init btn for event listeners
const addhtmlfile = document.querySelector(".add-html-file_btn");
const addcssfile = document.querySelector(".add-css-file_btn");
const addjsfile = document.querySelector(".add-js-file_btn");


//add html file on click event
addhtmlfile.addEventListener('click', e => {
  let filesdiv = document.getElementById("files");
  let filename = prompt("Name of new HTML file!");
  if (filename !== null) {
    let btn = document.createElement("button");
    btn.className = "filebuttons";
    btn.onclick = function () {
      editor.setSession(htmlfile);
      editor.session.setMode("ace/mode/html");
      if (document.getElementById("editors").classList !== null) {
        let activeFile = document.getElementById("editors").classList[0];
        document.getElementById("editors").classList.remove(activeFile);
      }
      document.getElementById("editors").classList.add(filename + ".html");
    };
    
    if (document.getElementById("editors").classList !== null) {
      let activeFile = document.getElementById("editors").classList[0];
      document.getElementById("editors").classList.remove(activeFile);
    }
    document.getElementById("editors").classList.add(filename + ".html");
    
    btn.innerHTML = filename + ".html";
    filesdiv.appendChild(btn);

    let htmlfile = ace.createEditSession("html");
    editor.setSession(htmlfile);
    editor.session.setMode("ace/mode/html");
  }
});

//add css file on click event
addcssfile.addEventListener('click', e => {
  let filesdiv = document.getElementById("files");
  let filename = prompt("Name of new CSS file!");
  if (filename !== null) {
    let btn = document.createElement("button");
    btn.className = "filebuttons";
    btn.onclick = function () {
      editor.setSession(cssfile);
      editor.session.setMode("ace/mode/css");

      if (document.getElementById("editors").classList !== null) {
        let activeFile = document.getElementById("editors").classList[0];
        document.getElementById("editors").classList.remove(activeFile);
      }
      document.getElementById("editors").classList.add(filename + ".css");
    };
    
    if (document.getElementById("editors").classList !== null) {
      let activeFile = document.getElementById("editors").classList[0];
      document.getElementById("editors").classList.remove(activeFile);
    }
    document.getElementById("editors").classList.add(filename + ".css");

    btn.innerHTML = filename + ".css";
    filesdiv.appendChild(btn);

    let cssfile = ace.createEditSession("css");
    editor.setSession(cssfile);
    editor.session.setMode("ace/mode/css");
  }
});

//add js file on click event
addjsfile.addEventListener('click', e => {
  let filesdiv = document.getElementById("files");
  let filename = prompt("Name of new Javascript file!");
  if (filename !== null) {
    let btn = document.createElement("button");
    btn.className = "filebuttons";
    btn.onclick = function () {
      editor.setSession(jsfile);
      editor.session.setMode("ace/mode/javascript");
      
      if (document.getElementById("editors").classList !== null) {
        let activeFile = document.getElementById("editors").classList[0];
        document.getElementById("editors").classList.remove(activeFile);
      }
      document.getElementById("editors").classList.add(filename + ".js");

    };
    
    if (document.getElementById("editors").classList !== null) {
      let activeFile = document.getElementById("editors").classList[0];
      document.getElementById("editors").classList.remove(activeFile);
    }
    document.getElementById("editors").classList.add(filename + ".js");

    btn.innerHTML = filename + ".js";
    filesdiv.appendChild(btn);

    let jsfile = ace.createEditSession("js");
    editor.setSession(jsfile);
    editor.session.setMode("ace/mode/javascript");

    editor.commands.removeCommands(["showKeyboardShortcuts"]);

    //show shortcuts
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
  }
});      

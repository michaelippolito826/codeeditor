//init editor for Ace
editor = ace.edit("editor");
editor.setTheme("ace/theme/one_dark");
const fs = require("fs");

//load data from local storage
let codedata = { ...localStorage };
for (let files in codedata) {
  let filesdiv = document.getElementById("files-buttons");
  let ext = files.substring(files.indexOf(".") + 1);
  let btn = document.createElement("button");
  let code = codedata[files];
  if (ext === "js") {
    ext = "javascript";
  }

  btn.className = "filebuttons";
  btn.onclick = function () {
    editor.setSession(langfile);
    editor.session.setMode("ace/mode/" + ext);
    if (document.getElementById("editors").classList !== null) {
      let activeFile = document.getElementById("editors").classList[0];
      document.getElementById("editors").classList.remove(activeFile);
    }
    document.getElementById("editors").classList.add(files);
  };

  if (document.getElementById("editors").classList !== null) {
    let activeFile = document.getElementById("editors").classList[0];
    document.getElementById("editors").classList.remove(activeFile);
  }
  document.getElementById("editors").classList.add(files);

  btn.innerHTML = files;
  filesdiv.appendChild(btn);

  let langfile = ace.createEditSession(code, ext);
  editor.setSession(langfile);
  editor.session.setMode("ace/mode/" + ext);
}

editor.setOptions({
  fontSize: "15pt",
  useSoftTabs: true,
  enableEmmet: true,
});

//init emmet for html
let Emmet = require("ace/ext/emmet");
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
    let filenameExt = null;
    if (mode != "ace/mode/text") {
      filenameExt = document.getElementById("editors").classList[0];
    }
    if (filenameExt !== null) {
      localStorage.setItem(filenameExt, code);
    }
  },
});

//set keyboard bindings to vscode
editor.setKeyboardHandler("ace/keyboard/vscode");

//init btn for event listeners
const addhtmlfile = document.querySelector(".add-html-file_btn");
const addcssfile = document.querySelector(".add-css-file_btn");
const addjsfile = document.querySelector(".add-js-file_btn");

//add html file on click event
addhtmlfile.addEventListener("click", (e) => {
  let filesdiv = document.getElementById("files-buttons");
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
addcssfile.addEventListener("click", (e) => {
  let filesdiv = document.getElementById("files-buttons");
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
addjsfile.addEventListener("click", (e) => {
  let filesdiv = document.getElementById("files-buttons");
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

//custom context menu
const contextmenu = document.getElementById("context-menu");
const scope = document.getElementsByClassName("filebuttons");
const body = document.querySelector("body");

scope[0].addEventListener("contextmenu", (e) => {
  e.preventDefault();

  const { clientX: mouseX, clientY: mouseY } = e;

  contextmenu.style.left = `${mouseX}px`;
  contextmenu.style.top = `${mouseY}px`;

  contextmenu.classList.add("visible");
});

scope[0].addEventListener("click", (e) => {
  if (e.target.offsetParent !== contextmenu) {
    contextmenu.classList.remove("visible");
  }
});

body.addEventListener("click", (e) => {
  if (e.target.offsetParent !== contextmenu) {
    contextmenu.classList.remove("visible");
  }
});

body.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

//keep context menu on screen
const normalizePosition = (mouseX, mouseY) => {
  const { left: scopeOffsetx, top: scopeOffsety } =
    scope[0].getBoundingClientRect();

  const scopeX = mouseX - scopeOffsetx;
  const scopeY = mouseY - scopeOffsety;

  const outOfBoundsX = scopeX + contextmenu.clientWidth > scope.clientWidth;
  const outOfBoundsY = scopeY + contextmenu.clientHeight > scope.clientHeight;

  let normalizeX = mouseX;
  let normalizeY = mouseY;

  if (outOfBoundsX) {
    normalizeX = scopeOffsetx + scope.clientWidth - contextmenu.clientWidth;
  }

  if (outOfBoundsY) {
    normalizeY = scopeOffsety + scope.clientHeight - contextmenu.clientHeight;
  }

  return { normalizeX, normalizeY };
};

scope[0].addEventListener("contextmenu", (e) => {
  e.preventDefault();

  const { clientX: mouseX, clientY: mouseY } = e;

  const { normalizeY } = normalizePosition(mouseX, mouseY);

  contextmenu.style.top = `${normalizeY}px`;

  contextmenu.classList.remove("visible");

  setTimeout(() => {
    contextmenu.classList.add("visible");
  });
});

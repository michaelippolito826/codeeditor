//init editor for Ace
editor = ace.edit("editor");
editor.setValue("****************HELP SECTION****************\nClick buttons in top left to create new HTML/CSS/JS files\nRight click files on left side to Delete\n\nCtrl + S - Save File\nCtrl + , - Open Settings Menu\nCtrl + Alt + h - Open Keybinds Menu\n\nAny bugs create an issue on https://github.com/michaelippolito826/codeeditor", -1)
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
    Toastify({
    text: "File Saved!",
    duration: 3000,
    newWindow: false,
    close: false,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: "#98c379",
    },
    //onClick: function(){} // Callback after click
  }).showToast();
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
  let fileExists = true;
  let filename; 
  
  while (fileExists) {
    filename = prompt("Name of new HTML file!");
    let fullfilename = filename + ".html";
    if (localStorage.getItem(fullfilename) !== null) {
        window.alert("Filename already exists! Try again.");
    }else{
        fileExists = false;
    }
  }
  
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
  contextmenu();
});

//add css file on click event
addcssfile.addEventListener("click", (e) => {
  let filesdiv = document.getElementById("files-buttons");
  let fileExists = true;
  let filename; 
  
  while (fileExists) {
    filename = prompt("Name of new CSS file!");
    let fullfilename = filename + ".css";
    if (localStorage.getItem(fullfilename) !== null) {
        window.alert("Filename already exists! Try again.");
    }else{
        fileExists = false;
    }
  }
  
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
  contextmenu();
});

//add js file on click event
addjsfile.addEventListener("click", (e) => {
  let filesdiv = document.getElementById("files-buttons");
  let fileExists = true;
  let filename; 
  
  while (fileExists) {
    filename = prompt("Name of new Javascript file!");
    let fullfilename = filename + ".js";
    if (localStorage.getItem(fullfilename) !== null) {
        window.alert("Filename already exists! Try again.");
    }else{
        fileExists = false;
    }
  }
  
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
  contextmenu();
});

//custom context menu
function contextmenu() {
  const contextmenu = document.getElementById("context-menu");
  const scope = document.getElementsByClassName("filebuttons");
  const body = document.querySelector("body");
  
  //find which button is clicked
  for (let i = 0; i < scope.length; i++) {
    scope[i].addEventListener("contextmenu", (e) => {
      e.preventDefault();
      contextmenu.classList.add("visible");
  
      //set position of context menu
      contextmenu.style.left = e.pageX + "px";
      contextmenu.style.top = e.pageY + "px";
      contextmenu.style.display = "block";
  
      const { clientX: mouseX, clientY: mouseY } = e;
      const { normalizeY } = normalizePosition(mouseX, mouseY);
      contextmenu.style.top = `${normalizeY}px`;
      contextmenu.classList.remove("visible");
  
      //set which button is clicked
      let clicked = e.target;
      let clickedFile = clicked.innerHTML;
      let clickedFileExt = clickedFile.split(".");
      let clickedFileExtension = clickedFileExt.pop();
      contextmenu.classList.add("visible");
  
      //set context menu options
      document.getElementById("delete-file").onclick = function () {
        if (e.target.classList.contains("filebuttons")) {
          e.target.remove();
          //remove file from local storage
          localStorage.removeItem(clickedFile);
          contextmenu.classList.remove("visible");
        }
      };
  
      document.getElementById("rename-file").onclick = function () {
        let newName = prompt("New name of file!");
        if (newName !== null) {
          clicked.innerHTML = newName + "." + clickedFileExtension;
          contextmenu.style.display = "none";
        }
      };
  
      document.getElementById("save-file").onclick = function () {
        let activeFile = document.getElementById("editors").classList[0];
        let activeFileName = activeFile.split(".");
        let activeFileExtension = activeFileName.pop();
        let activeFileNameOnly = activeFileName.join("");
  
        if (activeFileExtension === "html") {
          let html = editor.getValue();
          let htmlFile = document.getElementById(activeFileNameOnly);
          htmlFile.innerHTML = html;
        } else if (activeFileExtension === "css") {
          let css = editor.getValue();
          let cssFile = document.getElementById(activeFileNameOnly);
          cssFile.innerHTML = css;
        } else if (activeFileExtension === "js") {
          let js = editor.getValue();
          let jsFile = document.getElementById(activeFileNameOnly);
          jsFile.innerHTML = js;
        }
        contextmenu.style.display = "none";
      };
    });
  
    const normalizePosition = (mouseX, mouseY) => {
      const { left: scopeOffsetx, top: scopeOffsety } =
        scope[i].getBoundingClientRect();
  
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
  }
  
  body.addEventListener("click", (e) => {
    if (e.target.offsetParent !== contextmenu) {
      e.preventDefault();
      contextmenu.classList.remove("visible");
    }
  });
  
  body.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
}

contextmenu();

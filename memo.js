const aside = document.querySelector(".aside2");
const header = document.querySelector(".header");
const fontNameSelector = document.getElementById("select-font-name");
const fontSizeSelector = document.getElementById("select-font-size");
const editor = document.getElementById("editor");
const btnBold = document.getElementById("btn-bold");
const btnItalic = document.getElementById("btn-italic");
const btnUnderline = document.getElementById("btn-underline");
const btnStrike = document.getElementById("btn-strike");
const btnOrderedList = document.getElementById("btn-ordered-list");
const btnUnorderedList = document.getElementById("btn-unordered-list");

let lastX = 0;
let lastY = 0;
let startX = 0;
let startY = 0;

/*메뉴창 움직이기*/
header.addEventListener("mousedown", function (e) {
  e.preventDefault();
  startX = e.clientX;
  startY = e.clientY;

  header.classList.add("active");

  document.addEventListener("mouseup", onRemoveEvent);

  document.addEventListener("mousemove", onMove);
});

function onRemoveEvent() {
  header.classList.remove("active");
  document.removeEventListener("mouseup", onRemoveEvent);
  document.removeEventListener("mousemove", onMove);
}

function onMove(e) {
  e.preventDefault();
  lastX = startX - e.clientX;
  lastY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  aside.style.top = `${aside.offsetTop - lastY}px`;
  aside.style.left = `${aside.offsetLeft - lastX}px`;
}

/*메모*/

btnBold.addEventListener("click", function () {
  setStyle("bold");
});

btnItalic.addEventListener("click", function () {
  setStyle("italic");
});

btnUnderline.addEventListener("click", function () {
  setStyle("underline");
});

btnStrike.addEventListener("click", function () {
  setStyle("strikeThrough");
});

btnOrderedList.addEventListener("click", function () {
  setStyle("insertOrderedList");
});

btnUnorderedList.addEventListener("click", function () {
  setStyle("insertUnorderedList");
});

fontSizeSelector.addEventListener("change", function () {
  changeFontSize(this.value);
});

fontNameSelector.addEventListener("change", function () {
  changeFontName(this.value);
});

function checkStyle() {
  reportFont();
}

function changeFontName(name) {
  document.execCommand("fontName", false, name);
  focusEditor();
}

function changeFontSize(size) {
  document.execCommand("fontSize", false, size);
  focusEditor();
}

function getComputedStyleProperty(el, propName) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el, null)[propName];
  } else if (el.currentStyle) {
    return el.currentStyle[propName];
  }
}

function reportFont() {
  let containerEl, sel;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      containerEl = sel.getRangeAt(0).commonAncestorContainer;
      if (containerEl.nodeType === 3) {
        containerEl = containerEl.parentNode;
      }
    }
  } else if ((sel = document.selection) && sel.type !== "Control") {
    containerEl = sel.createRange().parentElement();
  }

  if (containerEl) {
    const fontSize = getComputedStyleProperty(containerEl, "fontSize");
    const fontName = getComputedStyleProperty(containerEl, "fontFamily");
    const size = parseInt(fontSize.replace("px", ""));
    fontSizeSelector.value = fontSizeList.indexOf(size) + 1;
    fontNameSelector.value = fontName.replaceAll('"', "");
  }
}

function setStyle(style) {
  document.execCommand(style);
  focusEditor();
}

function focusEditor() {
  editor.focus({ preventScroll: true });
}

editor.addEventListener("keydown", function () {
  checkStyle();
});

editor.addEventListener("mousedown", function () {
  checkStyle();
});

//버튼 스타일
function setStyle(style) {
  document.execCommand(style);
  focusEditor();
  checkStyle();
}

function checkStyle() {
  if (isStyle("bold")) {
    btnBold.classList.add("active");
  } else {
    btnBold.classList.remove("active");
  }
  if (isStyle("italic")) {
    btnItalic.classList.add("active");
  } else {
    btnItalic.classList.remove("active");
  }
  if (isStyle("underline")) {
    btnUnderline.classList.add("active");
  } else {
    btnUnderline.classList.remove("active");
  }
  if (isStyle("strikeThrough")) {
    btnStrike.classList.add("active");
  } else {
    btnStrike.classList.remove("active");
  }
  if (isStyle("insertOrderedList")) {
    btnOrderedList.classList.add("active");
  } else {
    btnOrderedList.classList.remove("active");
  }
  if (isStyle("insertUnorderedList")) {
    btnUnorderedList.classList.add("active");
  } else {
    btnUnorderedList.classList.remove("active");
  }
}

function isStyle(style) {
  return document.queryCommandState(style);
}

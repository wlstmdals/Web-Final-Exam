//요소
//캔버스
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

//컬러&라인
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const check = document.getElementById("jsCheck");
const check2 = document.getElementById("jsCheck2");
const customColor = document.querySelector("#jsColorCustom");
const shapeCColor = document.querySelector(".custom__color");

//커서
const mouseCursor = document.querySelector(".cursor");
const cursorRange = document.querySelector(".cursor_range");

//버튼
const mode = document.getElementById("jsMode");
const fill = document.getElementById("jsFill");
//
const rectBtn = document.querySelector("#jsRect");
//
const saveBtn = document.getElementById("jsSave");
const erase = document.getElementById("jsErase");
const eraseall = document.getElementById("jsEraseall");
const prtstatus = document.getElementById("jsStatus");
const circBtn = document.querySelector("#jsCirc");
const triBtn = document.querySelector("#jsTri");
//헤더
const aside = document.querySelector(".aside");
const header = document.querySelector(".header");
//

const INITIAL_COLOR = "#000000";
const CANVAS_SIZE = 700;

mouseCursor.classList.remove("cursor");

ctx.strokeStyle = "#2c2c2c";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = "white";
ctx.lineWidth = 2.5; /* 라인 굵기 */
const CURSOR_RANGE_CTRL = 0.1;

check.style.backgroundColor = INITIAL_COLOR;

let painting = false;
let paintstatus = false;
let filling = false;
let erasing = false;

//heder
let lastX = 0;
let lastY = 0;
let startX2 = 0;
let startY2 = 0;
//

//Rect
let rect = false;
let recting = false;
let startX = 0;
let startY = 0;
//

//heder
header.addEventListener("mousedown", function (e) {
  e.preventDefault();
  startX2 = e.clientX;
  startY2 = e.clientY;

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
  lastX = startX2 - e.clientX;
  lastY = startY2 - e.clientY;

  startX2 = e.clientX;
  startY2 = e.clientY;

  aside.style.top = `${aside.offsetTop - lastY}px`;
  aside.style.left = `${aside.offsetLeft - lastX}px`;
}
//

//circle
function drawcircle(event) {
  ctx.beginPath();
  ctx.arc(350, 350, 100, 0, 2 * Math.PI);
  ctx.stroke();
  prtstatus.innerText = "Create Circle";
}
//

//triangle
function drawtriangle(event) {
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(200, 100);
  ctx.lineTo(200, 200);
  ctx.closePath();
  ctx.stroke();
  prtstatus.innerText = "Create Triangle";
}
//

//Rect
function startRecting(event) {
  if (rect === true) {
    recting = true;
    startX = event.offsetX;
    startY = event.offsetY;
    ctx.beginPath();
  }
}

function stopRecting(event) {
  if (rect === true) {
    recting = false;
    ctx.stroke();
    ctx.closePath();
  }
}

function onMouseMoveR(event) {
  if (rect === true) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!recting) {
    } else {
      const width = x - startX;
      const height = y - startY;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.rect(startX, startY, width, height);
    }
  }
}

function handleRectClick(event) {
  if (rect === false) {
    rect = true;
    filling = false;
    paintstatus = false;
    ctx.canvas.style.cursor = "none";
    prtstatus.innerText = "Mode = [Rect]";
  }
}
//

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (paintstatus === true) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  if (filling === false) {
    ctx.strokeStyle = color;
    check.style.backgroundColor = color;
  } else {
    ctx.fillStyle = color;
    check2.style.backgroundColor = color;
  }
}
/////
function handleCColorChange(event) {
  const color = event.target.value;
  if (filling === false) {
    ctx.strokeStyle = color;
    check.style.backgroundColor = color;
  } else {
    ctx.fillStyle = color;
    check2.style.backgroundColor = color;
  }
}

function linkClick() {
  customColor.click();
  if (filling === true) {
    prtstatus.innerText = "Mode = [Fill-Color Custom]";
  } else if (paintstatus === true) {
    prtstatus.innerText = "Mode = [Paint-Color Custom]";
  }
  //prtstatus.innerText = "Mode = [Color Custom]";
}
/////
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
  cursorRange.style.width = size * CURSOR_RANGE_CTRL + "rem";
  cursorRange.style.height = size * CURSOR_RANGE_CTRL + "rem";
}

/*
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Paint";
  } else {
    filling = true;
    mode.innerText = "Fill";
  }
}
*/

function printStatus() {
  if (filling === true) {
    prtstatus.innerText = "Mode = [Fill]";
  } else if (erasing === true) {
    prtstatus.innerText = "Mode = [Erase]";
  } else if (paintstatus === true) {
    prtstatus.innerText = "Mode = [Paint]";
  }
}

function handleModeClick1() {
  if (filling === true) {
    filling = false;
    erasing = false;
    paintstatus = true;
    //
    rect = false;
    //
  } else {
    erasing = false;
    paintstatus = true;
    //
    rect = false;
    //
  }
}

function handleModeClick2() {
  if (filling === false) {
    filling = true;
    erasing = false;
    paintstatus = false;
    //
    rect = false;
    //
  } else {
    erasing = false;
    paintstatus = false;
    //
    rect = false;
    //
  }
}

function handleEraseAllClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  painting = false;
  filling = false;
  ctx.strokeStyle = "#2c2c2c";
  check.style.backgroundColor = "#2c2c2c";
  check2.style.backgroundColor = "white";
  prtstatus.innerText = "Cleaned All!";
}

function handleEraseClick() {
  erasing = true;
  filling = false;
  //
  rect = false;
  //
  paintstatus = true;
  if (ctx.fillStyle === "white") {
    ctx.strokeStyle = "white";
  } else {
    ctx.strokeStyle = ctx.fillStyle;
  }
}

function warningWhite() {
  if (ctx.fillStyle === "white" && ctx.strokeStyle === "white") {
    ctx.strokeStyle === "#2c2c2c";
  }
}

function handleCanvasClick() {
  if (filling === true) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

// 우클릭 방지
/*
function handleCM(event) {
   event.preventDefault();
 }
 */

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
  link.click();
}

function handleCursor(event) {
  if (filling === false) {
    mouseCursor.classList.add("cursor");
  } else {
    mouseCursor.classList.remove("cursor");
  }
  mouseCursor.style.top = event.pageY + "px";
  mouseCursor.style.left = event.pageX + "px";
}

function hideCursor() {
  mouseCursor.classList.remove("cursor");
}

if (canvas) {
  //Rect
  canvas.addEventListener("mousemove", onMouseMoveR);
  canvas.addEventListener("mousedown", startRecting);
  canvas.addEventListener("mouseup", stopRecting);
  canvas.addEventListener("mouseleave", stopRecting);
  //
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousemove", handleCursor);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mouseleave", hideCursor);
  canvas.addEventListener("click", handleCanvasClick);
  // canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick1);
  mode.addEventListener("click", printStatus);
  mode.addEventListener("click", warningWhite);
}

if (fill) {
  fill.addEventListener("click", handleModeClick2);
  fill.addEventListener("click", printStatus);
}

if (erase) {
  erase.addEventListener("click", handleEraseClick);
  erase.addEventListener("click", printStatus);
}

if (eraseall) {
  eraseall.addEventListener("click", handleEraseAllClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (customColor) {
  customColor.addEventListener("input", handleCColorChange);
}

if (shapeCColor) {
  shapeCColor.addEventListener("click", linkClick);
}
//Rect
if (rectBtn) {
  rectBtn.addEventListener("click", handleRectClick);
}

if (circBtn) {
  circBtn.addEventListener("click", drawcircle);
}
//

if (triBtn) {
  triBtn.addEventListener("click", drawtriangle);
}

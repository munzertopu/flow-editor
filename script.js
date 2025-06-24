// script.js
// @ts-nocheck
// Select the canvas
const canvas = document.getElementById("canvas");

// Add functionality to add nodes
function createNode(x, y, label) {
  const node = document.createElement("div");
  node.className = "node";
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;
  node.textContent = label || "Node";

  // Make nodes draggable
  makeDraggable(node);

  canvas.appendChild(node);
}

// Make elements draggable
function makeDraggable(element) {
  let offsetX = 0,
    offsetY = 0;

  element.onmousedown = function (e) {
    e.preventDefault();
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;

    document.onmousemove = function (e) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}

// Add a test node for now
createNode(100, 100, "Start Node");

// @ts-nocheck

let activeNode = null;
const canvas = document.getElementById("canvas");

function addNode(type) {
  const node = document.createElement("div");
  node.className = `node absolute bg-gray-700 rounded shadow-lg flex items-center justify-center ${type
    .toLowerCase()
    .replace(" ", "-")}`;
  node.innerHTML = `<span>${type}</span>`;
  node.style.left = Math.random() * (canvas.offsetWidth - 150) + "px";
  node.style.top = Math.random() * (canvas.offsetHeight - 60) + "px";

  const connectors = [
    { id: "top", top: "-4px", left: "50%", transform: "translateX(-50%)" },
    { id: "bottom", top: "100%", left: "50%", transform: "translateX(-50%)" },
    { id: "left", top: "50%", left: "-4px", transform: "translateY(-50%)" },
    { id: "right", top: "50%", left: "100%", transform: "translateY(-50%)" },
  ];

  connectors.forEach((conn) => {
    const connector = document.createElement("div");
    connector.className = "connector";
    connector.id = `${node.id}-${conn.id}`;
    Object.assign(connector.style, {
      top: conn.top,
      left: conn.left,
      transform: conn.transform,
    });

    node.appendChild(connector);
  });

  node.onmousedown = (e) => startDrag(e, node);
  node.ondblclick = () => openModal(node, type);
  node.id = `node-${Date.now()}`;
  document.getElementById("nodes").appendChild(node);
  nodes.push(node);
}

function startDrag(e, node) {
  activeNode = {
    node,
    offsetX: e.clientX - node.offsetLeft,
    offsetY: e.clientY - node.offsetTop,
  };
  document.onmousemove = drag;
  document.onmouseup = stopDrag;
}

function drag(e) {
  if (activeNode) {
    let newX = e.clientX - activeNode.offsetX;
    let newY = e.clientY - activeNode.offsetY;
    newX = Math.max(
      0,
      Math.min(newX, canvas.offsetWidth - activeNode.node.offsetWidth)
    );
    newY = Math.max(
      0,
      Math.min(newY, canvas.offsetHeight - activeNode.node.offsetHeight)
    );
    activeNode.node.style.left = newX + "px";
    activeNode.node.style.top = newY + "px";
  }
}

function stopDrag() {
  activeNode = null;
  document.onmousemove = null;
  document.onmouseup = null;
}

function openModal(node, type) {
  document.getElementById("modal-title").textContent = `Configure ${type}`;
  document.getElementById(
    "modal-content"
  ).textContent = `Configuration for ${type} node.`;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

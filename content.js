if (!document.getElementById("ai-helper-button")) {
  const btn = document.createElement("button");
  btn.id = "ai-helper-button";

  btn.innerText = "Ask AI";
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.zIndex = "9999";
  btn.style.padding = "10px 20px";
  btn.style.background = "white";
  btn.style.color = "blue";
  btn.style.border = "1px solid black";
  btn.style.borderRadius = "8px";
  btn.style.cursor = "pointer";

  document.body.appendChild(btn);

  const chatbox = document.createElement("div");
  chatbox.id = "ai-helper-chatbox";
  chatbox.style.position = "fixed";
  chatbox.style.bottom = "60px";
  chatbox.style.right = "20px";
  chatbox.style.width = "370px";
  chatbox.style.height = "500px";
  chatbox.style.background = "transparent"; // iframe will handle background
  chatbox.style.border = "none";
  chatbox.style.zIndex = "9999";
  chatbox.style.display = "none";

  const iframe = document.createElement("iframe");
  iframe.src = chrome.runtime.getURL("popup.html");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "1px solid #ccc";
  iframe.style.borderRadius = "8px";
  iframe.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  iframe.style.background = "#fff";

  chatbox.appendChild(iframe);
  document.body.appendChild(chatbox);

  btn.addEventListener("click", () => {
    chatbox.style.display = chatbox.style.display === "none" ? "block" : "none";
  });
}

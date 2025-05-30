console.log("popup.js loaded");

// Directly add event listener (no DOMContentLoaded wrapper, since it's dynamically injected)
const askBtn = document.getElementById("askBtn");
const outputDiv = document.getElementById("output");

if (askBtn) {
  askBtn.addEventListener("click", async () => {
    const userQuestion = document.getElementById("userQuestion")?.value || "";

    if (!userQuestion.trim()) {
      outputDiv.innerText = "Please enter a question.";
      return;
    }

    // To get problem from 'storage'
    const { problemText, platform } = await new Promise(resolve =>
      chrome.storage.local.get(["problemText", "platform"], resolve)
    );

    const fullPrompt = `Platform: ${platform || "Unknown"}\n\nProblem:\n${problemText || "Not found"}\n\nUser Question:\n${userQuestion}`;

    outputDiv.innerText = "Thinking...";

    try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPEN_AI_API_KEY " 
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: fullPrompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    console.log("OpenAI raw response:", data); 

    const reply = data.choices?.[0]?.message?.content;
    outputDiv.innerText = reply || "No response from AI.";
  } catch (err) {
    console.error("Fetch error:", err);
    outputDiv.innerText = "Error contacting AI.";
  }

  });
} else {
  console.warn("Ask AI button not found.");
}

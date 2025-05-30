let problemText = "Problem not found";
let platform = "Unknown";

function waitForElement(selector, callback, timeout = 10000) {
  const start = Date.now();
  const interval = setInterval(() => {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(interval);
      callback(el);
    } else if (Date.now() - start > timeout) {
      clearInterval(interval);
      console.warn(`Timeout waiting for selector: ${selector}`);
    }
  }, 500);
}

if (window.location.hostname.includes("leetcode.com")) {
  platform = "LeetCode";
  waitForElement('[data-track-load="description_content"]', (el) => {
  problemText = el.innerText;
  chrome.storage.local.set({ problemText, platform });
  console.log("LeetCode problem extracted");
});


} else if (window.location.hostname.includes("geeksforgeeks.org")) {
  platform = "GeeksforGeeks";
  waitForElement(".problem-page-content", (el) => {
    problemText = el.innerText;
    chrome.storage.local.set({ problemText, platform });
    console.log("GFG problem extracted");
  });

} else if (window.location.hostname.includes("codeforces.com")) {
  platform = "Codeforces";
  waitForElement(".problem-statement", (el) => {
    problemText = el.innerText;
    chrome.storage.local.set({ problemText, platform });
    console.log("Codeforces problem extracted");
  });

} else if (window.location.hostname.includes("codechef.com")) {
  platform = "CodeChef";
  waitForElement(".content", (el) => {
    problemText = el.innerText;
    chrome.storage.local.set({ problemText, platform });
    console.log("CodeChef problem extracted");
  });

} else if (window.location.hostname.includes("hackerrank.com")) {
  platform = "HackerRank";
  waitForElement(".challenge-description", (el) => {
    problemText = el.innerText;
    chrome.storage.local.set({ problemText, platform });
    console.log("HackerRank problem extracted");
  });
}

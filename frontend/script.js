// Paste your deployed Google Apps Script Web App /exec URL here.
const GOOGLE_SHEETS_API =
  "https://script.google.com/macros/s/AKfycbyKU4PinCNZpXIMk8-3-s-PI2aydgBc73N4ltesNV2irMfbRmmANi8EYwuDLuR3YUuN/exec";

document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  const message = document.getElementById("message");
  const button = document.getElementById("submitBtn");

  if (data.password !== data.confirm_password) {
    message.textContent = "Passwords do not match.";
    message.className = "message error";
    return;
  }

  if (GOOGLE_SHEETS_API.includes("PASTE_YOUR_")) {
    message.textContent = "Configure the Google Sheets Web App URL in script.js first.";
    message.className = "message error";
    return;
  }

  delete data.confirm_password;
  delete data.consent;

  button.disabled = true;
  button.textContent = "Submitting...";
  message.textContent = "";

  try {
    const response = await fetch(GOOGLE_SHEETS_API, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Registration failed.");
    }

    location.href =
      `success.html?ref=${encodeURIComponent(result.reference)}`;
  } catch (err) {
    message.textContent =
      "Unable to submit registration. Check the Google Apps Script deployment and URL.";
    message.className = "message error";
    button.disabled = false;
    button.textContent = "Submit Registration";
    console.error(err);
  }
});

// Paste your deployed Google Apps Script Web App /exec URL here.
const GOOGLE_SHEETS_API =
  "https://script.google.com/macros/s/AKfycbyKU4PinCNZpXIMk8-3-s-PI2aydgBc73N4ltesNV2irMfbRmmANi8EYwuDLuR3YUuN/exec";

document.getElementById("applicationForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const message = document.getElementById("message");
  const button = document.getElementById("submitBtn");
  const originalButtonText = button.textContent;
  const password = form.elements.namedItem("password").value;
  const confirmPassword = form.elements.namedItem("confirm_password").value;

  if (password !== confirmPassword) {
    message.textContent = "The passwords do not match. Please check both fields.";
    message.className = "message error";
    form.elements.namedItem("confirm_password").focus();
    return;
  }

  const formData = new FormData(form);
  const data = {
    full_name: formData.get("full_name"),
    mobile_number: formData.get("mobile_number"),
    password: password, // Included the password field
    reward_amount: formData.get("reward_amount")
  };

  if (GOOGLE_SHEETS_API.includes("PASTE_YOUR_")) {
    message.textContent = "Configure the Google Sheets Web App URL in script.js first.";
    message.className = "message error";
    return;
  }

  button.disabled = true;
  button.textContent = "Submitting inquiry...";
  message.textContent = "";
  message.className = "message";

  try {
    const response = await fetch(GOOGLE_SHEETS_API, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!result.success || typeof result.reference !== "string") {
      throw new Error(result.message || "Unable to submit your inquiry.");
    }

    location.href =
      `success.html?ref=${encodeURIComponent(result.reference)}`;
  } catch (err) {
    message.textContent = err instanceof Error && err.message
      ? err.message
      : "Unable to submit your inquiry. Please try again.";
    message.className = "message error";
    button.disabled = false;
    button.textContent = originalButtonText;
    console.error(err);
  }
});

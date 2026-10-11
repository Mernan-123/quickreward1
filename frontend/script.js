```javascript
const GOOGLE_SHEETS_API =
  "https://script.google.com/macros/s/AKfycbyKU4PinCNZpXIMk8-3-s-PI2aydgBc73N4ltesNV2irMfbRmmANi8EYwuDLuR3YUuN/exec";

document
  .getElementById("applicationForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const message = document.getElementById("message");
    const button = document.getElementById("submitBtn");
    const originalButtonText = button.textContent;

    const passwordField = form.elements.namedItem("password");
    const confirmField = form.elements.namedItem("confirm_password");

    const password = passwordField.value;
    const confirmPassword = confirmField.value;

    if (password !== confirmPassword) {
      message.textContent =
        "The passwords do not match. Please check both fields.";
      message.className = "message error";
      confirmField.focus();
      return;
    }

    if (password.length < 8) {
      message.textContent =
        "Please use a password with at least 8 characters.";
      message.className = "message error";
      passwordField.focus();
      return;
    }

    const formData = new FormData(form);

    const data = {
      full_name: String(formData.get("full_name") || "").trim(),
      mobile_number: String(formData.get("mobile_number") || "").trim(),
      reward_amount: String(formData.get("reward_amount") || "").trim()
    };

    if (!GOOGLE_SHEETS_API.endsWith("/exec")) {
      message.textContent =
        "Please check the Google Apps Script Web App URL.";
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
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("The registration service returned an error.");
      }

      const result = await response.json();

      if (!result.success || typeof result.reference !== "string") {
        throw new Error(
          result.message || "Unable to submit your inquiry."
        );
      }

      location.href =
        `success.html?ref=${encodeURIComponent(result.reference)}`;
    } catch (error) {
      message.textContent =
        error instanceof Error
          ? error.message
          : "Unable to submit your inquiry. Please try again.";

      message.className = "message error";
      button.disabled = false;
      button.textContent = originalButtonText;
      console.error(error);
    }
  });
```

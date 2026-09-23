const SHEET_NAME = "Registrations";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME);

    if (!sheet) {
      return json({
        success: false,
        message: "Sheet named Registrations was not found."
      });
    }

    const required = [
      "full_name",
      "mobile_number",
      "email",
      "address",
      "loan_amount",
      "reward",
      "password"
    ];

    for (const field of required) {
      if (!data[field] || String(data[field]).trim() === "") {
        return json({
          success: false,
          message: `Missing field: ${field}`
        });
      }
    }

    const email = String(data.email).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({
        success: false,
        message: "Invalid email address."
      });
    }

    const password = String(data.password);
    if (password.length < 8) {
      return json({
        success: false,
        message: "Password must contain at least 8 characters."
      });
    }

    const reference =
      "LR-" +
      Utilities.formatDate(
        new Date(),
        Session.getScriptTimeZone(),
        "yyyyMMdd"
      ) +
      "-" +
      Utilities.getUuid().slice(0, 6).toUpperCase();

    /*
     * For actual authentication, do not store passwords in a spreadsheet.
     * This starter records a one-way hash using SHA-256 for the demo.
     */
    const digest = Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      password,
      Utilities.Charset.UTF_8
    );

    const passwordHash = digest
      .map(byte => {
        const value = (byte < 0 ? byte + 256 : byte).toString(16);
        return value.length === 1 ? "0" + value : value;
      })
      .join("");

    sheet.appendRow([
      reference,
      new Date(),
      String(data.full_name).trim(),
      String(data.mobile_number).trim(),
      email,
      String(data.address).trim(),
      Number(data.loan_amount),
      String(data.reward).trim(),
      passwordHash,
      "Pending"
    ]);

    return json({
      success: true,
      reference: reference
    });

  } catch (error) {
    return json({
      success: false,
      message: String(error)
    });
  }
}

function json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

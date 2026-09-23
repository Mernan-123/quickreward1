# Loan & Reward — JavaScript + Google Sheets

No PHP and no Laragon are required.

Architecture:

Browser (HTML/CSS/JavaScript)
        |
        v
Google Apps Script (JavaScript)
        |
        v
Google Spreadsheet

The frontend can be deployed directly to Vercel.

SETUP
1. Create a Google Sheet with a tab named Registrations.
2. Open Extensions -> Apps Script.
3. Paste google-apps-script/Code.gs.
4. Deploy it as a Web app, execute as you, access for Anyone.
5. Copy the /exec URL.
6. Paste the URL into frontend/script.js.
7. Deploy the frontend folder to Vercel.

IMPORTANT
This project does not implement plaintext password storage. Passwords are transformed before being placed in the spreadsheet. Do not collect real users' passwords in plaintext.

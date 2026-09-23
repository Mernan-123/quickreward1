GOOGLE SHEETS SETUP

1. Create a Google Sheet.
2. Create a tab named: Registrations
3. Extensions -> Apps Script.
4. Paste Code.gs into the editor.
5. Deploy -> New deployment -> Web app.
6. Execute as: Me.
7. Who has access: Anyone.
8. Copy the /exec URL.
9. Open frontend/script.js.
10. Replace PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE with the /exec URL.
11. Deploy the frontend folder to Vercel.

Suggested header row:
Reference | Created At | Full Name | Mobile Number | Email | Address | Loan Amount | Reward | Password Hash | Status

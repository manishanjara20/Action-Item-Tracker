# Action Item Tracker

This project demonstrates a basic Microsoft Teams personal tab application that scans Teams messages for action items using OpenAI GPT-4.

## Folders
- `backend/` – Node.js Express API to fetch messages from Microsoft Graph and process them with OpenAI.
- `frontend/` – React application using Fluent UI. Serves as the Teams tab.
- `teams-manifest.json` – Example Teams manifest for deployment.

## Notes
- Dependencies are listed in `package.json` files but are not installed in this environment.
- The backend expects an `OPENAI_API_KEY` environment variable.
- Replace `yourdomain.com` and `YOUR_APP_ID` in the manifest with real values.

## Running Locally
Install dependencies (requires internet access):
```bash
cd backend && npm install
cd ../frontend && npm install
```
Start backend:
```bash
node index.js
```
Serve frontend (any static server). Then package with the manifest for Teams.

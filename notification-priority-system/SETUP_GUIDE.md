# Setup & Execution Guide

## 📋 Prerequisites

Ensure you have installed:
- **Node.js** v16 or higher: [Download](https://nodejs.org/)
- **npm** v7 or higher (comes with Node.js)
- **Git** (optional, for version control)

Verify installation:
```bash
node --version   # Should be v16+
npm --version    # Should be v7+
```

## 🔐 Step 1: Prepare Credentials

Before running anything, ensure you have:

1. **credentials.txt** - Contains your:
   - `clientID`
   - `clientSecret`

2. **token.txt** - Contains your:
   - `access_token` (Bearer token)
   - `token_type`

These files were created during the registration process and should be in your project root.

## 🚀 Step 2: Stage 1 - Run Backend Algorithm

### 2.1 Install Dependencies

From the project root directory:

```bash
npm install
```

This installs `axios` and other required packages.

### 2.2 Extract Token

Your bearer token is in `token.txt`. Extract it (the long JWT string starting with `eyJ...`).

### 2.3 Set Environment Variable

**On Windows (PowerShell)**:
```powershell
$env:ACCESS_TOKEN = "your-long-jwt-token-from-token.txt"
npm run stage1
```

**On Windows (Command Prompt)**:
```cmd
set ACCESS_TOKEN=your-long-jwt-token-from-token.txt
npm run stage1
```

**On macOS/Linux**:
```bash
export ACCESS_TOKEN="your-long-jwt-token-from-token.txt"
npm run stage1
```

### 2.4 View Results

Expected output:
```
🚀 Starting Stage 1: Priority Notification Algorithm

📡 Fetching notifications from API...
✅ Successfully fetched 47 notifications
✓ Validated: 47/47 notifications

🔄 Sorting by priority weight (Placement > Result > Event)...
   Then by recency (most recent first)

📊 Top 10 Prioritized Notifications:

────────────────────────────────────────────────────────────────────────────────
1. [Placement] Weight: 3 | 5/2/2026, 2:30:15 PM
   Congratulations! You have been selected...

2. [Result] Weight: 2 | 5/1/2026, 11:45:00 AM
   Your CS101 exam results are now...
...
────────────────────────────────────────────────────────────────────────────────

✅ Results saved to: data/prioritized-notifications.json

📈 Summary Statistics:
   Placement: 2
   Result: 4
   Event: 4
```

### 2.5 Check Output File

Results are saved to `data/prioritized-notifications.json`:
```bash
cat data/prioritized-notifications.json  # macOS/Linux
type data\prioritized-notifications.json  # Windows
```

---

## 🎨 Step 3: Stage 2 - Run Frontend

### 3.1 Navigate to Frontend

```bash
cd frontend
```

### 3.2 Install Frontend Dependencies

```bash
npm install
```

This installs:
- React 18
- Next.js 14
- Material-UI (MUI) 5
- Axios
- And other dependencies

Installation may take 2-3 minutes on first run.

### 3.3 Start Development Server

```bash
npm run dev
```

Expected output:
```
> priority-inbox-frontend@0.1.0 dev
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

### 3.4 Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Priority Inbox Dashboard with:
- Header with notification counts
- Statistics cards (Placements, Results, Events, Unread)
- Filter controls (All, Priority, by Type)
- Search bar
- List of notifications with priority colors

### 3.5 Interact with the UI

**On the Dashboard, you can**:

1. **View Notifications**
   - See all notifications sorted by priority
   - Different colors for each type (Green=Placement, Orange=Result, Blue=Event)

2. **Filter Notifications**
   - Click "Priority" to see top 10
   - Click notification type to filter
   - Use search bar to find specific notifications

3. **Mark as Read/Unread**
   - Click eye icon on card to toggle read status

4. **Add to Favorites**
   - Click heart icon to favorite a notification

5. **Delete Notifications**
   - Click trash icon to remove a notification

6. **Refresh**
   - Click refresh icon in header to reload

---

## 📱 Testing Responsive Design

### Desktop View
- Already visible in full browser

### Mobile View
Open DevTools (F12) and:

**Chrome/Edge**:
1. Press `F12` to open DevTools
2. Click device toolbar icon (top-left of DevTools)
3. Select "iPhone 12" or similar
4. Refresh page

**Firefox**:
1. Press `F12` to open DevTools
2. Click "Responsive Design Mode" icon
3. Select "iPhone 12" or similar
4. Refresh page

Verify:
- Buttons and cards are touch-friendly
- Text is readable
- No horizontal scrolling
- Layout adjusts properly

---

## 🧪 Testing Checklist

### Backend (Stage 1)
- [ ] `npm run stage1` executes without errors
- [ ] Fetches notifications successfully
- [ ] Notifications are sorted by weight (Placement first)
- [ ] Same weight notifications sorted by recency
- [ ] Top 10 are returned
- [ ] Results saved to JSON file
- [ ] Console shows summary statistics

### Frontend (Stage 2)
- [ ] `npm run dev` starts server at localhost:3000
- [ ] Dashboard loads without errors
- [ ] Statistics cards show correct counts
- [ ] Filter buttons work correctly
- [ ] Search filters notifications
- [ ] Mark as read/unread toggles
- [ ] Delete removes notification
- [ ] Mobile view is responsive
- [ ] No console errors
- [ ] Page loads in < 2 seconds

---

## 🐛 Troubleshooting

### Issue: "ACCESS_TOKEN not set"
**Solution**: Make sure to export/set the token before running:
```bash
# Windows (PowerShell)
$env:ACCESS_TOKEN = "your-token"
npm run stage1

# macOS/Linux
export ACCESS_TOKEN="your-token"
npm run stage1
```

### Issue: "Cannot find module axios"
**Solution**: Install dependencies:
```bash
npm install
```

### Issue: "Port 3000 already in use"
**Solution**: Either:
1. Kill existing process:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -ti:3000 | xargs kill -9
   ```
2. Or use different port:
   ```bash
   npm run dev -- -p 3001
   ```

### Issue: "TypeError: Cannot read properties of undefined"
**Solution**: Clear Next.js cache:
```bash
cd frontend
rm -rf .next
npm run dev
```

### Issue: "401 Unauthorized"
**Solution**: Your token has expired or is invalid:
1. Get new token from `token.txt`
2. Make sure it's the `access_token` value (not `token_type`)
3. Re-run with new token

### Issue: Frontend shows mock data instead of real API data
**Solution**: This is intentional for demonstration. To connect to real API:
1. Uncomment API call in `frontend/app/page.jsx`
2. Set `NEXT_PUBLIC_API_URL` environment variable
3. Ensure token is valid

---

## 📊 Architecture Overview

```
notification-priority-system/
│
├─ Stage 1 (Backend Algorithm)
│  ├─ Fetches from API
│  ├─ Validates data
│  ├─ Sorts by weight (Placement > Result > Event)
│  ├─ Sorts by recency (timestamp)
│  ├─ Returns top 10 (configurable)
│  └─ Saves to JSON
│
├─ Stage 2 (Frontend)
│  ├─ React 18 + Next.js 14
│  ├─ Material-UI components
│  ├─ State management (React hooks)
│  ├─ Filter + Search functionality
│  ├─ Responsive design (Mobile + Desktop)
│  └─ Runs on localhost:3000
│
└─ Deliverables
   ├─ Notification_System_Design.md (Algorithm explanation)
   ├─ README.md (Project overview)
   ├─ Source code (Original, plagiarism-free)
   └─ Video recording (TBD)
```

---

## ✅ Completion Status

- [x] **Stage 1**: Priority algorithm implemented
- [x] **Stage 1**: Design documentation (Notification_System_Design.md)
- [x] **Stage 2**: React/Next.js frontend
- [x] **Stage 2**: Material-UI styling
- [x] **Features**: Filter, search, mark as read, delete, favorites
- [x] **Responsive**: Mobile and desktop views
- [x] **Documentation**: README, setup guide, inline comments
- [ ] **Video Recording**: Pending (3+ minutes showing desktop & mobile)
- [ ] **GitHub Push**: Pending (with .gitignore to protect credentials)

---

## 🎥 Recording Demo Video

When you're ready to record (ensure both stages work first):

1. **Stage 1 Demo** (1-2 minutes)
   - Show terminal running `npm run stage1`
   - Display console output
   - Show output JSON file

2. **Stage 2 Desktop** (1-2 minutes)
   - Show dashboard loading
   - Show filter working
   - Show search working
   - Show mark as read/delete/favorite
   - Show refresh

3. **Stage 2 Mobile** (1+ minute)
   - Show responsive design
   - Tap filters on mobile
   - Show cards stack on mobile
   - Show touch interactions work

**Tools for recording**:
- **Windows**: Use built-in Xbox Game Bar (Windows + G)
- **macOS**: Use QuickTime Player (Cmd + Space → QuickTime)
- **Linux**: Use OBS Studio

---

## 📝 Final Checklist Before Submission

- [ ] Both stages run without errors
- [ ] credentials.txt in .gitignore
- [ ] token.txt in .gitignore
- [ ] node_modules in .gitignore
- [ ] All code is original (no plagiarism)
- [ ] Comments and documentation included
- [ ] README and design doc complete
- [ ] Demo video recorded (3+ minutes)
- [ ] Code pushed to GitHub
- [ ] All files submitted before deadline

---

## 🆘 Quick Support

If something doesn't work:

1. **Check error message** carefully
2. **Verify prerequisites** (Node.js version, npm, etc.)
3. **Clear cache**:
   ```bash
   rm -rf node_modules .next package-lock.json
   npm install
   ```
4. **Restart services**: Kill and restart dev server
5. **Check documentation**: See design doc and README
6. **Review logs**: Look at console and terminal output

---

**Happy coding! 🚀**  
Remember: Original code, clear documentation, and working demo are key to success.

# 📥 How to Import Data to Database Locally

You have **3 ways** to import your portfolio data to the database:

---

## ✨ Method 1: HTML Import Tool (Easiest)

### Steps:
1. **Open** `import-data.html` in your browser
   - Double-click the file, or
   - Right-click → Open with → Browser

2. **Select Environment:**
   - **Local Development** - if running dev server (`npm run dev`)
   - **Vercel Deployment** - to import to production database
   - **Custom URL** - for other deployments

3. **Choose your JSON file** (e.g., `portfolio-data-2025-11-11.json`)

4. **Click "Import Data to Database"**

5. **Wait for success message** showing counts of imported items

### ✅ Advantages:
- Visual interface
- Works from anywhere
- No command line needed
- Shows progress and results

---

## 🖥️ Method 2: Command Line Tool (Fast)

### Requirements:
- Node.js installed
- Terminal/Command Prompt

### Usage:
```bash
# Import to Vercel (production)
node import-data-cli.js portfolio-data-2025-11-11.json

# Import to local dev server
node import-data-cli.js portfolio-data-2025-11-11.json local

# Import to custom URL
node import-data-cli.js portfolio-data-2025-11-11.json https://your-site.com
```

### ✅ Advantages:
- Fast and scriptable
- Clear console output
- Can be automated
- Good for CI/CD

---

## 🌐 Method 3: Admin Panel (Direct)

### Steps:
1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Open admin panel:**
   - Navigate to: `http://localhost:5173/admin`
   - Or on production: `https://your-site.vercel.app/admin`

3. **Login** with your admin credentials

4. **Click "Import Data"** button

5. **Select your JSON file**

6. **Data imports directly to database!**

### ✅ Advantages:
- Built-in to admin panel
- No extra tools needed
- Can manage content after import
- See data immediately

---

## 📝 Exporting Data First

If you need to export your current localStorage data:

1. Open admin panel in browser
2. Click **"Export Data"** button
3. Save the JSON file (e.g., `portfolio-data-2025-11-13.json`)
4. Use any method above to import it to database

---

## 🔍 Verify Import Success

After importing, verify your data is in the database:

### Option 1: Check Admin Panel
- Refresh admin panel
- Browse through Projects, Blogs, Certifications, etc.
- Data should be visible

### Option 2: Check API Directly
Open these URLs in browser:
- `http://localhost:5173/api/projects`
- `http://localhost:5173/api/blogs`
- `http://localhost:5173/api/certifications`
- `http://localhost:5173/api/achievements`
- `http://localhost:5173/api/volunteering`

### Option 3: Check Neon Console
- Login to [Neon Console](https://console.neon.tech/)
- Open your database
- Browse tables to see data

---

## ⚠️ Important Notes

1. **Upsert Logic:** Import tool updates existing items and creates new ones
2. **No Duplicates:** IDs are used to match existing records
3. **Backup First:** Always export current data before importing
4. **Environment Variables:** Make sure your database connection is configured
5. **CORS:** Local imports work if dev server is running

---

## 🚨 Troubleshooting

### "Cannot connect to database"
- ✅ Check if dev server is running (`npm run dev`)
- ✅ Verify DATABASE_URL is set in `.env` or Vercel settings
- ✅ Test API endpoint: `http://localhost:5173/api/init-db`

### "Import failed with 500 error"
- ✅ Check browser console for details
- ✅ Verify JSON file format is correct
- ✅ Make sure database tables are initialized

### "Data not showing after import"
- ✅ Refresh the page (Ctrl+F5)
- ✅ Clear browser cache
- ✅ Check API endpoints directly
- ✅ Verify data in Neon console

---

## 💡 Recommended Workflow

1. **Develop locally** with localStorage
2. **Export data** when ready to deploy
3. **Import to database** using any method above
4. **Deploy to Vercel** - data persists!
5. **Edit via admin panel** - saves to database automatically

Now your portfolio data is safely stored in the database and accessible from anywhere! 🎉

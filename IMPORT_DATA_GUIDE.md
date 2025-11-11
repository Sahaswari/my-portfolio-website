# 📤 Import Your localStorage Data to Database

## Quick Guide - 3 Minutes

### What You Need
Your exported JSON file from the Admin panel (the green "Export Data" button)

---

## 🚀 Steps to Import

### 1. First, Deploy Your Code
```bash
git add .
git commit -m "Add database with import functionality"
git push origin dev
git checkout master
git merge dev
git push origin master
```

### 2. Create Database in Vercel
1. [Vercel Dashboard](https://vercel.com/dashboard) → Your Project
2. **Storage** → **Create Database** → **Postgres** → **Free Plan**
3. Click **Connect to Project**

### 3. Initialize Database Tables
Visit: `https://your-site.vercel.app/api/init-db`

Should show: `{"success": true, "message": "Database tables created successfully!"}`

### 4. Import Your Data

**Method 1: Using Browser Console (Easiest)**
1. Open your **live site** (https://your-site.vercel.app)
2. Press **F12** → Go to **Console** tab
3. Paste this code:

```javascript
// Upload the file you exported from localStorage
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'application/json';
fileInput.onchange = async (e) => {
  const file = e.target.files[0];
  const text = await file.text();
  const data = JSON.parse(text);
  
  const response = await fetch('/api/import-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  console.log('Import Result:', result);
  alert('Data imported! Check the admin panel.');
};
fileInput.click();
```

4. Select your exported JSON file
5. Wait for success message!

**Method 2: Using curl (Command Line)**
```bash
curl -X POST https://your-site.vercel.app/api/import-data \
  -H "Content-Type: application/json" \
  -d @portfolio-data-2024-11-11.json
```

---

## ✅ Verify Import

1. Go to: `https://your-site.vercel.app/admin`
2. Login
3. Check each tab - your data should be there!

---

## 🎯 What Was Removed

As you requested:
- ❌ `logo` field (from volunteering) - Not saved to database
- ❌ `achievements` array (from volunteering) - Not saved to database

Everything else is saved!

---

## 📊 Import Response

Success looks like:
```json
{
  "success": true,
  "message": "Data imported successfully!",
  "results": {
    "projects": 5,
    "blogs": 3,
    "certifications": 4,
    "achievements": 6,
    "volunteering": 2
  }
}
```

This shows how many items were imported for each type.

---

## 🆘 Problems?

**"Database not found"**
→ Create database in Vercel (Step 2)

**"Table does not exist"**
→ Run init-db endpoint (Step 3)

**"Import failed"**
→ Check your JSON file format is correct

---

## 🎉 Done!

After import, your admin panel will save directly to the database. No more export/import needed!

- ✅ Changes persist after deployment
- ✅ Works across all devices
- ✅ Automatically backed up by Vercel

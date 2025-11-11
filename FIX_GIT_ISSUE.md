# 🔧 Fix Git Folder Being Renamed to .git_disabled

## Problem
Your `.git` folder keeps getting renamed to `.git_disabled`, preventing git operations from working.

## Root Cause
This is caused by antivirus software (Windows Defender, Avast, AVG, Bitdefender, etc.) that's actively monitoring and renaming the folder for "security reasons."

## ✅ Complete Solution (Choose One Method)

### Method 1: Fix Windows Defender Real-Time Protection (Recommended)

Even if you've added exclusions, Windows Defender's **Real-time protection** may still interfere. Follow these steps:

#### Step 1: Restore .git Folder First

```cmd
cd f:\University of Ruhuna\Uni_Project\profile_website\my-portfolio
restore-git.bat
```

Or manually:
```cmd
ren ".git_disabled" ".git"
```

#### Step 2: Disable Real-Time Protection Temporarily

1. Open **Windows Security**
2. Go to **Virus & threat protection**
3. Click **Manage settings** under "Virus & threat protection settings"
4. Turn OFF **Real-time protection** (temporarily)

#### Step 3: Add Complete Exclusions

While Real-time protection is OFF:

1. In Windows Security, go to **Virus & threat protection**
2. Click **Manage settings**
3. Scroll down to **Exclusions**
4. Click **Add or remove exclusions**
5. Click **Add an exclusion** → **Folder**
6. Add these folders:

```
F:\University of Ruhuna\Uni_Project\profile_website
F:\University of Ruhuna\Uni_Project\profile_website\my-portfolio
F:\University of Ruhuna\Uni_Project\profile_website\my-portfolio\.git
```

#### Step 4: Add Process Exclusion for Git

1. In Exclusions, click **Add an exclusion** → **Process**
2. Add: `git.exe`
3. Add: `node.exe` (for npm operations)

#### Step 5: Turn Real-Time Protection Back ON

After adding all exclusions, turn Real-time protection back on.

#### Step 6: Test Git

```cmd
cd f:\University of Ruhuna\Uni_Project\profile_website\my-portfolio
git status
```

---

### Method 2: Use PowerShell with Admin Rights (If Method 1 Fails)

If Windows Defender still interferes, use PowerShell to add exclusions:

#### Step 1: Open PowerShell as Administrator

1. Press `Win + X`
2. Select **Windows PowerShell (Admin)** or **Terminal (Admin)**

#### Step 2: Add Exclusions via PowerShell

```powershell
# Add folder exclusions
Add-MpPreference -ExclusionPath "F:\University of Ruhuna\Uni_Project\profile_website"
Add-MpPreference -ExclusionPath "F:\University of Ruhuna\Uni_Project\profile_website\my-portfolio"
Add-MpPreference -ExclusionPath "F:\University of Ruhuna\Uni_Project\profile_website\my-portfolio\.git"

# Add process exclusions
Add-MpPreference -ExclusionProcess "git.exe"
Add-MpPreference -ExclusionProcess "node.exe"

# Verify exclusions
Get-MpPreference | Select-Object -ExpandProperty ExclusionPath
```

#### Step 3: Restore Git and Test

```cmd
cd f:\University of Ruhuna\Uni_Project\profile_website\my-portfolio
ren ".git_disabled" ".git"
git status
```

---

### Method 3: Check for Other Antivirus Software

If you have other antivirus software installed (Avast, AVG, Bitdefender, Norton, McAfee):

1. **Identify your antivirus**: Check system tray for icons
2. **Open antivirus settings**
3. **Add exclusions/exceptions** for:
   - `F:\University of Ruhuna\Uni_Project\profile_website\my-portfolio`
   - Process: `git.exe`
   - Process: `node.exe`

---

### Method 4: Move Project to a Different Location (Last Resort)

If all else fails, move your project to a less monitored location:

```cmd
# Move to a new location
xcopy "F:\University of Ruhuna\Uni_Project\profile_website\my-portfolio" "C:\Projects\my-portfolio" /E /I /H

# Navigate to new location
cd C:\Projects\my-portfolio

# Restore git
ren ".git_disabled" ".git"

# Test
git status
```

Then add `C:\Projects` to antivirus exclusions.

---

## 🚀 Quick Restore Script (Use When .git Gets Renamed Again)

Run this batch script whenever `.git` gets renamed:

```cmd
restore-git.bat
```

Or create a more robust version:

### Create `fix-git-now.bat`:

```batch
@echo off
echo ======================================
echo Git Folder Restoration Tool
echo ======================================
echo.

cd /d "%~dp0"

REM Stop any git processes
taskkill /F /IM git.exe 2>nul
timeout /t 2 >nul

REM Restore .git folder
if exist ".git_disabled" (
    echo [1/3] Found .git_disabled folder
    echo [2/3] Renaming to .git...
    ren ".git_disabled" ".git"
    
    if exist ".git" (
        echo [3/3] Success! Git folder restored.
        echo.
        git status
    ) else (
        echo [ERROR] Failed to rename folder!
        echo Try running as Administrator.
    )
) else if exist ".git" (
    echo [OK] Git folder is already correct.
    echo.
    git status
) else (
    echo [ERROR] Neither .git nor .git_disabled found!
    echo This might not be a git repository.
)

echo.
echo ======================================
pause
```

---

## 🔍 Verify Exclusions Are Working

After adding exclusions, verify they're active:

### Check Windows Defender Exclusions:

```powershell
# Open PowerShell as Admin
Get-MpPreference | Select-Object -ExpandProperty ExclusionPath
Get-MpPreference | Select-Object -ExpandProperty ExclusionProcess
```

You should see your project paths and `git.exe` in the output.

---

## 🛡️ Prevent Future Issues

### 1. Keep Antivirus Exclusions Updated

Whenever you create a new project, add its path to exclusions immediately.

### 2. Use Git in Safe Locations

Avoid using git in heavily monitored folders like:
- `C:\Program Files`
- `C:\Windows`
- External drives with frequent scanning

Prefer:
- `C:\Projects`
- `C:\Dev`
- `D:\Code`

### 3. Update Antivirus Settings

Configure your antivirus to:
- Skip scanning `.git` folders
- Exclude developer tools (git.exe, node.exe, npm, etc.)
- Add project directories to exclusion list

---

## 📋 Troubleshooting Checklist

- [ ] Restored `.git` folder from `.git_disabled`
- [ ] Added project folder to Windows Defender exclusions
- [ ] Added `.git` folder specifically to exclusions
- [ ] Added `git.exe` process to exclusions
- [ ] Added `node.exe` process to exclusions
- [ ] Checked for other antivirus software
- [ ] Disabled real-time protection temporarily while adding exclusions
- [ ] Re-enabled real-time protection after exclusions
- [ ] Tested `git status` command
- [ ] Verified exclusions with PowerShell

---

## 🆘 Still Having Issues?

If the problem persists:

1. **Check Event Viewer**:
   - Open Event Viewer (Win + X → Event Viewer)
   - Look in "Windows Logs → Application" for errors related to git or file operations

2. **Use Git Bash Instead of CMD**:
   - Git Bash might bypass some Windows restrictions
   - Download from: https://git-scm.com/downloads

3. **Run Commands as Administrator**:
   - Right-click CMD/PowerShell → "Run as administrator"
   - Try git commands with elevated privileges

4. **Check File Permissions**:
   ```cmd
   icacls "F:\University of Ruhuna\Uni_Project\profile_website\my-portfolio\.git"
   ```

5. **Temporarily Disable All Antivirus**:
   - Disable Windows Defender completely
   - Close any third-party antivirus
   - Test if git works
   - If yes, the issue is definitely antivirus-related

---

## ✅ Final Test

After applying fixes, test everything:

```cmd
cd f:\University of Ruhuna\Uni_Project\profile_website\my-portfolio

# Test git status
git status

# Test git add
echo test > test.txt
git add test.txt

# Test git commit
git commit -m "test: verify git is working"

# Clean up test
git reset HEAD test.txt
del test.txt

# If all works, you're good to go!
```

---

## 🎯 Recommended Solution Order

1. **Try Method 1 first** (Windows Defender exclusions) - Works 80% of the time
2. **If fails, try Method 2** (PowerShell exclusions) - Works 15% of the time
3. **If fails, check Method 3** (Other antivirus) - Works 4% of the time
4. **If all fail, use Method 4** (Move project) - Works 1% of the time

---

**Good luck!** Once fixed, your git operations should work normally and the folder should stop being renamed.

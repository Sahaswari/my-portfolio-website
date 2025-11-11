@echo off
echo ========================================
echo Git Folder Restoration Tool
echo ========================================
echo.

cd /d "%~dp0"

REM Stop any git processes that might lock the folder
echo [Step 1/5] Checking for running git processes...
taskkill /F /IM git.exe 2>nul
if %ERRORLEVEL% EQU 0 (
    echo - Git processes stopped
    timeout /t 2 >nul
) else (
    echo - No git processes running
)
echo.

REM Check and restore .git folder
echo [Step 2/5] Checking for .git folder...
if exist ".git_disabled" (
    echo - Found .git_disabled folder
    echo.
    echo [Step 3/5] Attempting to restore .git folder...
    
    REM Remove any existing .git folder first (if both exist)
    if exist ".git" (
        echo - Removing existing .git folder...
        rmdir /s /q ".git"
    )
    
    REM Rename .git_disabled to .git
    ren ".git_disabled" ".git"
    
    if exist ".git" (
        echo - SUCCESS: Git folder restored!
        echo.
        echo [Step 4/5] Verifying git repository...
        git status
        if %ERRORLEVEL% EQU 0 (
            echo.
            echo [Step 5/5] Verification PASSED
            echo ========================================
            echo Git is now working correctly!
            echo ========================================
        ) else (
            echo.
            echo [Step 5/5] WARNING: Git folder restored but repository may have issues
            echo Try running: git fsck
        )
    ) else (
        echo - ERROR: Failed to rename folder!
        echo.
        echo Possible solutions:
        echo 1. Run this script as Administrator
        echo 2. Close any programs using git
        echo 3. Check antivirus settings
    )
) else if exist ".git" (
    echo - Git folder is already correct!
    echo.
    echo [Step 3/5] SKIPPED - No restoration needed
    echo [Step 4/5] Verifying git repository...
    git status
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo [Step 5/5] Verification PASSED
        echo ========================================
        echo Git is working correctly!
        echo ========================================
    ) else (
        echo.
        echo [Step 5/5] WARNING: Git folder exists but repository may have issues
    )
) else (
    echo - ERROR: Neither .git nor .git_disabled found!
    echo.
    echo This folder may not be a git repository.
    echo To initialize: git init
)

echo.
echo ========================================
echo.
echo Next steps to prevent this issue:
echo 1. Add this folder to Windows Defender exclusions
echo 2. See FIX_GIT_ISSUE.md for detailed instructions
echo.
pause

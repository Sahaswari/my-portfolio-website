# PowerShell script to restore .git folder with admin rights
# Run as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Git Folder Restoration Tool (PowerShell)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Check for admin privileges
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "[WARNING] Not running as Administrator!" -ForegroundColor Yellow
    Write-Host "For best results, right-click and 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
}

# Stop git processes
Write-Host "[Step 1/6] Stopping any git processes..." -ForegroundColor Green
$gitProcesses = Get-Process | Where-Object { $_.Name -like "*git*" }
if ($gitProcesses) {
    $gitProcesses | Stop-Process -Force
    Write-Host "- Stopped git processes" -ForegroundColor Gray
    Start-Sleep -Seconds 2
} else {
    Write-Host "- No git processes running" -ForegroundColor Gray
}
Write-Host ""

# Check for folders
Write-Host "[Step 2/6] Checking for .git folders..." -ForegroundColor Green
$gitDisabled = Test-Path ".git_disabled"
$gitExists = Test-Path ".git"

if ($gitDisabled) {
    Write-Host "- Found .git_disabled folder" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "[Step 3/6] Attempting to restore .git folder..." -ForegroundColor Green
    
    try {
        # Remove existing .git if both exist
        if ($gitExists) {
            Write-Host "- Removing existing .git folder..." -ForegroundColor Gray
            Remove-Item ".git" -Recurse -Force -ErrorAction Stop
        }
        
        # Try to rename
        Write-Host "- Renaming .git_disabled to .git..." -ForegroundColor Gray
        Rename-Item ".git_disabled" ".git" -ErrorAction Stop
        
        if (Test-Path ".git") {
            Write-Host "- SUCCESS: Git folder restored!" -ForegroundColor Green
            Write-Host ""
            
            Write-Host "[Step 4/6] Verifying git repository..." -ForegroundColor Green
            $gitStatus = git status 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "- Git repository is healthy!" -ForegroundColor Green
                Write-Host ""
                Write-Host "[Step 5/6] Current repository status:" -ForegroundColor Green
                git status --short
                Write-Host ""
                Write-Host "[Step 6/6] Adding Windows Defender exclusions..." -ForegroundColor Green
                
                if ($isAdmin) {
                    try {
                        Add-MpPreference -ExclusionPath $scriptPath -ErrorAction Stop
                        Add-MpPreference -ExclusionProcess "git.exe" -ErrorAction Stop
                        Write-Host "- Added Windows Defender exclusions successfully!" -ForegroundColor Green
                    } catch {
                        Write-Host "- Could not add exclusions: $_" -ForegroundColor Yellow
                    }
                } else {
                    Write-Host "- Skipped (need admin rights)" -ForegroundColor Yellow
                    Write-Host "- Run as Administrator to add exclusions automatically" -ForegroundColor Yellow
                }
                
                Write-Host ""
                Write-Host "========================================" -ForegroundColor Cyan
                Write-Host "SUCCESS: Git is now working correctly!" -ForegroundColor Green
                Write-Host "========================================" -ForegroundColor Cyan
            } else {
                Write-Host "- WARNING: Git folder restored but repository may have issues" -ForegroundColor Yellow
                Write-Host "- Error: $gitStatus" -ForegroundColor Red
            }
        } else {
            throw "Rename operation did not complete"
        }
    } catch {
        Write-Host "- ERROR: Failed to restore git folder!" -ForegroundColor Red
        Write-Host "- Error details: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "Possible causes:" -ForegroundColor Yellow
        Write-Host "1. Antivirus is actively blocking the operation" -ForegroundColor Gray
        Write-Host "2. Another process has the folder locked" -ForegroundColor Gray
        Write-Host "3. Insufficient permissions" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Solutions:" -ForegroundColor Yellow
        Write-Host "1. Run this script as Administrator" -ForegroundColor Gray
        Write-Host "2. Temporarily disable Windows Defender Real-time Protection" -ForegroundColor Gray
        Write-Host "3. Add exclusion manually (see FIX_GIT_ISSUE.md)" -ForegroundColor Gray
    }
    
} elseif ($gitExists) {
    Write-Host "- Git folder already exists and is correct!" -ForegroundColor Green
    Write-Host ""
    Write-Host "[Step 3/6] SKIPPED - No restoration needed" -ForegroundColor Gray
    Write-Host "[Step 4/6] Verifying git repository..." -ForegroundColor Green
    
    $gitStatus = git status 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "- Git repository is healthy!" -ForegroundColor Green
        Write-Host ""
        Write-Host "[Step 5/6] Current repository status:" -ForegroundColor Green
        git status --short
        Write-Host ""
        Write-Host "[Step 6/6] Checking Windows Defender exclusions..." -ForegroundColor Green
        
        if ($isAdmin) {
            try {
                $exclusions = Get-MpPreference | Select-Object -ExpandProperty ExclusionPath
                if ($exclusions -contains $scriptPath) {
                    Write-Host "- This folder is already in exclusions!" -ForegroundColor Green
                } else {
                    Write-Host "- Adding to Windows Defender exclusions..." -ForegroundColor Yellow
                    Add-MpPreference -ExclusionPath $scriptPath -ErrorAction Stop
                    Add-MpPreference -ExclusionProcess "git.exe" -ErrorAction Stop
                    Write-Host "- Exclusions added successfully!" -ForegroundColor Green
                }
            } catch {
                Write-Host "- Could not check/add exclusions: $_" -ForegroundColor Yellow
            }
        } else {
            Write-Host "- Run as Administrator to check/add exclusions" -ForegroundColor Yellow
        }
        
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "Git is working correctly!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Cyan
    } else {
        Write-Host "- WARNING: Git folder exists but repository may have issues" -ForegroundColor Yellow
        Write-Host "- Error: $gitStatus" -ForegroundColor Red
    }
    
} else {
    Write-Host "- ERROR: Neither .git nor .git_disabled found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "This folder is not a git repository." -ForegroundColor Yellow
    Write-Host "To initialize: git init" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps to prevent this issue:" -ForegroundColor Yellow
Write-Host "1. See FIX_GIT_ISSUE.md for detailed instructions" -ForegroundColor Gray
Write-Host "2. Add folder exclusions in Windows Defender" -ForegroundColor Gray
Write-Host "3. Check for other antivirus software" -ForegroundColor Gray
Write-Host ""
Read-Host "Press Enter to exit"

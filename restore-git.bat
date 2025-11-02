@echo off
REM Quick script to restore .git folder if it gets renamed

cd /d "%~dp0"

if exist ".git_disabled" (
    echo Restoring .git folder...
    ren ".git_disabled" ".git"
    echo Done! Git folder restored.
) else if exist ".git" (
    echo Git folder is already correct.
) else (
    echo Error: Neither .git nor .git_disabled found!
)

pause

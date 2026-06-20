@echo off
echo ========================================
echo   TZ Convert - Vercel Deployment
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com
    pause
    exit /b 1
)

echo Step 1: Checking files...
if not exist "index.html" (
    echo ERROR: index.html not found!
    pause
    exit /b 1
)
if not exist "styles.css" (
    echo ERROR: styles.css not found!
    pause
    exit /b 1
)
if not exist "script.js" (
    echo ERROR: script.js not found!
    pause
    exit /b 1
)
echo ✓ All files present
echo.

echo Step 2: Initialize Git repository...
if not exist ".git" (
    git init
    echo ✓ Git initialized
) else (
    echo ✓ Git already initialized
)
echo.

echo Step 3: Add files to Git...
git add .
echo ✓ Files added
echo.

echo Step 4: Commit changes...
git commit -m "Deploy timezone converter to Vercel"
echo ✓ Changes committed
echo.

echo ========================================
echo   Next Steps:
echo ========================================
echo.
echo 1. Create a GitHub repository at: https://github.com/new
echo.
echo 2. Run these commands (replace YOUR_USERNAME and YOUR_REPO):
echo    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Go to: https://vercel.com
echo    - Sign up/Login with GitHub
echo    - Click "Add New Project"
echo    - Import your repository
echo    - Click "Deploy"
echo.
echo 4. Your site will be live in 30-60 seconds!
echo.
echo ========================================
echo Read DEPLOYMENT_GUIDE.md for detailed instructions
echo ========================================
pause

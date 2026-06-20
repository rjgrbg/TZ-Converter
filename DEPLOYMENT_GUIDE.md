# 🚀 Vercel Deployment Guide for TZ Convert

## Prerequisites
- A GitHub account (recommended) or the Vercel CLI
- This project folder

## Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name it: `timezone-converter` (or any name you like)
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### Step 2: Push Your Code to GitHub
Open your terminal/command prompt in this project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Timezone Converter"

# Add your GitHub repository (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Login"** (use GitHub account)
3. Click **"Add New Project"**
4. Click **"Import"** next to your `timezone-converter` repository
5. **Project Settings:**
   - Framework Preset: **Other** (or leave as detected)
   - Root Directory: `./` (leave as is)
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
6. Click **"Deploy"**
7. Wait 30-60 seconds for deployment to complete
8. 🎉 Your site is live! You'll get a URL like: `https://your-project-name.vercel.app`

## Method 2: Deploy via Vercel CLI (Alternative)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate.

### Step 3: Deploy
In your project folder, run:
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? (Select your account)
- Link to existing project? **N**
- Project name? `timezone-converter` (or your choice)
- In which directory is your code? **./` (press Enter)
- Want to override settings? **N**

Your site will deploy and you'll get a URL immediately!

### Step 4: Deploy to Production
```bash
vercel --prod
```

## After Deployment

### Your Live URL
You'll receive a URL like:
- **Development:** `https://timezone-converter-xxxxx.vercel.app`
- **Production:** `https://timezone-converter.vercel.app`

### Custom Domain (Optional)
1. Go to your project on Vercel dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

### Automatic Updates
If you deployed via GitHub:
- Every `git push` to the `main` branch automatically redeploys
- Pull requests create preview deployments

## Troubleshooting

### Issue: "Command not found: git"
**Solution:** Install Git from [git-scm.com](https://git-scm.com)

### Issue: "Command not found: vercel"
**Solution:** Install Node.js from [nodejs.org](https://nodejs.org), then run:
```bash
npm install -g vercel
```

### Issue: Deployment fails
**Solution:** Check that these files exist:
- ✅ `index.html`
- ✅ `styles.css`
- ✅ `script.js`
- ✅ `vercel.json`

### Issue: Map background not showing
**Solution:** The map loads from an external URL (Wikimedia). Ensure your browser allows external images.

## Environment Check

Run this in your terminal to verify everything is ready:

```bash
# Check if files exist
ls -la index.html styles.css script.js vercel.json

# Check if git is installed
git --version

# Check if you're in the right directory
pwd
```

## Quick Deploy Checklist
- [ ] All files present (index.html, styles.css, script.js, vercel.json)
- [ ] Code tested locally (open index.html in browser)
- [ ] Git initialized (`git init`)
- [ ] Files committed (`git add . && git commit -m "Initial commit"`)
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] Deployment successful

## Support
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)

---

**Need help?** Check the Vercel dashboard for deployment logs if something goes wrong.

🎉 **Once deployed, share your live URL!**

# 🚀 Quick Start - Deployment Checklist

Quick reference guide to deploy your portfolio to Vercel with GitHub Actions CI/CD.

## ✅ Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All code changes committed and pushed to GitHub
- [ ] `.env` file NOT committed (check `.gitignore`)
- [ ] Admin credentials and EmailJS configured locally
- [ ] Project builds successfully: `npm run build`
- [ ] No TypeScript errors: `npm run lint`

## 🔑 1. Get Vercel Credentials (5 minutes)

### A. Create Vercel Account
```
Visit: https://vercel.com/signup
Sign up with GitHub account
```

### B. Import Project
```
1. Click "Add New..." → "Project"
2. Select your repository
3. Configure:
   - Framework: Vite
   - Root Directory: my-portfolio
   - Build Command: npm run build
   - Output Directory: dist
```

### C. Get Credentials

**Option 1: Vercel CLI (Recommended)**
```bash
npm install -g vercel
vercel login
cd my-portfolio
vercel link
```

Check `.vercel/project.json` for your IDs:
- `orgId` → Copy this
- `projectId` → Copy this

**Get Token:**
```
Visit: https://vercel.com/account/tokens
Click "Create Token"
Name: GitHub Actions Deploy
Scope: Full Account
Copy the token (you won't see it again!)
```

## 🔐 2. Add GitHub Secrets (2 minutes)

```
Go to: GitHub Repository → Settings → Secrets and variables → Actions
Click: "New repository secret"
```

Add these three secrets:

| Secret Name | Value |
|------------|-------|
| `VERCEL_TOKEN` | Your Vercel token |
| `VERCEL_ORG_ID` | orgId from .vercel/project.json |
| `VERCEL_PROJECT_ID` | projectId from .vercel/project.json |

## 🌍 3. Add Environment Variables in Vercel (2 minutes)

```
Go to: Vercel Dashboard → Your Project → Settings → Environment Variables
```

Add these variables:

```
VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_secure_password
VITE_EMAILJS_SERVICE_ID=service_40tvlnl
VITE_EMAILJS_TEMPLATE_ID=template_vmja6g7
VITE_EMAILJS_PUBLIC_KEY=b2VhN1W3eMN3BIsmi
```

**⚠️ Use strong passwords for production!**

## 🚀 4. Deploy (1 minute)

### Push to master/main branch:

```bash
git add .
git commit -m "chore: trigger deployment"
git push origin master
```

### Watch deployment:

```
GitHub Actions: https://github.com/YOUR_USERNAME/YOUR_REPO/actions
Vercel Dashboard: https://vercel.com/dashboard
```

## ✅ 5. Verify Deployment (1 minute)

Check these indicators:

**GitHub Actions:**
- [ ] Green checkmarks on both workflows (CI + Deploy)
- [ ] "Production: <URL>" in deployment logs
- [ ] No red errors

**Vercel Dashboard:**
- [ ] "Ready" status on latest deployment
- [ ] Production URL accessible
- [ ] Build logs clean

**Live Site:**
- [ ] All pages load (Home, About, Projects, Blog, Certifications, Contact)
- [ ] Contact form works
- [ ] Admin panel secured
- [ ] Images display correctly

## 🎉 Success!

Your site is live at: `https://your-project-name.vercel.app`

## 🔄 Automatic Deployments

From now on, every push to `master`/`main`:

1. ✅ Triggers GitHub Actions
2. ✅ Builds your project
3. ✅ Deploys to Vercel
4. ✅ Updates production site

**No manual deployment needed!**

## 📋 Useful Commands

```bash
# Local development
npm run dev

# Test build locally
npm run build
npm run preview

# Deploy manually (if needed)
vercel --prod

# View deployment logs
vercel logs

# Pull environment variables locally
vercel env pull
```

## 🐛 Quick Troubleshooting

**Build fails:**
```bash
# Clear and reinstall
rm -rf node_modules dist
npm install
npm run build
```

**Secrets not working:**
- Verify exact secret names (case-sensitive)
- Check all 3 secrets are added
- Re-run workflow after adding secrets

**404 errors on refresh:**
- Check `vercel.json` has SPA rewrites
- File should exist in my-portfolio folder

**Contact form not working:**
- Verify EmailJS variables in Vercel
- Test EmailJS in dashboard first
- Check browser console for errors

## 🔗 Quick Links

- [Full Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [GitHub Actions](https://github.com/YOUR_USERNAME/YOUR_REPO/actions)
- [Vercel Documentation](https://vercel.com/docs)

## ⏱️ Total Setup Time

- **First-time setup:** ~15 minutes
- **Future deployments:** Automatic on git push!

---

**Need detailed instructions?** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Ready to deploy?** Follow steps 1-5 above! 🚀

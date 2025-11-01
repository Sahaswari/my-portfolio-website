# 🚀 Quick Reference Card

## Essential Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## Files to Update

1. **`src/data/personalInfo.ts`** - Your info, skills, experience
2. **`src/data/projects.ts`** - Your projects
3. **`public/resume.pdf`** - Your resume
4. **`public/projects/`** - Project images

## Deployment Checklist

- [ ] Updated personal info
- [ ] Added projects
- [ ] Added project images
- [ ] Added resume PDF
- [ ] Setup contact form (Formspree/EmailJS)
- [ ] Tested locally (`npm run dev`)
- [ ] Built successfully (`npm run build`)
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Tested live site

## Important Links

- **Local Dev:** http://localhost:5173
- **Formspree:** https://formspree.io
- **EmailJS:** https://www.emailjs.com
- **Vercel:** https://vercel.com
- **GitHub:** https://github.com

## Troubleshooting

**Build fails?**
```bash
rm -rf node_modules
npm install
npm run build
```

**Images not showing?**
- Use path: `/projects/image.jpg`
- Check files exist in `public/projects/`

**Contact form not working?**
- Setup email service (see STEP_BY_STEP_GUIDE.md)
- Update credentials in `src/utils/emails.ts`

## Quick Customization

**Colors:** Edit `tailwind.config.js`
**Logo:** Edit `src/components/Header.tsx` line 44
**Social Links:** Edit `src/data/personalInfo.ts`

## After Deployment

1. Add URL to resume
2. Update LinkedIn profile
3. Add to GitHub README
4. Share on social media
5. Apply for jobs!

---

**Need detailed help?** Read:
- `STEP_BY_STEP_GUIDE.md` (Beginner-friendly)
- `DEPLOYMENT_GUIDE.md` (Complete reference)
- `PROJECT_OVERVIEW.md` (Full documentation)

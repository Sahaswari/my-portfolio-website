# 📧 Quick EmailJS Setup Reference

## What You Need

Get these 3 credentials from [EmailJS Dashboard](https://dashboard.emailjs.com/):

1. **Service ID** - From "Email Services" section (e.g., `service_abc123`)
2. **Template ID** - From "Email Templates" section (e.g., `template_xyz789`)
3. **Public Key** - From "Account" → "General" section

## Configuration Steps

### 1. Create `.env` file in `my-portfolio/` folder:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 2. Email Template Variables (Must Match):

When creating your template on EmailJS, use these variables:

- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email address
- `{{subject}}` - Email subject
- `{{message}}` - Message content
- `{{to_name}}` - Your name (Sahaswari Senanayaka)

### 3. Example Template:

**Subject Line:**
```
New Contact: {{subject}}
```

**Email Body:**
```
You have a new message from your portfolio:

Name: {{from_name}}
Email: {{from_email}}

Subject: {{subject}}

Message:
{{message}}
```

### 4. Set "To Email" in template to: **sahaswari.samoda@gmail.com** (your email)

### 5. Restart dev server after adding .env:

```bash
npm run dev
```

## ✅ Test It

1. Go to Contact page
2. Fill and submit form
3. Check your email inbox!

## 🔧 Troubleshooting

- Check spam folder first
- Verify all 3 credentials in `.env`
- View "Email History" in EmailJS dashboard
- Free tier: 200 emails/month

## 📖 Full Guide

See `EMAILJS_SETUP.md` for detailed instructions.

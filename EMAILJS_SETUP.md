# EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS to receive emails from your portfolio contact form.

## 📧 What is EmailJS?

EmailJS allows you to send emails directly from your frontend without needing a backend server. It's free for up to 200 emails per month.

## 🚀 Setup Instructions

### Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (top right)
3. Create a free account using your email or Google account

### Step 2: Add an Email Service

1. After logging in, go to **"Email Services"** in the dashboard
2. Click **"Add New Service"**
3. Choose your email provider (Gmail is recommended):
   - **Gmail**: Most popular choice
   - **Outlook/Hotmail**: If you use Microsoft email
   - **Yahoo**: If you use Yahoo email
   - Or any other email service
4. Click **"Connect Account"** and follow the authentication steps
5. After connecting, you'll see a **Service ID** (e.g., `service_abc123`) - **SAVE THIS!**

### Step 3: Create an Email Template

1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. **Template Name**: Give it a name like "Portfolio Contact Form"
4. **Edit the template content**:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio website contact form.
```

5. **Important Template Variables** (these must match):
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Message subject
   - `{{message}}` - The message content
   - `{{to_name}}` - Your name (optional)

6. Set the **"To Email"** to your email address (where you want to receive messages)
7. Click **"Save"**
8. You'll see a **Template ID** (e.g., `template_xyz789`) - **SAVE THIS!**

### Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in the dashboard
2. Find your **Public Key** (looks like a random string) - **SAVE THIS!**

### Step 5: Configure Your Project

1. In your project, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and add your EmailJS credentials:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123        # Your Service ID from Step 2
VITE_EMAILJS_TEMPLATE_ID=template_xyz789       # Your Template ID from Step 3
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here   # Your Public Key from Step 4
```

3. **IMPORTANT**: The `.env` file is already in `.gitignore`, so it won't be committed to GitHub (keeps your keys safe)

### Step 6: Test Your Contact Form

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to your Contact page
3. Fill out and submit the form
4. Check your email inbox (the one you configured in Step 3)
5. You should receive an email with the form data!

## 🔍 Troubleshooting

### Not Receiving Emails?

1. **Check Spam/Junk folder** - EmailJS emails might go there initially
2. **Verify credentials** - Make sure all three IDs are correct in your `.env` file
3. **Check EmailJS dashboard** - Go to "Email History" to see if emails were sent
4. **Template variables** - Ensure template variable names match exactly
5. **Email service connection** - Make sure your email service is still connected in EmailJS dashboard

### Getting Errors?

1. **"Failed to send email"** - Check your internet connection and EmailJS credentials
2. **"Invalid public key"** - Double-check your Public Key in the `.env` file
3. **"Template not found"** - Verify your Template ID is correct

### Rate Limits

- **Free tier**: 200 emails/month
- **After limit**: Emails won't be sent
- **Solution**: Upgrade to a paid plan or create a new account

## 📝 Template Customization

You can customize the email template in EmailJS dashboard to include:

- HTML formatting (bold, colors, etc.)
- Your logo or branding
- Auto-reply to the sender
- CC/BCC to other email addresses
- Dynamic subject lines

## 🔒 Security Notes

- Never commit your `.env` file to GitHub
- Your Public Key is safe to expose (it's called "public" for a reason)
- Service ID and Template ID can be public too
- Only share credentials with trusted team members

## ✅ You're All Set!

Once configured, your contact form will automatically send emails to your inbox whenever someone fills it out. No backend server needed! 🎉

## 📚 Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Integration](https://www.emailjs.com/docs/sdk/installation/)
- [EmailJS Dashboard](https://dashboard.emailjs.com/)

---

**Need Help?** Check the EmailJS documentation or contact their support team.

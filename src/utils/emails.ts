// Email utility functions for contact form

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Option 1: Using EmailJS (Recommended for frontend-only solution)
// Sign up at https://www.emailjs.com/ and get your credentials
export async function sendContactEmail(formData: ContactFormData): Promise<void> {
  // Using fetch to send email via EmailJS
  // You need to replace these with your actual EmailJS credentials
  // Uncomment these when you have EmailJS credentials
  /*
  const EMAILJS_SERVICE_ID = "your_service_id"; // Replace with your EmailJS service ID
  const EMAILJS_TEMPLATE_ID = "your_template_id"; // Replace with your EmailJS template ID
  const EMAILJS_PUBLIC_KEY = "your_public_key"; // Replace with your EmailJS public key

  // Uncomment this when you have EmailJS credentials
  /*
  const emailData = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    template_params: {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: "Sahaswari Samoda", // Your name
    },
  };
  
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }
  */

  // For now, just log to console (remove this when implementing real email service)
  console.log("Email would be sent with data:", formData);
  
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Simulate success (remove this when implementing real email service)
  return Promise.resolve();
}

// Option 2: Using a custom backend API
export async function sendEmailViaBackend(formData: ContactFormData): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }

  return response.json();
}

// Option 3: Using Formspree (Simplest option - no backend needed)
// Sign up at https://formspree.io/ and get your form endpoint
export async function sendEmailViaFormspree(formData: ContactFormData): Promise<void> {
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/your_form_id"; // Replace with your Formspree endpoint

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }
}

// Instructions for setting up email service:
/*
OPTION 1 - EmailJS (Recommended):
1. Sign up at https://www.emailjs.com/
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Replace the placeholders above with your credentials
6. Uncomment the fetch code in sendContactEmail function

OPTION 2 - Formspree (Easiest):
1. Sign up at https://formspree.io/
2. Create a new form
3. Get your form endpoint URL
4. Replace FORMSPREE_ENDPOINT with your URL
5. Use sendEmailViaFormspree instead of sendContactEmail in Contact.tsx

OPTION 3 - Custom Backend:
1. Create a Node.js/Express backend
2. Use nodemailer to send emails
3. Deploy backend to Vercel, Railway, or Heroku
4. Update the fetch URL in sendEmailViaBackend
5. Use sendEmailViaBackend instead of sendContactEmail in Contact.tsx
*/

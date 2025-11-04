// Email utility functions for contact form
import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// EmailJS Configuration
// Get credentials from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

// Initialize EmailJS with public key
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Main function to send contact form emails
export async function sendContactEmail(formData: ContactFormData): Promise<void> {
  try {
    // Check if EmailJS credentials are configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn("EmailJS credentials not configured. Please set up your credentials.");
      console.log("Form data that would be sent:", formData);
      throw new Error("Email service not configured. Please contact the administrator.");
    }

    console.log("Sending email with credentials:", {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      publicKey: EMAILJS_PUBLIC_KEY ? "configured" : "missing"
    });

    // Send email using EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: "Sahaswari Senanayaka", // Your name
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log("Email sent successfully:", response);
    return Promise.resolve();
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    
    // Provide more specific error messages
    const emailError = error as { text?: string; status?: number };
    
    if (emailError.text) {
      throw new Error(`Email failed: ${emailError.text}`);
    } else if (emailError.status) {
      throw new Error(`Email service error (${emailError.status}). Please check your EmailJS configuration.`);
    } else {
      throw new Error("Failed to send email. Please try again or contact me directly.");
    }
  }
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

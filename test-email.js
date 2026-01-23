/**
 * Test script to verify email delivery to info@leapcrest.in
 * 
 * Usage:
 * 1. Make sure RESEND_API_KEY is set in your .env.local file
 * 2. Run: node test-email.js
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY not found in environment variables");
  console.log("\nPlease set RESEND_API_KEY in your .env.local file:");
  console.log("RESEND_API_KEY=re_xxxxxxxxxxxxx");
  process.exit(1);
}

const testData = {
  name: "Test User",
  institutionName: "Test Institution",
  email: "test@example.com",
  phoneNumber: "+91-123-456-7890",
};

async function testEmailDelivery() {
  console.log("🧪 Testing email delivery to info@leapcrest.in...\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Leapcrest Contact Form <onboarding@resend.dev>",
        to: "info@leapcrest.in",
        subject: "Test Email - Contact Form Verification",
        html: `
          <h2>Test Email from Contact Form</h2>
          <p><strong>Name:</strong> ${testData.name}</p>
          <p><strong>Institution:</strong> ${testData.institutionName}</p>
          <p><strong>Email:</strong> ${testData.email}</p>
          <p><strong>Phone:</strong> ${testData.phoneNumber}</p>
          <hr>
          <p><small>This is a test email to verify the contact form is working correctly.</small></p>
        `,
        text: `
Test Email from Contact Form

Name: ${testData.name}
Institution: ${testData.institutionName}
Email: ${testData.email}
Phone: ${testData.phoneNumber}

This is a test email to verify the contact form is working correctly.
        `,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("✅ Email sent successfully!");
      console.log("📧 Email ID:", result.id);
      console.log("\nPlease check info@leapcrest.in inbox for the test email.");
      console.log("Note: It may take a few minutes to arrive.");
    } else {
      const error = await response.json().catch(() => ({ message: await response.text() }));
      console.error("❌ Failed to send email");
      console.error("Status:", response.status);
      console.error("Error:", error);
      
      if (response.status === 401) {
        console.log("\n💡 Tip: Your RESEND_API_KEY may be invalid. Check your Resend dashboard.");
      } else if (response.status === 422) {
        console.log("\n💡 Tip: The 'from' email address may not be verified in Resend.");
        console.log("   You may need to verify your domain or use a verified email address.");
      }
    }
  } catch (error) {
    console.error("❌ Error testing email:", error.message);
  }
}

testEmailDelivery();

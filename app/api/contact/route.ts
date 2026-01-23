import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    // Parse request body with error handling
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Invalid JSON in request:", parseError);
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    // Validate form data
    let validatedData;
    try {
      validatedData = contactFormSchema.parse(body);
    } catch (validationError) {
      console.error("Validation error:", validationError);
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 }
      );
    }

    // Email configuration
    const emailData = {
      to: "info@leapcrest.in",
      subject: "New Contact Form Submission - Leapcrest",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Institution:</strong> ${validatedData.institutionName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phoneNumber}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `,
      text: `
New Contact Form Submission

Name: ${validatedData.name}
Institution: ${validatedData.institutionName}
Email: ${validatedData.email}
Phone: ${validatedData.phoneNumber}

Submitted at: ${new Date().toLocaleString()}
      `,
    };

    // Attempt to send email using Resend API
    const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
    const FROM_EMAIL = process.env.FROM_EMAIL || "Leapcrest Contact Form <onboarding@resend.dev>";
    
    let emailSent = false;
    let emailError: string | null = null;
    
    if (RESEND_API_KEY) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: emailData.to,
            subject: emailData.subject,
            html: emailData.html,
            text: emailData.text,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const result = await response.json();
          emailSent = true;
          console.log("Email sent successfully:", result);
        } else {
          // Read raw text once to avoid consuming stream twice
          let rawText = "";
          try {
            rawText = await response.text();
          } catch (textError) {
            rawText = "";
          }

          // Try to parse as JSON, fallback to raw text or status
          let errorMessage = `HTTP ${response.status}`;
          if (rawText) {
            try {
              const errorData = JSON.parse(rawText);
              errorMessage = errorData.message || errorData.error || rawText;
            } catch (parseError) {
              // Not valid JSON, use raw text
              errorMessage = rawText;
            }
          }

          emailError = errorMessage;
          console.error("Resend API error:", response.status, errorMessage);
        }
      } catch (err) {
        // Log email error but don't fail the request
        emailError = err instanceof Error ? err.message : "Unknown error";
        console.error("Email sending error (non-fatal):", err);
      }
    } else {
      // Log in development/staging
      console.warn("RESEND_API_KEY not configured. Email would be sent to:", emailData.to);
      console.log("Email data:", emailData);
      emailError = "RESEND_API_KEY not configured";
    }

    // Return success with email status for debugging
    return NextResponse.json(
      { 
        message: "Form submitted successfully",
        emailSent,
        ...(emailError && { emailError: "Email delivery may have failed. Please check server logs." })
      },
      { status: 200 }
    );
  } catch (error) {
    // Catch-all for any unexpected errors
    console.error("Unexpected contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}

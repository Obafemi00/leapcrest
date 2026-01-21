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

    // Attempt to send email (non-blocking - don't fail the request if email fails)
    const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
    
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
            from: "Leapcrest Contact Form <onboarding@resend.dev>",
            to: emailData.to,
            subject: emailData.subject,
            html: emailData.html,
            text: emailData.text,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error");
          console.error("Resend API error:", response.status, errorText);
          // Continue - don't fail the request
        }
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error("Email sending error (non-fatal):", emailError);
      }
    } else {
      // Log in development/staging
      console.log("Email would be sent to:", emailData.to);
      console.log("Email data:", emailData);
    }

    // Always return success - form submission is recorded even if email fails
    return NextResponse.json(
      { message: "Form submitted successfully" },
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

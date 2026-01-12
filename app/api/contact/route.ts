import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

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

    // Send email using Resend API or similar service
    // For now, we'll use a simple fetch to a service like Resend
    // In production, configure RESEND_API_KEY in environment variables
    
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (RESEND_API_KEY) {
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
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }
    } else {
      // Fallback: Log to console in development
      console.log("Email would be sent to:", emailData.to);
      console.log("Email data:", emailData);
    }

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}

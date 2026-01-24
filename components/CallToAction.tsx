"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";

export default function CallToAction() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <section
      id="cta"
      className="py-20 px-6 lg:px-8"
      style={{ backgroundColor: "#061423" }}
    >
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Let&apos;s Get Started
        </h2>
        <p className="text-lg text-gray-300 mb-10 leading-relaxed">
          Start a conversation today. Bring CAP<sup>©</sup> to your institution and transform your placement outcomes!
        </p>

        {isSubmitted ? (
          <div className="border border-primary/30 bg-white/10 p-8 text-center">
            <p className="text-lg font-medium text-white">
              Thank you. We will be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-2"
              >
                Name <span className="text-primary">*</span>
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-600 rounded bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="Your full name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="institutionName"
                className="block text-sm font-medium text-white mb-2"
              >
                Institution Name <span className="text-primary">*</span>
              </label>
              <input
                {...register("institutionName")}
                type="text"
                id="institutionName"
                className="w-full px-4 py-3 border border-gray-600 rounded bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="Your institution name"
                aria-invalid={errors.institutionName ? "true" : "false"}
                aria-describedby={
                  errors.institutionName ? "institution-error" : undefined
                }
              />
              {errors.institutionName && (
                <p
                  id="institution-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.institutionName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-white mb-2"
              >
                Phone Number <span className="text-primary">*</span>
              </label>
              <input
                {...register("phoneNumber")}
                type="tel"
                id="phoneNumber"
                className="w-full px-4 py-3 border border-gray-600 rounded bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="+91-96547-65538"
                aria-invalid={errors.phoneNumber ? "true" : "false"}
                aria-describedby={
                  errors.phoneNumber ? "phone-error" : undefined
                }
              />
              {errors.phoneNumber && (
                <p
                  id="phone-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-600 rounded bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="your.email@institution.edu"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-primary text-white font-medium rounded transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Submit contact form"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

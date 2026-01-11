"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    reset();
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      id="cta"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-background/60 backdrop-blur-sm border border-primary/20 rounded-lg p-8 md:p-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            Let&apos;s Get Started
          </h2>
          <p className="text-lg text-gray-300 mb-8 text-center">
            Start a conversation with us. We&apos;ll reach out to discuss how CAP
            <sup>©</sup> can transform your placement outcomes.
          </p>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-primary/20 border border-primary rounded-lg p-6 text-center"
              >
                <div className="text-4xl mb-4">✓</div>
                <p className="text-xl font-semibold text-white">
                  Thank you. We will be in touch shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-background-dark border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Your full name"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1 text-sm text-red-400"
                      role="alert"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="institutionName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Institution Name <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register("institutionName")}
                    type="text"
                    id="institutionName"
                    className="w-full px-4 py-3 bg-background-dark border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Your institution name"
                    aria-invalid={errors.institutionName ? "true" : "false"}
                    aria-describedby={
                      errors.institutionName ? "institution-error" : undefined
                    }
                  />
                  {errors.institutionName && (
                    <p
                      id="institution-error"
                      className="mt-1 text-sm text-red-400"
                      role="alert"
                    >
                      {errors.institutionName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Phone Number <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register("phoneNumber")}
                    type="tel"
                    id="phoneNumber"
                    className="w-full px-4 py-3 bg-background-dark border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="+91 1234567890"
                    aria-invalid={errors.phoneNumber ? "true" : "false"}
                    aria-describedby={
                      errors.phoneNumber ? "phone-error" : undefined
                    }
                  />
                  {errors.phoneNumber && (
                    <p
                      id="phone-error"
                      className="mt-1 text-sm text-red-400"
                      role="alert"
                    >
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-background-dark border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="your.email@institution.edu"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-sm text-red-400"
                      role="alert"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary hover:bg-primary-dark text-background-dark font-bold text-lg rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-primary/30"
                  aria-label="Submit contact form"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}

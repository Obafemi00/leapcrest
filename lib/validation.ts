import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  institutionName: z
    .string()
    .min(2, "Institution name must be at least 2 characters")
    .max(200, "Institution name must be less than 200 characters"),
  phoneNumber: z
    .string()
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

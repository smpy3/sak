/* Shared contact types + validation so client and server stay consistent. */
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  company: z.string().optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional().or(z.literal("")),
  interest: z.enum(["Diamonds", "Light Brown Diamonds", "AI Solutions"]),
  message: z.string().min(10, "Please add a short message (10+ chars)."),
  // Honeypot field: should be empty when a human submits.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactPayload = z.infer<typeof contactSchema>;

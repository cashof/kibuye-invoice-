import { z } from "zod";

export const usertypeSchema = z.object({
  usertype: z.enum(["client", "employee", "admin"]),
});

export const userDataSchema = z.object({
  name: z.string().min(2, "Name is required"),
  image: z.string().url("Please provide a valid image URL"),
  email: z.email("Please enter a valid email"),
});

export const onboardingcompanySchema = z.object({
  name: z.string().min(2, "Company name is required."),

  description: z
    .string()
    .min(50, "Description should be at least 50 characters.")
    .max(150, "Description should not exceed 150 characters."),

  logo: z
    .string()
    .url("Please enter a valid URL.")
    .optional()
    .or(z.literal("")),

  location: z.string().min(2, "Location is required."),

  POBox: z.string().min(1, "P.O. Box is required."),

  telephoneNumber: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .regex(/^\+?[\d\s\-()]+$/, "Phone number contains invalid characters."),
});

export const invoiceItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  price: z.number().min(0.01, "Price must be greater than 0"),
});

export const invoiceSchema = z.object({
  invoiceNumber: z.coerce.number().int().positive("Invoice number is required"),
  invoiceDescription: z.string().max(100).optional(),
  due_date: z.string().min(1, "Due date is required"),
  status: z.enum(["draft", "sent", "paid", "cancelled"]).default("draft"),
  items: z.array(invoiceItemSchema).min(1, "Add at least one item"),
  totalAmount: z.number().optional(),
});

export type InvoiceItemType = z.infer<typeof invoiceItemSchema>;
export type invoiceType = z.infer<typeof invoiceSchema>;
export type onboardingcompanyType = z.infer<typeof onboardingcompanySchema>;
export type userDataType = z.infer<typeof userDataSchema>;
export type UserTypeType = z.infer<typeof usertypeSchema>;

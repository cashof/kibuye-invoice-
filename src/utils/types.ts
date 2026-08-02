import { email, z } from "zod";

export const usertypeSchema = z.object({
  usertype: z.enum(["client", "employee", "admin"]),
});

export const invoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unit_price: z.coerce.number().min(0.01, "Price must be greater than 0"),
});

export const invoiceSchema = z.object({
  client_name: z.string().min(1, "Client name is required"),
  client_email: z.string().email("Invalid email address"),
  due_date: z.string().min(1, "Due date is required"),
  items: z.array(invoiceItemSchema).min(1, "Add at least one item"),
});

export const userDataSchema = z.object({
  name: z.string(),
  image: z.string(),
  email: z.string(),
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

export type onboardingcompanyType = z.infer<typeof onboardingcompanySchema>;
export type userDataType = z.infer<typeof userDataSchema>;
export type InvoiceType = z.infer<typeof invoiceSchema>;
export type InvoiceItemType = z.infer<typeof invoiceItemSchema>;
export type UserTypeType = z.infer<typeof usertypeSchema>;

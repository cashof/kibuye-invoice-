import {  z } from "zod";




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

export type InvoiceType = z.infer<typeof invoiceSchema>;
export type InvoiceItemType = z.infer<typeof invoiceItemSchema>;
export type UserTypeType =  z.infer<typeof usertypeSchema>

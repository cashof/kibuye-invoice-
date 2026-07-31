// "use server";

// import { db } from "@/lib/db";
// import { invoice, invoiceItem } from "@/db/schema";
// import { InvoiceType } from "@/utils/types";

// export async function createInvoice(data: InvoiceType) {
//   try {
//     // 1. Insert the invoice first and get back its id
//     const [newInvoice] = await db
//       .insert(invoice)
//       .values({
//         client_name: data.client_name,
//         client_email: data.client_email,
//         due_date: new Date(data.due_date),
//       })
//       .returning({ id: invoice.id });

//     // 2. Insert all items linked to that invoice id
//     await db.insert(invoiceItem).values(
//       data.items.map((item) => ({
//         invoice_id: newInvoice.id,
//         description: item.description,
//         quantity: item.quantity,
//         unit_price: String(item.unit_price),
//       })),
//     );

//     return { success: true, invoiceId: newInvoice.id };
//   } catch (err) {
//     console.error("Failed to create invoice:", err);
//     return { error: "Something went wrong. Please try again." };
//   }
// }

import { relations } from "drizzle-orm/_relations";
import {
  pgTable,
  text,
  integer,
  numeric,
  timestamp,
  pgEnum,
  index,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { user } from "./auth-schema";

// ================= ENUMS =================

export const userTypeEnum = pgEnum("user_type", [
  "client",
  "employee",
  "admin",
]);

export const invoiceStatusEnum = pgEnum("invoice_status", [
  "draft",
  "sent",
  "paid",
  "cancelled",
]);
// ================= USER TYPE =================

export const userType = pgTable(
  "user_types",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    usertype: userTypeEnum().notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("user_types_user_id_idx").on(table.userId)],
);

// ================= COMPANIES =================

export const companies = pgTable(
  "companies",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),

    logo: text("logo"),

    location: text("location"),

    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("companies_ownerId_idx").on(table.ownerId)],
);

// ================= PRODUCTS =================

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    companyId: uuid("company_id")
      .notNull()
      .references(() => companies.id, {
        onDelete: "cascade",
      }),

    name: text("name").notNull(),

    description: text("description"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("products_companyId_idx").on(table.companyId)],
);

// ================= INVOICES =================

export const invoice = pgTable(
  "invoices",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    companyId: uuid("company_id")
      .notNull()
      .references(() => companies.id, {
        onDelete: "cascade",
      }),

    createdBy: text("created_by")
      .notNull()
      .references(() => user.id, {
        onDelete: "restrict",
      }),

    clientId: text("client_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "restrict",
      }),

    status: invoiceStatusEnum().default("draft").notNull(),

    totalAmount: numeric("total_amount", {
      precision: 12,
      scale: 2,
    })
      .default("0")
      .notNull(),

    dueDate: timestamp("due_date"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("invoice_companyId_idx").on(table.companyId),
    index("invoice_createdBy_idx").on(table.createdBy),
    index("invoice_clientId_idx").on(table.clientId),
  ],
);

// ================= INVOICE ITEMS =================

export const invoiceItem = pgTable(
  "invoice_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    invoiceId: uuid("invoice_id")
      .notNull()
      .references(() => invoice.id, {
        onDelete: "cascade",
      }),

    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "restrict",
      }),

    description: text("description").notNull(),

    quantity: integer("quantity").default(1).notNull(),

    unitPrice: numeric("unit_price", {
      precision: 12,
      scale: 2,
    }).notNull(),
  },
  (table) => [
    index("invoice_item_invoiceId_idx").on(table.invoiceId),
    index("invoice_item_productId_idx").on(table.productId),
  ],
);
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
  primaryKey,
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

// ================= USER ON COMPANY (JOIN TABLE) =================

export const userType = pgTable(
  "user_types",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    companyId: uuid("company_id")
      .notNull()
      .references(() => companies.id, {
        onDelete: "cascade",
      }),

    usertype: userTypeEnum().notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.companyId] }),
    index("user_types_user_id_idx").on(table.userId),
    index("user_types_company_id_idx").on(table.companyId),
  ],
);

// ================= COMPANIES =================

export const companies = pgTable(
  "companies",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),
    description: text("descirption"),

    logo: text("logo"),
    location: text("location"),
    POBox: text("p.o.box"),
    telephoneNumber: text("telephone").notNull(),
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

// ================= DRIZZLE RELATIONS =================

export const companiesRelations = relations(companies, ({ many, one }) => ({
  users: many(userType),
  products: many(products),
  invoices: many(invoice),
  owner: one(user, {
    fields: [companies.ownerId],
    references: [user.id],
  }),
}));

export const userTypeRelations = relations(userType, ({ one }) => ({
  user: one(user, {
    fields: [userType.userId],
    references: [user.id],
  }),
  company: one(companies, {
    fields: [userType.companyId],
    references: [companies.id],
  }),
}));

export const productRelations = relations(products, ({ one }) => ({
  company: one(companies, {
    fields: [products.companyId],
    references: [companies.id],
  }),
}));

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
  company: one(companies, {
    fields: [invoice.companyId],
    references: [companies.id],
  }),
  creator: one(user, {
    fields: [invoice.createdBy],
    references: [user.id],
  }),
  client: one(user, {
    fields: [invoice.clientId],
    references: [user.id],
  }),
  items: many(invoiceItem),
}));

export const invoiceItemRelations = relations(invoiceItem, ({ one }) => ({
  invoice: one(invoice, {
    fields: [invoiceItem.invoiceId],
    references: [invoice.id],
  }),
  product: one(products, {
    fields: [invoiceItem.productId],
    references: [products.id],
  }),
}));

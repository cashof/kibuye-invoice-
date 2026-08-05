import { relations } from "drizzle-orm/_relations";
import {
  pgTable,
  text,
  integer,
  numeric,
  timestamp,
  pgEnum,
  index,
  uuid,
  primaryKey,
  unique,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

//  ENUMS
export const userTypeEnum = pgEnum("user_type", ["employee", "admin"]);

export const invoiceStatusEnum = pgEnum("invoice_status", [
  "draft",
  "sent",
  "paid",
  "cancelled",
]);

//  USER TYPE (role of a user in the system — NOT tied to a company)
export const userType = pgTable(
  "user_types",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    usertype: userTypeEnum().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId] }),
    index("user_types_user_id_idx").on(table.userId),
  ],
);
export const clients = pgTable(
  "clients",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    address: text("address"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("clients_company_idx").on(table.companyId)],
);

//  COMPANY (belongs to exactly one user — the admin/owner)
export const company = pgTable(
  "company",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    logo: text("logo"),
    location: text("location"),
    POBox: text("p.o.box"),
    telephoneNumber: text("telephone").notNull(),
    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    // Enforces "one user -> one company"
    unique("company_owner_id_unique").on(table.ownerId),
    index("company_owner_id_idx").on(table.ownerId),
  ],
);

//  PRODUCTS
export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
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

//  INVOICES
export const invoice = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => company.id, {
      onDelete: "cascade",
    }),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id, {
      onDelete: "restrict",
    }),
  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id, {
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
  invoiceNumber: integer("invoice_number").notNull(),
  invoiceDescription: text("invoice_description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

//  INVOICE ITEMS
export const invoiceItem = pgTable("invoice_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  invoiceId: uuid("invoice_id")
    .notNull()
    .references(() => invoice.id, {
      onDelete: "cascade",
    }),
  productId: uuid("product_id").references(() => products.id, {
    onDelete: "set null",
  }),
  description: text("description").notNull(),
  quantity: integer("quantity").default(1).notNull(),
  unitPrice: numeric("unit_price", {
    precision: 12,
    scale: 2,
  }).notNull(),
});

//  DRIZZLE RELATIONS
export const companyRelations = relations(company, ({ one, many }) => ({
  owner: one(user, {
    fields: [company.ownerId],
    references: [user.id],
  }),

  clients: many(clients),

  products: many(products),

  invoices: many(invoice),
}));
export const userTypeRelations = relations(userType, ({ one }) => ({
  user: one(user, { fields: [userType.userId], references: [user.id] }),
}));

export const productRelations = relations(products, ({ one }) => ({
  company: one(company, {
    fields: [products.companyId],
    references: [company.id],
  }),
}));

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
  company: one(company, {
    fields: [invoice.companyId],
    references: [company.id],
  }),

  creator: one(user, {
    fields: [invoice.createdBy],
    references: [user.id],
  }),

  client: one(clients, {
    fields: [invoice.clientId],
    references: [clients.id],
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

export const clientRelations = relations(clients, ({ one, many }) => ({
  company: one(company, {
    fields: [clients.companyId],
    references: [company.id],
  }),

  invoices: many(invoice),
}));
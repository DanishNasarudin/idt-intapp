import { sql } from "drizzle-orm";
import {
  datetime,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";

export const prismaMigrations = mysqlTable(
  "_prisma_migrations",
  {
    id: varchar({ length: 36 }).notNull(),
    checksum: varchar({ length: 64 }).notNull(),
    finishedAt: datetime("finished_at", { mode: "string", fsp: 3 }),
    migrationName: varchar("migration_name", { length: 255 }).notNull(),
    logs: text(),
    rolledBackAt: datetime("rolled_back_at", { mode: "string", fsp: 3 }),
    startedAt: datetime("started_at", { mode: "string", fsp: 3 })
      .default(sql`(CURRENT_TIMESTAMP(3))`)
      .notNull(),
    appliedStepsCount: int("applied_steps_count", { unsigned: true })
      .default(0)
      .notNull(),
  },
  (table) => {
    return {
      prismaMigrationsId: primaryKey({
        columns: [table.id],
        name: "_prisma_migrations_id",
      }),
    };
  }
);

export const apLocal = mysqlTable(
  "ap_local",
  {
    serviceNo: varchar("service_no", { length: 255 }).notNull(),
    date: varchar({ length: 255 }),
    pic: varchar({ length: 20 }),
    name: varchar({ length: 100 }),
    contact: varchar({ length: 40 }),
    status: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    address: text(),
    purchaseDate: varchar("purchase_date", { length: 255 }),
    invoice: varchar({ length: 255 }),
    receivedItems: varchar("received_items", { length: 250 }),
    pin: text(),
    issues: text(),
    solutions: text(),
    statusDesc: text("status_desc"),
    remarks: text(),
    cost: int().default(0),
    locker: int(),
    receivedBy: varchar("received_by", { length: 20 }),
    idtPc: varchar("idt_pc", { length: 10 }),
  },
  (table) => {
    return {
      contactIdx: index("contact_idx").on(table.contact),
      emailIdx: index("email_idx").on(table.email),
      nameIdx: index("name_idx").on(table.name),
      receivedItemsIdx: index("received_items_idx").on(table.receivedItems),
      apLocalServiceNo: primaryKey({
        columns: [table.serviceNo],
        name: "ap_local_service_no",
      }),
    };
  }
);

export const apLocalHistory = mysqlTable(
  "ap_local_history",
  {
    historyId: int("history_id").autoincrement().notNull(),
    serviceNo: varchar("service_no", { length: 255 }),
    date: varchar({ length: 255 }),
    pic: varchar({ length: 20 }),
    name: text(),
    contact: text(),
    status: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    address: text(),
    purchaseDate: varchar("purchase_date", { length: 255 }),
    invoice: varchar({ length: 255 }),
    receivedItems: varchar("received_items", { length: 250 }),
    pin: text(),
    issues: text(),
    solutions: text(),
    statusDesc: text("status_desc"),
    remarks: text(),
    cost: int().default(0),
    locker: int(),
    receivedBy: varchar("received_by", { length: 20 }),
    idtPc: varchar("idt_pc", { length: 10 }),
    changeType: mysqlEnum("change_type", [
      "INSERT",
      "UPDATE",
      "DELETE",
    ]).notNull(),
    changeTimestamp: datetime("change_timestamp", { mode: "string" }).default(
      sql`(CURRENT_TIMESTAMP)`
    ),
  },
  (table) => {
    return {
      apLocalHistoryHistoryId: primaryKey({
        columns: [table.historyId],
        name: "ap_local_history_history_id",
      }),
    };
  }
);

export const apOther = mysqlTable(
  "ap_other",
  {
    serviceNo: varchar("service_no", { length: 255 }).notNull(),
    date: varchar({ length: 255 }),
    pic: varchar({ length: 20 }),
    name: varchar({ length: 100 }),
    contact: varchar({ length: 40 }),
    status: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    address: text(),
    purchaseDate: varchar("purchase_date", { length: 255 }),
    invoice: varchar({ length: 255 }),
    receivedItems: varchar("received_items", { length: 250 }),
    pin: text(),
    issues: text(),
    solutions: text(),
    statusDesc: text("status_desc"),
    remarks: text(),
    cost: int().default(0),
    locker: int(),
    receivedBy: varchar("received_by", { length: 20 }),
    idtPc: varchar("idt_pc", { length: 10 }),
  },
  (table) => {
    return {
      contactIdx: index("contact_idx").on(table.contact),
      emailIdx: index("email_idx").on(table.email),
      nameIdx: index("name_idx").on(table.name),
      receivedItemsIdx: index("received_items_idx").on(table.receivedItems),
      apOtherServiceNo: primaryKey({
        columns: [table.serviceNo],
        name: "ap_other_service_no",
      }),
    };
  }
);

export const authUsers = mysqlTable(
  "auth_users",
  {
    id: int().autoincrement().notNull(),
    email: varchar({ length: 255 }),
    roles: varchar({ length: 10 }).default("Normal"),
  },
  (table) => {
    return {
      authUsersId: primaryKey({ columns: [table.id], name: "auth_users_id" }),
      email: unique("email").on(table.email),
    };
  }
);

export const jbLocal = mysqlTable(
  "jb_local",
  {
    serviceNo: varchar("service_no", { length: 255 }).notNull(),
    date: varchar({ length: 255 }),
    pic: varchar({ length: 20 }),
    name: varchar({ length: 100 }),
    contact: varchar({ length: 40 }),
    status: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    address: text(),
    purchaseDate: varchar("purchase_date", { length: 255 }),
    invoice: varchar({ length: 255 }),
    receivedItems: varchar("received_items", { length: 250 }),
    pin: text(),
    issues: text(),
    solutions: text(),
    statusDesc: text("status_desc"),
    remarks: text(),
    cost: int().default(0),
    locker: int(),
    receivedBy: varchar("received_by", { length: 20 }),
    idtPc: varchar("idt_pc", { length: 10 }),
  },
  (table) => {
    return {
      contactIdx: index("contact_idx").on(table.contact),
      emailIdx: index("email_idx").on(table.email),
      nameIdx: index("name_idx").on(table.name),
      receivedItemsIdx: index("received_items_idx").on(table.receivedItems),
      jbLocalServiceNo: primaryKey({
        columns: [table.serviceNo],
        name: "jb_local_service_no",
      }),
    };
  }
);

export const jbLocalHistory = mysqlTable(
  "jb_local_history",
  {
    historyId: int("history_id").autoincrement().notNull(),
    serviceNo: varchar("service_no", { length: 255 }),
    date: varchar({ length: 255 }),
    pic: varchar({ length: 20 }),
    name: text(),
    contact: text(),
    status: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    address: text(),
    purchaseDate: varchar("purchase_date", { length: 255 }),
    invoice: varchar({ length: 255 }),
    receivedItems: varchar("received_items", { length: 250 }),
    pin: text(),
    issues: text(),
    solutions: text(),
    statusDesc: text("status_desc"),
    remarks: text(),
    cost: int().default(0),
    locker: int(),
    receivedBy: varchar("received_by", { length: 20 }),
    idtPc: varchar("idt_pc", { length: 10 }),
    changeType: mysqlEnum("change_type", [
      "INSERT",
      "UPDATE",
      "DELETE",
    ]).notNull(),
    changeTimestamp: datetime("change_timestamp", { mode: "string" }).default(
      sql`(CURRENT_TIMESTAMP)`
    ),
  },
  (table) => {
    return {
      jbLocalHistoryHistoryId: primaryKey({
        columns: [table.historyId],
        name: "jb_local_history_history_id",
      }),
    };
  }
);

export const jbOther = mysqlTable(
  "jb_other",
  {
    serviceNo: varchar("service_no", { length: 255 }).notNull(),
    date: varchar({ length: 255 }),
    pic: varchar({ length: 20 }),
    name: varchar({ length: 100 }),
    contact: varchar({ length: 40 }),
    status: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    address: text(),
    purchaseDate: varchar("purchase_date", { length: 255 }),
    invoice: varchar({ length: 255 }),
    receivedItems: varchar("received_items", { length: 250 }),
    pin: text(),
    issues: text(),
    solutions: text(),
    statusDesc: text("status_desc"),
    remarks: text(),
    cost: int().default(0),
    locker: int(),
    receivedBy: varchar("received_by", { length: 20 }),
    idtPc: varchar("idt_pc", { length: 10 }),
  },
  (table) => {
    return {
      contactIdx: index("contact_idx").on(table.contact),
      emailIdx: index("email_idx").on(table.email),
      nameIdx: index("name_idx").on(table.name),
      receivedItemsIdx: index("received_items_idx").on(table.receivedItems),
      jbOtherServiceNo: primaryKey({
        columns: [table.serviceNo],
        name: "jb_other_service_no",
      }),
    };
  }
);

export const s2Local = mysqlTable(
  "s2_local",
  {
    serviceNo: varchar("service_no", { length: 255 }).notNull(),
    date: varchar({ length: 255 }),
    pic: varchar({ length: 20 }),
    name: varchar({ length: 100 }),
    contact: varchar({ length: 40 }),
    status: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    address: text(),
    purchaseDate: varchar("purchase_date", { length: 255 }),
    invoice: varchar({ length: 255 }),
    receivedItems: varchar("received_items", { length: 250 }),
    pin: text(),
    issues: text(),
    solutions: text(),
    statusDesc: text("status_desc"),
    remarks: text(),
    cost: int().default(0),
    locker: int(),
    receivedBy: varchar("received_by", { length: 20 }),
    idtPc: varchar("idt_pc", { length: 10 }),
  },
  (table) => {
    return {
      contactIdx: index("contact_idx").on(table.contact),
      emailIdx: index("email_idx").on(table.email),
      nameIdx: index("name_idx").on(table.name),
      receivedItemsIdx: index("received_items_idx").on(table.receivedItems),
      s2LocalServiceNo: primaryKey({
        columns: [table.serviceNo],
        name: "s2_local_service_no",
      }),
    };
  }
);

export const s2LocalHistory = mysqlTable(
  "s2_local_history",
  {
    historyId: int("history_id").autoincrement().notNull(),
    serviceNo: varchar("service_no", { length: 255 }),
    date: varchar({ length: 255 }),
    pic: varchar({ length: 20 }),
    name: text(),
    contact: text(),
    status: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    address: text(),
    purchaseDate: varchar("purchase_date", { length: 255 }),
    invoice: varchar({ length: 255 }),
    receivedItems: varchar("received_items", { length: 250 }),
    pin: text(),
    issues: text(),
    solutions: text(),
    statusDesc: text("status_desc"),
    remarks: text(),
    cost: int().default(0),
    locker: int(),
    receivedBy: varchar("received_by", { length: 20 }),
    idtPc: varchar("idt_pc", { length: 10 }),
    changeType: mysqlEnum("change_type", [
      "INSERT",
      "UPDATE",
      "DELETE",
    ]).notNull(),
    changeTimestamp: datetime("change_timestamp", { mode: "string" }).default(
      sql`(CURRENT_TIMESTAMP)`
    ),
  },
  (table) => {
    return {
      s2LocalHistoryHistoryId: primaryKey({
        columns: [table.historyId],
        name: "s2_local_history_history_id",
      }),
    };
  }
);

export const s2Other = mysqlTable(
  "s2_other",
  {
    serviceNo: varchar("service_no", { length: 255 }).notNull(),
    date: varchar({ length: 255 }),
    pic: varchar({ length: 20 }),
    name: varchar({ length: 100 }),
    contact: varchar({ length: 40 }),
    status: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    address: text(),
    purchaseDate: varchar("purchase_date", { length: 255 }),
    invoice: varchar({ length: 255 }),
    receivedItems: varchar("received_items", { length: 250 }),
    pin: text(),
    issues: text(),
    solutions: text(),
    statusDesc: text("status_desc"),
    remarks: text(),
    cost: int().default(0),
    locker: int(),
    receivedBy: varchar("received_by", { length: 20 }),
    idtPc: varchar("idt_pc", { length: 10 }),
  },
  (table) => {
    return {
      contactIdx: index("contact_idx").on(table.contact),
      emailIdx: index("email_idx").on(table.email),
      nameIdx: index("name_idx").on(table.name),
      receivedItemsIdx: index("received_items_idx").on(table.receivedItems),
      s2OtherServiceNo: primaryKey({
        columns: [table.serviceNo],
        name: "s2_other_service_no",
      }),
    };
  }
);

export const saLocal = mysqlTable(
  "sa_local",
  {
    serviceNo: varchar("service_no", { length: 255 }).notNull(),
    date: varchar({ length: 255 }),
    pic: varchar({ length: 20 }),
    name: varchar({ length: 100 }),
    contact: varchar({ length: 40 }),
    status: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    address: text(),
    purchaseDate: varchar("purchase_date", { length: 255 }),
    invoice: varchar({ length: 255 }),
    receivedItems: varchar("received_items", { length: 250 }),
    pin: text(),
    issues: text(),
    solutions: text(),
    statusDesc: text("status_desc"),
    remarks: text(),
    cost: int().default(0),
    locker: int(),
    receivedBy: varchar("received_by", { length: 20 }),
    idtPc: varchar("idt_pc", { length: 10 }),
  },
  (table) => {
    return {
      contactIdx: index("contact_idx").on(table.contact),
      emailIdx: index("email_idx").on(table.email),
      nameIdx: index("name_idx").on(table.name),
      receivedItemsIdx: index("received_items_idx").on(table.receivedItems),
      saLocalServiceNo: primaryKey({
        columns: [table.serviceNo],
        name: "sa_local_service_no",
      }),
    };
  }
);

export const saLocalHistory = mysqlTable(
  "sa_local_history",
  {
    historyId: int("history_id").autoincrement().notNull(),
    serviceNo: varchar("service_no", { length: 255 }),
    date: varchar({ length: 255 }),
    pic: varchar({ length: 20 }),
    name: text(),
    contact: text(),
    status: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    address: text(),
    purchaseDate: varchar("purchase_date", { length: 255 }),
    invoice: varchar({ length: 255 }),
    receivedItems: varchar("received_items", { length: 250 }),
    pin: text(),
    issues: text(),
    solutions: text(),
    statusDesc: text("status_desc"),
    remarks: text(),
    cost: int().default(0),
    locker: int(),
    receivedBy: varchar("received_by", { length: 20 }),
    idtPc: varchar("idt_pc", { length: 10 }),
    changeType: mysqlEnum("change_type", [
      "INSERT",
      "UPDATE",
      "DELETE",
    ]).notNull(),
    changeTimestamp: datetime("change_timestamp", { mode: "string" }).default(
      sql`(CURRENT_TIMESTAMP)`
    ),
  },
  (table) => {
    return {
      saLocalHistoryHistoryId: primaryKey({
        columns: [table.historyId],
        name: "sa_local_history_history_id",
      }),
    };
  }
);

export const saOther = mysqlTable(
  "sa_other",
  {
    serviceNo: varchar("service_no", { length: 255 }).notNull(),
    date: varchar({ length: 255 }),
    pic: varchar({ length: 20 }),
    name: varchar({ length: 100 }),
    contact: varchar({ length: 40 }),
    status: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    address: text(),
    purchaseDate: varchar("purchase_date", { length: 255 }),
    invoice: varchar({ length: 255 }),
    receivedItems: varchar("received_items", { length: 250 }),
    pin: text(),
    issues: text(),
    solutions: text(),
    statusDesc: text("status_desc"),
    remarks: text(),
    cost: int().default(0),
    locker: int(),
    receivedBy: varchar("received_by", { length: 20 }),
    idtPc: varchar("idt_pc", { length: 10 }),
  },
  (table) => {
    return {
      contactIdx: index("contact_idx").on(table.contact),
      emailIdx: index("email_idx").on(table.email),
      nameIdx: index("name_idx").on(table.name),
      receivedItemsIdx: index("received_items_idx").on(table.receivedItems),
      saOtherServiceNo: primaryKey({
        columns: [table.serviceNo],
        name: "sa_other_service_no",
      }),
    };
  }
);

export const warrantyStaffBranch = mysqlTable(
  "warranty_staff_branch",
  {
    id: int().autoincrement().notNull(),
    name: varchar({ length: 255 }),
    branch: varchar({ length: 255 }),
    color: varchar({ length: 255 }),
  },
  (table) => {
    return {
      warrantyStaffBranchId: primaryKey({
        columns: [table.id],
        name: "warranty_staff_branch_id",
      }),
    };
  }
);

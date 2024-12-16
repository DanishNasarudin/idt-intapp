import { pgTable, index, varchar, text, bigint, bigserial, timestamp, uniqueIndex, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const apLocalHistoryChangeType = pgEnum("ap_local_history_change_type", ['INSERT', 'UPDATE', 'DELETE'])
export const jbLocalHistoryChangeType = pgEnum("jb_local_history_change_type", ['INSERT', 'UPDATE', 'DELETE'])
export const s2LocalHistoryChangeType = pgEnum("s2_local_history_change_type", ['INSERT', 'UPDATE', 'DELETE'])
export const saLocalHistoryChangeType = pgEnum("sa_local_history_change_type", ['INSERT', 'UPDATE', 'DELETE'])


export const apLocal = pgTable("ap_local", {
	serviceNo: varchar("service_no", { length: 10 }).primaryKey().notNull(),
	date: varchar({ length: 255 }),
	pic: varchar({ length: 20 }),
	name: varchar({ length: 100 }),
	contact: varchar({ length: 40 }),
	status: varchar({ length: 255 }),
	email: varchar({ length: 250 }),
	address: text(),
	purchaseDate: varchar("purchase_date", { length: 255 }),
	invoice: varchar({ length: 255 }),
	receivedItems: varchar("received_items", { length: 250 }),
	pin: text(),
	issues: text(),
	solutions: text(),
	statusDesc: text("status_desc"),
	remarks: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locker: bigint({ mode: "number" }).default(sql`'0'`),
	receivedBy: varchar("received_by", { length: 20 }),
	idtPc: varchar("idt_pc", { length: 10 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cost: bigint({ mode: "number" }).default(sql`'0'`),
}, (table) => {
	return {
		idx24609ContactIdx: index("idx_24609_contact_idx").using("btree", table.contact.asc().nullsLast().op("text_ops")),
		idx24609EmailIdx: index("idx_24609_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
		idx24609NameIdx: index("idx_24609_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
		idx24609PicIdx: index("idx_24609_pic_idx").using("btree", table.pic.asc().nullsLast().op("text_ops")),
		idx24609ReceivedItemsIdx: index("idx_24609_received_items_idx").using("btree", table.receivedItems.asc().nullsLast().op("text_ops")),
	}
});

export const apLocalHistory = pgTable("ap_local_history", {
	historyId: bigserial("history_id", { mode: "bigint" }).primaryKey().notNull(),
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
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cost: bigint({ mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locker: bigint({ mode: "number" }),
	receivedBy: varchar("received_by", { length: 20 }),
	idtPc: varchar("idt_pc", { length: 10 }),
	changeType: apLocalHistoryChangeType("change_type").notNull(),
	changeTimestamp: timestamp("change_timestamp", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const apOther = pgTable("ap_other", {
	serviceNo: varchar("service_no", { length: 10 }).primaryKey().notNull(),
	date: varchar({ length: 255 }),
	pic: varchar({ length: 20 }),
	name: varchar({ length: 100 }),
	contact: varchar({ length: 40 }),
	status: varchar({ length: 255 }),
	email: varchar({ length: 250 }),
	address: text(),
	purchaseDate: varchar("purchase_date", { length: 255 }),
	invoice: varchar({ length: 255 }),
	receivedItems: varchar("received_items", { length: 250 }),
	pin: text(),
	issues: text(),
	solutions: text(),
	statusDesc: text("status_desc"),
	remarks: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locker: bigint({ mode: "number" }).default(sql`'0'`),
	receivedBy: varchar("received_by", { length: 20 }),
	idtPc: varchar("idt_pc", { length: 10 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cost: bigint({ mode: "number" }).default(sql`'0'`),
}, (table) => {
	return {
		idx24624ContactIdx: index("idx_24624_contact_idx").using("btree", table.contact.asc().nullsLast().op("text_ops")),
		idx24624EmailIdx: index("idx_24624_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
		idx24624NameIdx: index("idx_24624_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
		idx24624PicIdx: index("idx_24624_pic_idx").using("btree", table.pic.asc().nullsLast().op("text_ops")),
		idx24624ReceivedItemsIdx: index("idx_24624_received_items_idx").using("btree", table.receivedItems.asc().nullsLast().op("text_ops")),
	}
});

export const authUsers = pgTable("auth_users", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	email: varchar({ length: 200 }),
	roles: varchar({ length: 10 }),
}, (table) => {
	return {
		idx24632Email: uniqueIndex("idx_24632_email").using("btree", table.email.asc().nullsLast().op("text_ops")),
	}
});

export const jbLocal = pgTable("jb_local", {
	serviceNo: varchar("service_no", { length: 10 }).primaryKey().notNull(),
	date: varchar({ length: 255 }),
	pic: varchar({ length: 20 }),
	name: varchar({ length: 100 }),
	contact: varchar({ length: 40 }),
	status: varchar({ length: 255 }),
	email: varchar({ length: 250 }),
	address: text(),
	purchaseDate: varchar("purchase_date", { length: 255 }),
	invoice: varchar({ length: 255 }),
	receivedItems: varchar("received_items", { length: 250 }),
	pin: text(),
	issues: text(),
	solutions: text(),
	statusDesc: text("status_desc"),
	remarks: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locker: bigint({ mode: "number" }).default(sql`'0'`),
	receivedBy: varchar("received_by", { length: 20 }),
	idtPc: varchar("idt_pc", { length: 10 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cost: bigint({ mode: "number" }).default(sql`'0'`),
}, (table) => {
	return {
		idx24636ContactIdx: index("idx_24636_contact_idx").using("btree", table.contact.asc().nullsLast().op("text_ops")),
		idx24636EmailIdx: index("idx_24636_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
		idx24636NameIdx: index("idx_24636_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
		idx24636PicIdx: index("idx_24636_pic_idx").using("btree", table.pic.asc().nullsLast().op("text_ops")),
		idx24636ReceivedItemsIdx: index("idx_24636_received_items_idx").using("btree", table.receivedItems.asc().nullsLast().op("text_ops")),
	}
});

export const jbLocalHistory = pgTable("jb_local_history", {
	historyId: bigserial("history_id", { mode: "bigint" }).primaryKey().notNull(),
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
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cost: bigint({ mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locker: bigint({ mode: "number" }),
	receivedBy: varchar("received_by", { length: 20 }),
	idtPc: varchar("idt_pc", { length: 10 }),
	changeType: jbLocalHistoryChangeType("change_type").notNull(),
	changeTimestamp: timestamp("change_timestamp", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const jbOther = pgTable("jb_other", {
	serviceNo: varchar("service_no", { length: 10 }).primaryKey().notNull(),
	date: varchar({ length: 255 }),
	pic: varchar({ length: 20 }),
	name: varchar({ length: 100 }),
	contact: varchar({ length: 40 }),
	status: varchar({ length: 255 }),
	email: varchar({ length: 250 }),
	address: text(),
	purchaseDate: varchar("purchase_date", { length: 255 }),
	invoice: varchar({ length: 255 }),
	receivedItems: varchar("received_items", { length: 250 }),
	pin: text(),
	issues: text(),
	solutions: text(),
	statusDesc: text("status_desc"),
	remarks: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locker: bigint({ mode: "number" }).default(sql`'0'`),
	receivedBy: varchar("received_by", { length: 20 }),
	idtPc: varchar("idt_pc", { length: 10 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cost: bigint({ mode: "number" }).default(sql`'0'`),
}, (table) => {
	return {
		idx24651ContactIdx: index("idx_24651_contact_idx").using("btree", table.contact.asc().nullsLast().op("text_ops")),
		idx24651EmailIdx: index("idx_24651_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
		idx24651NameIdx: index("idx_24651_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
		idx24651PicIdx: index("idx_24651_pic_idx").using("btree", table.pic.asc().nullsLast().op("text_ops")),
		idx24651ReceivedItemsIdx: index("idx_24651_received_items_idx").using("btree", table.receivedItems.asc().nullsLast().op("text_ops")),
	}
});

export const s2Local = pgTable("s2_local", {
	serviceNo: varchar("service_no", { length: 10 }).primaryKey().notNull(),
	date: varchar({ length: 255 }),
	pic: varchar({ length: 20 }),
	name: varchar({ length: 100 }),
	contact: varchar({ length: 40 }),
	status: varchar({ length: 255 }),
	email: varchar({ length: 250 }),
	address: text(),
	purchaseDate: varchar("purchase_date", { length: 255 }),
	invoice: varchar({ length: 255 }),
	receivedItems: varchar("received_items", { length: 250 }),
	pin: text(),
	issues: text(),
	solutions: text(),
	statusDesc: text("status_desc"),
	remarks: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locker: bigint({ mode: "number" }).default(sql`'0'`),
	receivedBy: varchar("received_by", { length: 20 }),
	idtPc: varchar("idt_pc", { length: 10 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cost: bigint({ mode: "number" }).default(sql`'0'`),
}, (table) => {
	return {
		idx24658ContactIdx: index("idx_24658_contact_idx").using("btree", table.contact.asc().nullsLast().op("text_ops")),
		idx24658EmailIdx: index("idx_24658_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
		idx24658NameIdx: index("idx_24658_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
		idx24658PicIdx: index("idx_24658_pic_idx").using("btree", table.pic.asc().nullsLast().op("text_ops")),
		idx24658ReceivedItemsIdx: index("idx_24658_received_items_idx").using("btree", table.receivedItems.asc().nullsLast().op("text_ops")),
	}
});

export const s2LocalHistory = pgTable("s2_local_history", {
	historyId: bigserial("history_id", { mode: "bigint" }).primaryKey().notNull(),
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
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cost: bigint({ mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locker: bigint({ mode: "number" }),
	receivedBy: varchar("received_by", { length: 20 }),
	idtPc: varchar("idt_pc", { length: 10 }),
	changeType: s2LocalHistoryChangeType("change_type").notNull(),
	changeTimestamp: timestamp("change_timestamp", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const s2Other = pgTable("s2_other", {
	serviceNo: varchar("service_no", { length: 10 }).primaryKey().notNull(),
	date: varchar({ length: 255 }),
	pic: varchar({ length: 20 }),
	name: varchar({ length: 100 }),
	contact: varchar({ length: 40 }),
	status: varchar({ length: 255 }),
	email: varchar({ length: 250 }),
	address: text(),
	purchaseDate: varchar("purchase_date", { length: 255 }),
	invoice: varchar({ length: 255 }),
	receivedItems: varchar("received_items", { length: 250 }),
	pin: text(),
	issues: text(),
	solutions: text(),
	statusDesc: text("status_desc"),
	remarks: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locker: bigint({ mode: "number" }).default(sql`'0'`),
	receivedBy: varchar("received_by", { length: 20 }),
	idtPc: varchar("idt_pc", { length: 10 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cost: bigint({ mode: "number" }).default(sql`'0'`),
}, (table) => {
	return {
		idx24673ContactIdx: index("idx_24673_contact_idx").using("btree", table.contact.asc().nullsLast().op("text_ops")),
		idx24673EmailIdx: index("idx_24673_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
		idx24673NameIdx: index("idx_24673_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
		idx24673PicIdx: index("idx_24673_pic_idx").using("btree", table.pic.asc().nullsLast().op("text_ops")),
		idx24673ReceivedItemsIdx: index("idx_24673_received_items_idx").using("btree", table.receivedItems.asc().nullsLast().op("text_ops")),
	}
});

export const saLocal = pgTable("sa_local", {
	serviceNo: varchar("service_no", { length: 10 }).primaryKey().notNull(),
	date: varchar({ length: 255 }),
	pic: varchar({ length: 20 }),
	name: varchar({ length: 100 }),
	contact: varchar({ length: 40 }),
	status: varchar({ length: 255 }),
	email: varchar({ length: 250 }),
	address: text(),
	purchaseDate: varchar("purchase_date", { length: 255 }),
	invoice: varchar({ length: 255 }),
	receivedItems: varchar("received_items", { length: 250 }),
	pin: text(),
	issues: text(),
	solutions: text(),
	statusDesc: text("status_desc"),
	remarks: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locker: bigint({ mode: "number" }).default(sql`'0'`),
	receivedBy: varchar("received_by", { length: 20 }),
	idtPc: varchar("idt_pc", { length: 10 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cost: bigint({ mode: "number" }).default(sql`'0'`),
}, (table) => {
	return {
		idx24680ContactIdx: index("idx_24680_contact_idx").using("btree", table.contact.asc().nullsLast().op("text_ops")),
		idx24680EmailIdx: index("idx_24680_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
		idx24680NameIdx: index("idx_24680_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
		idx24680PicIdx: index("idx_24680_pic_idx").using("btree", table.pic.asc().nullsLast().op("text_ops")),
		idx24680ReceivedItemsIdx: index("idx_24680_received_items_idx").using("btree", table.receivedItems.asc().nullsLast().op("text_ops")),
	}
});

export const saLocalHistory = pgTable("sa_local_history", {
	historyId: bigserial("history_id", { mode: "bigint" }).primaryKey().notNull(),
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
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cost: bigint({ mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locker: bigint({ mode: "number" }),
	receivedBy: varchar("received_by", { length: 20 }),
	idtPc: varchar("idt_pc", { length: 10 }),
	changeType: saLocalHistoryChangeType("change_type").notNull(),
	changeTimestamp: timestamp("change_timestamp", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const saOther = pgTable("sa_other", {
	serviceNo: varchar("service_no", { length: 10 }).primaryKey().notNull(),
	date: varchar({ length: 255 }),
	pic: varchar({ length: 20 }),
	name: varchar({ length: 100 }),
	contact: varchar({ length: 40 }),
	status: varchar({ length: 255 }),
	email: varchar({ length: 250 }),
	address: text(),
	purchaseDate: varchar("purchase_date", { length: 255 }),
	invoice: varchar({ length: 255 }),
	receivedItems: varchar("received_items", { length: 250 }),
	pin: text(),
	issues: text(),
	solutions: text(),
	statusDesc: text("status_desc"),
	remarks: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locker: bigint({ mode: "number" }).default(sql`'0'`),
	receivedBy: varchar("received_by", { length: 20 }),
	idtPc: varchar("idt_pc", { length: 10 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cost: bigint({ mode: "number" }).default(sql`'0'`),
}, (table) => {
	return {
		idx24695ContactIdx: index("idx_24695_contact_idx").using("btree", table.contact.asc().nullsLast().op("text_ops")),
		idx24695EmailIdx: index("idx_24695_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
		idx24695NameIdx: index("idx_24695_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
		idx24695PicIdx: index("idx_24695_pic_idx").using("btree", table.pic.asc().nullsLast().op("text_ops")),
		idx24695ReceivedItemsIdx: index("idx_24695_received_items_idx").using("btree", table.receivedItems.asc().nullsLast().op("text_ops")),
	}
});

export const warrantyStaffBranch = pgTable("warranty_staff_branch", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	name: varchar({ length: 255 }),
	branch: varchar({ length: 255 }),
	color: varchar({ length: 255 }),
});

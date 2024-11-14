-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `_prisma_migrations` (
	`id` varchar(36) NOT NULL,
	`checksum` varchar(64) NOT NULL,
	`finished_at` datetime(3),
	`migration_name` varchar(255) NOT NULL,
	`logs` text,
	`rolled_back_at` datetime(3),
	`started_at` datetime(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP(3)),
	`applied_steps_count` int unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `_prisma_migrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ap_local` (
	`service_no` varchar(255) NOT NULL,
	`date` varchar(255),
	`pic` varchar(20),
	`name` varchar(100),
	`contact` varchar(40),
	`status` varchar(255),
	`email` varchar(255),
	`address` text,
	`purchase_date` varchar(255),
	`invoice` varchar(255),
	`received_items` varchar(250),
	`pin` text,
	`issues` text,
	`solutions` text,
	`status_desc` text,
	`remarks` text,
	`cost` int DEFAULT 0,
	`locker` int,
	`received_by` varchar(20),
	`idt_pc` varchar(10),
	CONSTRAINT `ap_local_service_no` PRIMARY KEY(`service_no`)
);
--> statement-breakpoint
CREATE TABLE `ap_local_history` (
	`history_id` int AUTO_INCREMENT NOT NULL,
	`service_no` varchar(255),
	`date` varchar(255),
	`pic` varchar(20),
	`name` text,
	`contact` text,
	`status` varchar(255),
	`email` varchar(255),
	`address` text,
	`purchase_date` varchar(255),
	`invoice` varchar(255),
	`received_items` varchar(250),
	`pin` text,
	`issues` text,
	`solutions` text,
	`status_desc` text,
	`remarks` text,
	`cost` int DEFAULT 0,
	`locker` int,
	`received_by` varchar(20),
	`idt_pc` varchar(10),
	`change_type` enum('INSERT','UPDATE','DELETE') NOT NULL,
	`change_timestamp` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `ap_local_history_history_id` PRIMARY KEY(`history_id`)
);
--> statement-breakpoint
CREATE TABLE `ap_other` (
	`service_no` varchar(255) NOT NULL,
	`date` varchar(255),
	`pic` varchar(20),
	`name` varchar(100),
	`contact` varchar(40),
	`status` varchar(255),
	`email` varchar(255),
	`address` text,
	`purchase_date` varchar(255),
	`invoice` varchar(255),
	`received_items` varchar(250),
	`pin` text,
	`issues` text,
	`solutions` text,
	`status_desc` text,
	`remarks` text,
	`cost` int DEFAULT 0,
	`locker` int,
	`received_by` varchar(20),
	`idt_pc` varchar(10),
	CONSTRAINT `ap_other_service_no` PRIMARY KEY(`service_no`)
);
--> statement-breakpoint
CREATE TABLE `auth_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255),
	`roles` varchar(10) DEFAULT 'Normal',
	CONSTRAINT `auth_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `jb_local` (
	`service_no` varchar(255) NOT NULL,
	`date` varchar(255),
	`pic` varchar(20),
	`name` varchar(100),
	`contact` varchar(40),
	`status` varchar(255),
	`email` varchar(255),
	`address` text,
	`purchase_date` varchar(255),
	`invoice` varchar(255),
	`received_items` varchar(250),
	`pin` text,
	`issues` text,
	`solutions` text,
	`status_desc` text,
	`remarks` text,
	`cost` int DEFAULT 0,
	`locker` int,
	`received_by` varchar(20),
	`idt_pc` varchar(10),
	CONSTRAINT `jb_local_service_no` PRIMARY KEY(`service_no`)
);
--> statement-breakpoint
CREATE TABLE `jb_local_history` (
	`history_id` int AUTO_INCREMENT NOT NULL,
	`service_no` varchar(255),
	`date` varchar(255),
	`pic` varchar(20),
	`name` text,
	`contact` text,
	`status` varchar(255),
	`email` varchar(255),
	`address` text,
	`purchase_date` varchar(255),
	`invoice` varchar(255),
	`received_items` varchar(250),
	`pin` text,
	`issues` text,
	`solutions` text,
	`status_desc` text,
	`remarks` text,
	`cost` int DEFAULT 0,
	`locker` int,
	`received_by` varchar(20),
	`idt_pc` varchar(10),
	`change_type` enum('INSERT','UPDATE','DELETE') NOT NULL,
	`change_timestamp` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `jb_local_history_history_id` PRIMARY KEY(`history_id`)
);
--> statement-breakpoint
CREATE TABLE `jb_other` (
	`service_no` varchar(255) NOT NULL,
	`date` varchar(255),
	`pic` varchar(20),
	`name` varchar(100),
	`contact` varchar(40),
	`status` varchar(255),
	`email` varchar(255),
	`address` text,
	`purchase_date` varchar(255),
	`invoice` varchar(255),
	`received_items` varchar(250),
	`pin` text,
	`issues` text,
	`solutions` text,
	`status_desc` text,
	`remarks` text,
	`cost` int DEFAULT 0,
	`locker` int,
	`received_by` varchar(20),
	`idt_pc` varchar(10),
	CONSTRAINT `jb_other_service_no` PRIMARY KEY(`service_no`)
);
--> statement-breakpoint
CREATE TABLE `s2_local` (
	`service_no` varchar(255) NOT NULL,
	`date` varchar(255),
	`pic` varchar(20),
	`name` varchar(100),
	`contact` varchar(40),
	`status` varchar(255),
	`email` varchar(255),
	`address` text,
	`purchase_date` varchar(255),
	`invoice` varchar(255),
	`received_items` varchar(250),
	`pin` text,
	`issues` text,
	`solutions` text,
	`status_desc` text,
	`remarks` text,
	`cost` int DEFAULT 0,
	`locker` int,
	`received_by` varchar(20),
	`idt_pc` varchar(10),
	CONSTRAINT `s2_local_service_no` PRIMARY KEY(`service_no`)
);
--> statement-breakpoint
CREATE TABLE `s2_local_history` (
	`history_id` int AUTO_INCREMENT NOT NULL,
	`service_no` varchar(255),
	`date` varchar(255),
	`pic` varchar(20),
	`name` text,
	`contact` text,
	`status` varchar(255),
	`email` varchar(255),
	`address` text,
	`purchase_date` varchar(255),
	`invoice` varchar(255),
	`received_items` varchar(250),
	`pin` text,
	`issues` text,
	`solutions` text,
	`status_desc` text,
	`remarks` text,
	`cost` int DEFAULT 0,
	`locker` int,
	`received_by` varchar(20),
	`idt_pc` varchar(10),
	`change_type` enum('INSERT','UPDATE','DELETE') NOT NULL,
	`change_timestamp` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `s2_local_history_history_id` PRIMARY KEY(`history_id`)
);
--> statement-breakpoint
CREATE TABLE `s2_other` (
	`service_no` varchar(255) NOT NULL,
	`date` varchar(255),
	`pic` varchar(20),
	`name` varchar(100),
	`contact` varchar(40),
	`status` varchar(255),
	`email` varchar(255),
	`address` text,
	`purchase_date` varchar(255),
	`invoice` varchar(255),
	`received_items` varchar(250),
	`pin` text,
	`issues` text,
	`solutions` text,
	`status_desc` text,
	`remarks` text,
	`cost` int DEFAULT 0,
	`locker` int,
	`received_by` varchar(20),
	`idt_pc` varchar(10),
	CONSTRAINT `s2_other_service_no` PRIMARY KEY(`service_no`)
);
--> statement-breakpoint
CREATE TABLE `sa_local` (
	`service_no` varchar(255) NOT NULL,
	`date` varchar(255),
	`pic` varchar(20),
	`name` varchar(100),
	`contact` varchar(40),
	`status` varchar(255),
	`email` varchar(255),
	`address` text,
	`purchase_date` varchar(255),
	`invoice` varchar(255),
	`received_items` varchar(250),
	`pin` text,
	`issues` text,
	`solutions` text,
	`status_desc` text,
	`remarks` text,
	`cost` int DEFAULT 0,
	`locker` int,
	`received_by` varchar(20),
	`idt_pc` varchar(10),
	CONSTRAINT `sa_local_service_no` PRIMARY KEY(`service_no`)
);
--> statement-breakpoint
CREATE TABLE `sa_local_history` (
	`history_id` int AUTO_INCREMENT NOT NULL,
	`service_no` varchar(255),
	`date` varchar(255),
	`pic` varchar(20),
	`name` text,
	`contact` text,
	`status` varchar(255),
	`email` varchar(255),
	`address` text,
	`purchase_date` varchar(255),
	`invoice` varchar(255),
	`received_items` varchar(250),
	`pin` text,
	`issues` text,
	`solutions` text,
	`status_desc` text,
	`remarks` text,
	`cost` int DEFAULT 0,
	`locker` int,
	`received_by` varchar(20),
	`idt_pc` varchar(10),
	`change_type` enum('INSERT','UPDATE','DELETE') NOT NULL,
	`change_timestamp` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `sa_local_history_history_id` PRIMARY KEY(`history_id`)
);
--> statement-breakpoint
CREATE TABLE `sa_other` (
	`service_no` varchar(255) NOT NULL,
	`date` varchar(255),
	`pic` varchar(20),
	`name` varchar(100),
	`contact` varchar(40),
	`status` varchar(255),
	`email` varchar(255),
	`address` text,
	`purchase_date` varchar(255),
	`invoice` varchar(255),
	`received_items` varchar(250),
	`pin` text,
	`issues` text,
	`solutions` text,
	`status_desc` text,
	`remarks` text,
	`cost` int DEFAULT 0,
	`locker` int,
	`received_by` varchar(20),
	`idt_pc` varchar(10),
	CONSTRAINT `sa_other_service_no` PRIMARY KEY(`service_no`)
);
--> statement-breakpoint
CREATE TABLE `warranty_staff_branch` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`branch` varchar(255),
	`color` varchar(255),
	CONSTRAINT `warranty_staff_branch_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `contact_idx` ON `ap_local` (`contact`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `ap_local` (`email`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `ap_local` (`name`);--> statement-breakpoint
CREATE INDEX `received_items_idx` ON `ap_local` (`received_items`);--> statement-breakpoint
CREATE INDEX `contact_idx` ON `ap_other` (`contact`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `ap_other` (`email`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `ap_other` (`name`);--> statement-breakpoint
CREATE INDEX `received_items_idx` ON `ap_other` (`received_items`);--> statement-breakpoint
CREATE INDEX `contact_idx` ON `jb_local` (`contact`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `jb_local` (`email`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `jb_local` (`name`);--> statement-breakpoint
CREATE INDEX `received_items_idx` ON `jb_local` (`received_items`);--> statement-breakpoint
CREATE INDEX `contact_idx` ON `jb_other` (`contact`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `jb_other` (`email`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `jb_other` (`name`);--> statement-breakpoint
CREATE INDEX `received_items_idx` ON `jb_other` (`received_items`);--> statement-breakpoint
CREATE INDEX `contact_idx` ON `s2_local` (`contact`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `s2_local` (`email`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `s2_local` (`name`);--> statement-breakpoint
CREATE INDEX `received_items_idx` ON `s2_local` (`received_items`);--> statement-breakpoint
CREATE INDEX `contact_idx` ON `s2_other` (`contact`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `s2_other` (`email`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `s2_other` (`name`);--> statement-breakpoint
CREATE INDEX `received_items_idx` ON `s2_other` (`received_items`);--> statement-breakpoint
CREATE INDEX `contact_idx` ON `sa_local` (`contact`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `sa_local` (`email`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `sa_local` (`name`);--> statement-breakpoint
CREATE INDEX `received_items_idx` ON `sa_local` (`received_items`);--> statement-breakpoint
CREATE INDEX `contact_idx` ON `sa_other` (`contact`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `sa_other` (`email`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `sa_other` (`name`);--> statement-breakpoint
CREATE INDEX `received_items_idx` ON `sa_other` (`received_items`);
*/
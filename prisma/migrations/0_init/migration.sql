-- CreateTable
CREATE TABLE `ap_local` (
    `service_no` VARCHAR(255) NOT NULL,
    `date` VARCHAR(255) NULL,
    `pic` VARCHAR(20) NULL,
    `name` VARCHAR(100) NULL,
    `contact` VARCHAR(40) NULL,
    `status` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `purchase_date` VARCHAR(255) NULL,
    `invoice` VARCHAR(255) NULL,
    `received_items` VARCHAR(250) NULL,
    `pin` TEXT NULL,
    `issues` TEXT NULL,
    `solutions` TEXT NULL,
    `status_desc` TEXT NULL,
    `remarks` TEXT NULL,
    `cost` INTEGER NULL DEFAULT 0,
    `locker` INTEGER NULL,
    `received_by` VARCHAR(20) NULL,
    `idt_pc` VARCHAR(10) NULL,

    INDEX `contact_idx`(`contact`),
    INDEX `email_idx`(`email`),
    INDEX `name_idx`(`name`),
    INDEX `received_items_idx`(`received_items`),
    PRIMARY KEY (`service_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ap_local_history` (
    `history_id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_no` VARCHAR(255) NULL,
    `date` VARCHAR(255) NULL,
    `pic` VARCHAR(20) NULL,
    `name` TEXT NULL,
    `contact` TEXT NULL,
    `status` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `purchase_date` VARCHAR(255) NULL,
    `invoice` VARCHAR(255) NULL,
    `received_items` VARCHAR(250) NULL,
    `pin` TEXT NULL,
    `issues` TEXT NULL,
    `solutions` TEXT NULL,
    `status_desc` TEXT NULL,
    `remarks` TEXT NULL,
    `cost` INTEGER NULL DEFAULT 0,
    `locker` INTEGER NULL,
    `received_by` VARCHAR(20) NULL,
    `idt_pc` VARCHAR(10) NULL,
    `change_type` ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    `change_timestamp` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ap_other` (
    `service_no` VARCHAR(255) NOT NULL,
    `date` VARCHAR(255) NULL,
    `pic` VARCHAR(20) NULL,
    `name` VARCHAR(100) NULL,
    `contact` VARCHAR(40) NULL,
    `status` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `purchase_date` VARCHAR(255) NULL,
    `invoice` VARCHAR(255) NULL,
    `received_items` VARCHAR(250) NULL,
    `pin` TEXT NULL,
    `issues` TEXT NULL,
    `solutions` TEXT NULL,
    `status_desc` TEXT NULL,
    `remarks` TEXT NULL,
    `cost` INTEGER NULL DEFAULT 0,
    `locker` INTEGER NULL,
    `received_by` VARCHAR(20) NULL,
    `idt_pc` VARCHAR(10) NULL,

    INDEX `contact_idx`(`contact`),
    INDEX `email_idx`(`email`),
    INDEX `name_idx`(`name`),
    INDEX `received_items_idx`(`received_items`),
    PRIMARY KEY (`service_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NULL,
    `roles` VARCHAR(10) NULL DEFAULT 'Normal',

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jb_local` (
    `service_no` VARCHAR(255) NOT NULL,
    `date` VARCHAR(255) NULL,
    `pic` VARCHAR(20) NULL,
    `name` VARCHAR(100) NULL,
    `contact` VARCHAR(40) NULL,
    `status` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `purchase_date` VARCHAR(255) NULL,
    `invoice` VARCHAR(255) NULL,
    `received_items` VARCHAR(250) NULL,
    `pin` TEXT NULL,
    `issues` TEXT NULL,
    `solutions` TEXT NULL,
    `status_desc` TEXT NULL,
    `remarks` TEXT NULL,
    `cost` INTEGER NULL DEFAULT 0,
    `locker` INTEGER NULL,
    `received_by` VARCHAR(20) NULL,
    `idt_pc` VARCHAR(10) NULL,

    INDEX `contact_idx`(`contact`),
    INDEX `email_idx`(`email`),
    INDEX `name_idx`(`name`),
    INDEX `received_items_idx`(`received_items`),
    PRIMARY KEY (`service_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jb_local_history` (
    `history_id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_no` VARCHAR(255) NULL,
    `date` VARCHAR(255) NULL,
    `pic` VARCHAR(20) NULL,
    `name` TEXT NULL,
    `contact` TEXT NULL,
    `status` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `purchase_date` VARCHAR(255) NULL,
    `invoice` VARCHAR(255) NULL,
    `received_items` VARCHAR(250) NULL,
    `pin` TEXT NULL,
    `issues` TEXT NULL,
    `solutions` TEXT NULL,
    `status_desc` TEXT NULL,
    `remarks` TEXT NULL,
    `cost` INTEGER NULL DEFAULT 0,
    `locker` INTEGER NULL,
    `received_by` VARCHAR(20) NULL,
    `idt_pc` VARCHAR(10) NULL,
    `change_type` ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    `change_timestamp` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jb_other` (
    `service_no` VARCHAR(255) NOT NULL,
    `date` VARCHAR(255) NULL,
    `pic` VARCHAR(20) NULL,
    `name` VARCHAR(100) NULL,
    `contact` VARCHAR(40) NULL,
    `status` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `purchase_date` VARCHAR(255) NULL,
    `invoice` VARCHAR(255) NULL,
    `received_items` VARCHAR(250) NULL,
    `pin` TEXT NULL,
    `issues` TEXT NULL,
    `solutions` TEXT NULL,
    `status_desc` TEXT NULL,
    `remarks` TEXT NULL,
    `cost` INTEGER NULL DEFAULT 0,
    `locker` INTEGER NULL,
    `received_by` VARCHAR(20) NULL,
    `idt_pc` VARCHAR(10) NULL,

    INDEX `contact_idx`(`contact`),
    INDEX `email_idx`(`email`),
    INDEX `name_idx`(`name`),
    INDEX `received_items_idx`(`received_items`),
    PRIMARY KEY (`service_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `s2_local` (
    `service_no` VARCHAR(255) NOT NULL,
    `date` VARCHAR(255) NULL,
    `pic` VARCHAR(20) NULL,
    `name` VARCHAR(100) NULL,
    `contact` VARCHAR(40) NULL,
    `status` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `purchase_date` VARCHAR(255) NULL,
    `invoice` VARCHAR(255) NULL,
    `received_items` VARCHAR(250) NULL,
    `pin` TEXT NULL,
    `issues` TEXT NULL,
    `solutions` TEXT NULL,
    `status_desc` TEXT NULL,
    `remarks` TEXT NULL,
    `cost` INTEGER NULL DEFAULT 0,
    `locker` INTEGER NULL,
    `received_by` VARCHAR(20) NULL,
    `idt_pc` VARCHAR(10) NULL,

    INDEX `contact_idx`(`contact`),
    INDEX `email_idx`(`email`),
    INDEX `name_idx`(`name`),
    INDEX `received_items_idx`(`received_items`),
    PRIMARY KEY (`service_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `s2_local_history` (
    `history_id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_no` VARCHAR(255) NULL,
    `date` VARCHAR(255) NULL,
    `pic` VARCHAR(20) NULL,
    `name` TEXT NULL,
    `contact` TEXT NULL,
    `status` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `purchase_date` VARCHAR(255) NULL,
    `invoice` VARCHAR(255) NULL,
    `received_items` VARCHAR(250) NULL,
    `pin` TEXT NULL,
    `issues` TEXT NULL,
    `solutions` TEXT NULL,
    `status_desc` TEXT NULL,
    `remarks` TEXT NULL,
    `cost` INTEGER NULL DEFAULT 0,
    `locker` INTEGER NULL,
    `received_by` VARCHAR(20) NULL,
    `idt_pc` VARCHAR(10) NULL,
    `change_type` ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    `change_timestamp` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `s2_other` (
    `service_no` VARCHAR(255) NOT NULL,
    `date` VARCHAR(255) NULL,
    `pic` VARCHAR(20) NULL,
    `name` VARCHAR(100) NULL,
    `contact` VARCHAR(40) NULL,
    `status` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `purchase_date` VARCHAR(255) NULL,
    `invoice` VARCHAR(255) NULL,
    `received_items` VARCHAR(250) NULL,
    `pin` TEXT NULL,
    `issues` TEXT NULL,
    `solutions` TEXT NULL,
    `status_desc` TEXT NULL,
    `remarks` TEXT NULL,
    `cost` INTEGER NULL DEFAULT 0,
    `locker` INTEGER NULL,
    `received_by` VARCHAR(20) NULL,
    `idt_pc` VARCHAR(10) NULL,

    INDEX `contact_idx`(`contact`),
    INDEX `email_idx`(`email`),
    INDEX `name_idx`(`name`),
    INDEX `received_items_idx`(`received_items`),
    PRIMARY KEY (`service_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sa_local` (
    `service_no` VARCHAR(255) NOT NULL,
    `date` VARCHAR(255) NULL,
    `pic` VARCHAR(20) NULL,
    `name` VARCHAR(100) NULL,
    `contact` VARCHAR(40) NULL,
    `status` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `purchase_date` VARCHAR(255) NULL,
    `invoice` VARCHAR(255) NULL,
    `received_items` VARCHAR(250) NULL,
    `pin` TEXT NULL,
    `issues` TEXT NULL,
    `solutions` TEXT NULL,
    `status_desc` TEXT NULL,
    `remarks` TEXT NULL,
    `cost` INTEGER NULL DEFAULT 0,
    `locker` INTEGER NULL,
    `received_by` VARCHAR(20) NULL,
    `idt_pc` VARCHAR(10) NULL,

    INDEX `contact_idx`(`contact`),
    INDEX `email_idx`(`email`),
    INDEX `name_idx`(`name`),
    INDEX `received_items_idx`(`received_items`),
    PRIMARY KEY (`service_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sa_local_history` (
    `history_id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_no` VARCHAR(255) NULL,
    `date` VARCHAR(255) NULL,
    `pic` VARCHAR(20) NULL,
    `name` TEXT NULL,
    `contact` TEXT NULL,
    `status` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `purchase_date` VARCHAR(255) NULL,
    `invoice` VARCHAR(255) NULL,
    `received_items` VARCHAR(250) NULL,
    `pin` TEXT NULL,
    `issues` TEXT NULL,
    `solutions` TEXT NULL,
    `status_desc` TEXT NULL,
    `remarks` TEXT NULL,
    `cost` INTEGER NULL DEFAULT 0,
    `locker` INTEGER NULL,
    `received_by` VARCHAR(20) NULL,
    `idt_pc` VARCHAR(10) NULL,
    `change_type` ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    `change_timestamp` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sa_other` (
    `service_no` VARCHAR(255) NOT NULL,
    `date` VARCHAR(255) NULL,
    `pic` VARCHAR(20) NULL,
    `name` VARCHAR(100) NULL,
    `contact` VARCHAR(40) NULL,
    `status` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `purchase_date` VARCHAR(255) NULL,
    `invoice` VARCHAR(255) NULL,
    `received_items` VARCHAR(250) NULL,
    `pin` TEXT NULL,
    `issues` TEXT NULL,
    `solutions` TEXT NULL,
    `status_desc` TEXT NULL,
    `remarks` TEXT NULL,
    `cost` INTEGER NULL DEFAULT 0,
    `locker` INTEGER NULL,
    `received_by` VARCHAR(20) NULL,
    `idt_pc` VARCHAR(10) NULL,

    INDEX `contact_idx`(`contact`),
    INDEX `email_idx`(`email`),
    INDEX `name_idx`(`name`),
    INDEX `received_items_idx`(`received_items`),
    PRIMARY KEY (`service_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warranty_staff_branch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `branch` VARCHAR(255) NULL,
    `color` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


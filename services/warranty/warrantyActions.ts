"use server";
import db from "@/db/db";
import { apLocal, jbLocal, s2Local, saLocal } from "@/db/schema";
import { AnyColumn, asc, desc, eq, like, sql } from "drizzle-orm";

export type WarrantyDataType = {
  serviceNo: string;
  date: string;
  pic: string;
  receivedBy: string;
  name: string;
  contact: string;
  status: string;
  email: string;
  address: string;
  purchaseDate: string;
  invoice: string;
  receivedItems: string;
  pin: string;
  issues: string;
  solutions: string;
  statusDesc: string;
  remarks: string;
  idtPc: string;
};

type SortType = {
  type: string;
  direction: string;
};

type GetDataByFilterType = {
  tableName: string;
  pageSize: number;
  pageNum: number;
  search: string;
  searchBy: string;
  sortList: SortType[];
};

export const getDataByFilter = async ({
  tableName,
  pageSize,
  pageNum,
  search,
  searchBy,
  sortList,
}: GetDataByFilterType): Promise<WarrantyDataType[]> => {
  try {
    const searchFilter = (() => {
      switch (searchBy) {
        case "By: Service No":
          return "serviceNo";
        case "By: Name":
          return "name";
        case "By: Email":
          return "email";
        case "By: PIC":
          return "pic";
        case "By: Contact":
          return "contact";
        default:
          return undefined;
      }
    })();

    const statusOrderAsc = sql`CASE 
      WHEN status = 'From Ampang' THEN 1
      WHEN status = 'From SS2' THEN 2
      WHEN status = 'From Setia Alam' THEN 3
      WHEN status = 'From JB' THEN 4
      WHEN status = 'In Queue' THEN 5
      WHEN status = 'In Progress' THEN 6
      WHEN status = 'Waiting For' THEN 7
      WHEN status = 'Completed' THEN 8
      ELSE 9 END`;

    const statusOrderDesc = sql`CASE 
      WHEN status = 'Completed' THEN 1
      WHEN status = 'Waiting For' THEN 2
      WHEN status = 'In Progress' THEN 3
      WHEN status = 'In Queue' THEN 4
      WHEN status = 'From JB' THEN 5
      WHEN status = 'From Setia Alam' THEN 6
      WHEN status = 'From SS2' THEN 7
      WHEN status = 'From Ampang' THEN 8
      ELSE 9 END`;

    // Select the correct table
    const table = (() => {
      switch (tableName) {
        case "ap_local":
          return apLocal;
        case "s2_local":
          return s2Local;
        case "sa_local":
          return saLocal;
        case "jb_local":
          return jbLocal;
        default:
          throw new Error(`Unknown table name: ${tableName}`);
      }
    })();

    const where = searchFilter
      ? like(table[searchFilter], `%${search}%`)
      : undefined;

    const orderByArray = sortList.map((sort) => {
      if (sort.type === "status") {
        return sort.direction === "asc" ? statusOrderAsc : statusOrderDesc;
      } else {
        const column = table[sort.type as keyof typeof table] as
          | AnyColumn
          | undefined;
        if (column) {
          return sort.direction === "asc" ? asc(column) : desc(column);
        }
        throw new Error(`Unknown column: ${sort.type}`);
      }
    });

    // Execute the query with pagination and sorting
    const rows = await db
      .select()
      .from(table)
      .where(where)
      .orderBy(...orderByArray)
      .limit(pageSize)
      .offset((pageNum - 1) * pageSize)
      .execute();

    return rows.length > 0 ? (rows as WarrantyDataType[]) : [];
  } catch (e) {
    throw new Error(`Database error (getDataByFilter): ${e}`);
  }
};

type UpdateWarrantyDataType = {
  tableName: string;
  whereId: keyof WarrantyDataType;
  whereValue: string;
  toChangeId: string;
  toChangeValue: string;
};

export const updateData = async ({
  tableName,
  whereId,
  whereValue,
  toChangeId,
  toChangeValue,
}: UpdateWarrantyDataType) => {
  try {
    // Select the correct table based on tableName
    const table = (() => {
      switch (tableName) {
        case "ap_local":
          return apLocal;
        case "s2_local":
          return s2Local;
        case "sa_local":
          return saLocal;
        case "jb_local":
          return jbLocal;
        default:
          throw new Error(`Unknown table name: ${tableName}`);
      }
    })();

    // Define the `where` clause using the selected table and `whereId`
    const whereClause = eq(table[whereId], whereValue);
    const updateValue = toChangeValue === "" ? null : toChangeValue;

    // Perform the update
    await db
      .update(table)
      .set({
        [toChangeId]: updateValue,
      })
      .where(whereClause)
      .execute();

    // console.log(updateData, "CHECK UPDATE");
  } catch (e) {
    throw new Error(`Database error (updateData): ${e}`);
  }
};

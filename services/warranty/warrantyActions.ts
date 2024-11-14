"use server";
import db from "@/db/db";
import {
  apLocal,
  apOther,
  jbLocal,
  jbOther,
  s2Local,
  s2Other,
  saLocal,
  saOther,
} from "@/db/schema";
import { AnyColumn, asc, desc, eq, like, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type NonNullableProperties<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type WarrantyDataType = NonNullableProperties<
  typeof apLocal.$inferSelect
>;

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
        case "ap_other":
          return apOther;
        case "s2_other":
          return s2Other;
        case "sa_other":
          return saOther;
        case "jb_other":
          return jbOther;
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

    const rows = await db
      .select()
      .from(table)
      .where(where)
      .orderBy(...orderByArray)
      .limit(pageSize)
      .offset((pageNum - 1) * pageSize)
      .execute();

    revalidatePath("/warranty/[branch]", "page");

    return rows.length > 0 ? (rows as WarrantyDataType[]) : [];
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error (getDataByFilter): ${e.message}`);
    } else {
      throw new Error(`Error (getDataByFilter): ${e}`);
    }
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
        case "ap_other":
          return apOther;
        case "s2_other":
          return s2Other;
        case "sa_other":
          return saOther;
        case "jb_other":
          return jbOther;
        default:
          throw new Error(`Unknown table name: ${tableName}`);
      }
    })();

    // Define the `where` clause using the selected table and `whereId`
    const whereClause = eq(table[whereId], whereValue);
    const updateValue = toChangeValue === "" ? null : toChangeValue;

    await db
      .update(table)
      .set({
        [toChangeId]: updateValue,
      })
      .where(whereClause)
      .execute();

    revalidatePath("/warranty/[branch]", "page");
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error (updateData): ${e.message}`);
    } else {
      throw new Error(`Error (updateData): ${e}`);
    }
  }
};

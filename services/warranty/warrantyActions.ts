"use server";
import db from "@/db/db";
import {
  apLocal,
  apLocalHistory,
  apOther,
  jbLocal,
  jbLocalHistory,
  jbOther,
  s2Local,
  s2LocalHistory,
  s2Other,
  saLocal,
  saLocalHistory,
  saOther,
} from "@/db/schema";
import { AnyColumn, asc, desc, eq, like, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { format } from "date-fns";
import {
  serverErrorHandler,
  ServerErrorHandlerType,
} from "../common/errorHandler";

// type DatabaseTransaction = PgTransaction<typeof schema>;

type NonNullableProperties<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type WarrantyDataType = NonNullableProperties<
  typeof apLocal.$inferSelect
>;
export type WarrantyDataNulType = typeof apLocal.$inferSelect;

export type WarrantyHistoryDataType = NonNullableProperties<
  typeof apLocalHistory.$inferSelect
>;

export type SortDbType = {
  type: string;
  direction: string;
};

type GetWarrantyByFilterType = {
  tableName: string;
  pageSize: number;
  pageNum: number;
  search: string;
  searchBy: string;
  sortList: SortDbType[];
  // dbTransaction?: DatabaseTransaction;
};

const getDrizzleTable = (tableName: string) => {
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
};

export const getWarrantyByFilter = async ({
  tableName,
  pageSize,
  pageNum,
  search,
  searchBy,
  sortList,
}: // dbTransaction,
GetWarrantyByFilterType): Promise<
  | {
      data: WarrantyDataType[];
      totalCount: number;
    }
  | ServerErrorHandlerType
> => {
  try {
    // const dbConnection = dbTransaction ?? db;
    const dbConnection = db;

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
          throw new Error(`Unknown search filter: ${searchBy}`);
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

    const table = getDrizzleTable(tableName);

    const where = search ? like(table[searchFilter], `%${search}%`) : undefined;

    const orderByArray =
      sortList.length > 0
        ? sortList.map((sort) => {
            if (sort.type === "status") {
              return sort.direction === "asc"
                ? statusOrderAsc
                : statusOrderDesc;
            } else {
              const column = table[sort.type as keyof typeof table] as
                | AnyColumn
                | undefined;
              if (column) {
                return sort.direction === "asc" ? asc(column) : desc(column);
              }
              throw new Error(`Unknown column: ${sort.type}`);
            }
          })
        : [asc(table.date)];

    const rows = await dbConnection
      .select()
      .from(table)
      .where(where)
      .orderBy(...orderByArray)
      .limit(pageSize)
      .offset((pageNum - 1) * pageSize)
      .execute();

    let countFinal: number = 0;

    if (search === "") {
      // Count all rows if no search term is provided
      const [{ count }] = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(table)
        .execute();

      countFinal = Number(count);
    } else {
      // Count rows where `searchBy` column matches `search` term
      const [{ count }] = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(table)
        .where(where)
        .execute();

      countFinal = Number(count);
    }

    revalidatePath("/warranty/[branch]", "page");

    return {
      data: rows.length > 0 ? (rows as WarrantyDataType[]) : [],
      totalCount: countFinal,
    };
  } catch (e) {
    return await serverErrorHandler(e, "getWarrabtyByFilter");
  }
};

export const addWarranty = async ({
  tableName,
}: // dbTransaction,
{
  tableName: string | undefined;
  // dbTransaction?: DatabaseTransaction;
}) => {
  try {
    if (tableName === undefined)
      throw new Error(`Unknown table name: ${tableName}`);
    // const dbConnection = dbTransaction ?? db;
    const dbConnection = db;

    let prefix = "";
    switch (tableName) {
      case "ap_local":
        prefix = "WAP";
        break;
      case "s2_local":
        prefix = "WSS";
        break;
      case "sa_local":
        prefix = "WSA";
        break;
      case "jb_local":
        prefix = "WJB";
        break;
      default:
        throw new Error(`Unknown table name: ${tableName}`);
    }

    const year = new Date().getFullYear().toString().substr(-2);
    const month = `0${new Date().getMonth() + 1}`.slice(-2);
    const likePattern = `${prefix}${year}${month}%`;

    const tables = {
      ap_local: apLocal,
      s2_local: s2Local,
      sa_local: saLocal,
      jb_local: jbLocal,
    };

    if (!(tableName in tables)) {
      throw new Error(`Invalid table name: ${tableName}`);
    }

    const maxSequences = await Promise.all(
      Object.entries(tables).map(async ([name, table]) => {
        const [{ maxSequence }] = await db
          .select({
            maxSequence: sql<number>`MAX(SUBSTRING(service_no, ${
              prefix.length + 5
            }))`,
          })
          .from(table)
          .where(like(table.serviceNo, likePattern))
          .execute();

        return maxSequence || 0;
      })
    );

    const maxSequence = Math.max(...maxSequences, 0);

    const sequenceNumber = maxSequence + 1;

    const serviceNo = `${prefix}${year}${month}${`00${sequenceNumber}`.slice(
      -3
    )}`;

    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");
    const status = "In Queue";

    await dbConnection
      .insert(tables[tableName])
      .values({
        serviceNo,
        date: formattedDate,
        status,
      })
      .execute();

    revalidatePath("/warranty/[branch]", "page");
    return { date: formattedDate, serviceNo };
  } catch (e) {
    return await serverErrorHandler(e, "addWarranty");
  }
};

type UpdateWarrantyDataType = {
  tableName: string;
  whereId: keyof WarrantyDataType;
  whereValue: string;
  toChangeId: string;
  toChangeValue: string;
  // dbTransaction?: DatabaseTransaction;
};

export const updateWarranty = async ({
  tableName,
  whereId,
  whereValue,
  toChangeId,
  toChangeValue,
}: // dbTransaction,
UpdateWarrantyDataType) => {
  try {
    // const dbConnection = dbTransaction ?? db;
    const dbConnection = db;
    const table = getDrizzleTable(tableName);

    // Define the `where` clause using the selected table and `whereId`
    const whereClause = eq(table[whereId], whereValue);
    const updateValue = toChangeValue === "" ? null : toChangeValue;

    await dbConnection
      .update(table)
      .set({
        [toChangeId]: updateValue,
      })
      .where(whereClause)
      .execute();

    // revalidatePath("/warranty/[branch]", "page");
  } catch (e) {
    return await serverErrorHandler(e, "updateWarranty");
  }
};

export const deleteWarranty = async ({
  tableName,
  deleteId,
}: // dbTransaction,
{
  tableName: string;
  deleteId: string;
  // dbTransaction?: DatabaseTransaction;
}) => {
  try {
    // const dbConnection = dbTransaction ?? db;
    const dbConnection = db;
    const table = getDrizzleTable(tableName);

    await dbConnection.delete(table).where(eq(table["serviceNo"], deleteId));

    revalidatePath("/warranty/[branch]", "page");
  } catch (e) {
    return await serverErrorHandler(e, "deleteWarranty");
  }
};

type CopyWarrantyType = {
  tableFrom: string;
  tableTo: string;
  toCopyId: string;
  // dbTransaction?: DatabaseTransaction;
};

export const copyWarranty = async ({
  tableFrom,
  tableTo,
  toCopyId,
}: // dbTransaction,
CopyWarrantyType) => {
  try {
    // const dbConnection = dbTransaction ?? db;
    const dbConnection = db;
    const tableFromActive = getDrizzleTable(tableFrom);

    const tableToActive = getDrizzleTable(tableTo);

    const isExistToTable = await dbConnection
      .select()
      .from(tableToActive)
      .where(eq(tableToActive["serviceNo"], toCopyId))
      .execute();

    if (isExistToTable.length > 0) {
      await dbConnection
        .delete(tableToActive)
        .where(eq(tableToActive["serviceNo"], toCopyId))
        .execute();
    }

    const dataToCopy = await dbConnection
      .select()
      .from(tableFromActive)
      .where(eq(tableFromActive["serviceNo"], toCopyId))
      .execute();

    if (dataToCopy.length > 0) {
      await dbConnection.insert(tableToActive).values(dataToCopy[0]).execute();

      revalidatePath("/warranty/[branch]", "page");
    } else {
      throw new Error("No data found to copy");
    }
  } catch (e) {
    return await serverErrorHandler(e, "copyWarranty");
  }
};

type PassWarrantyType = {
  tableFrom: string | undefined;
  tableTo: string;
  toPassId: string;
};

export const passWarranty = async ({
  tableFrom,
  tableTo,
  toPassId,
}: PassWarrantyType) => {
  try {
    if (tableFrom === undefined)
      throw new Error(`Unknown table name: ${tableFrom}`);

    let statusValue: string;
    switch (tableFrom) {
      case "ap_local":
        statusValue = "Ampang";
        break;
      case "s2_local":
        statusValue = "SS2";
        break;
      case "sa_local":
        statusValue = "Setia Alam";
        break;
      case "jb_local":
        statusValue = "JB";
        break;
      default:
        throw new Error(`Unknown table name: ${tableFrom}`);
    }

    await db.transaction(async (dbTransaction) => {
      await copyWarranty({
        tableFrom,
        tableTo: `${tableFrom.split("_")[0]}_other`,
        toCopyId: toPassId,
        // dbTransaction,
      });
      await updateWarranty({
        tableName: tableFrom,
        whereId: "serviceNo",
        whereValue: toPassId,
        toChangeId: "status",
        toChangeValue: `From ${statusValue}`,
        // dbTransaction,
      });
      await copyWarranty({
        tableFrom,
        tableTo,
        toCopyId: toPassId,
        // dbTransaction,
      });
      deleteWarranty({ tableName: tableFrom, deleteId: toPassId });
    });

    revalidatePath("/warranty/[branch]", "page");
  } catch (e) {
    return await serverErrorHandler(e, "passWarranty");
  }
};

export async function getWarrantyHistory(
  tableName: string,
  search: string
): Promise<{ data: WarrantyHistoryDataType[] } | ServerErrorHandlerType> {
  try {
    const table = (() => {
      switch (tableName) {
        case "ampang-hq":
          return apLocalHistory;
        case "ss2-pj":
          return s2LocalHistory;
        case "setia-alam":
          return saLocalHistory;
        case "jb":
          return jbLocalHistory;
        default:
          throw new Error(`Unknown table name: ${tableName}`);
      }
    })();

    const query = db
      .select()
      .from(table)
      .orderBy(sql`${table.historyId} DESC`)
      .limit(20);

    if (search) {
      query.where(like(table.serviceNo, `%${search}%`));
    }

    // Execute the query
    const rows = await query.execute();

    return { data: rows.length > 0 ? (rows as WarrantyHistoryDataType[]) : [] };
  } catch (e) {
    return await serverErrorHandler(e, "getWarrantyHistory");
  }
}

export const revalidateGetWarranty = async () => {
  revalidatePath("/warranty/[branch]", "page");
};

export const getWarrantyDetail = async (
  search: string
): Promise<
  { data: Partial<WarrantyDataType> | undefined } | ServerErrorHandlerType
> => {
  try {
    const tables = [apLocal, s2Local, saLocal, jbLocal];
    const searchLike = `%${search}%`;

    const searchPromises = tables.map((table) =>
      db
        .select({
          serviceNo: table.serviceNo,
          date: table.date,
          pic: table.pic,
          status: table.status,
          issues: table.issues,
        })
        .from(table)
        .where(search ? like(table.serviceNo, searchLike) : undefined)
        .execute()
    );

    const results = await Promise.all(searchPromises);

    const aggregatedRows = results.flat().map((row) => ({
      serviceNo: row.serviceNo,
      date: row.date ?? "",
      pic: row.pic ?? "",
      status: row.status ?? "",
      issues: row.issues ?? "",
    }));

    return {
      data:
        search !== ""
          ? aggregatedRows.length > 0
            ? aggregatedRows[0]
            : undefined
          : undefined,
    };
  } catch (e) {
    return await serverErrorHandler(e, "getWarrantyDetail");
  }
};

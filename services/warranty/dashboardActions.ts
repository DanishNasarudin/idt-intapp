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
import { AnyColumn, eq, like, sql } from "drizzle-orm";
import { WarrantyDataType } from "./warrantyActions";

export const countDB = async (
  tableName: string,
  searchBy: keyof WarrantyDataType | undefined,
  search: string
): Promise<{ count: number }> => {
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

    if (search === "") {
      // Count all rows if no search term is provided
      const [{ count }] = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(table)
        .execute();

      return { count: Number(count) };
    } else {
      // Count rows where `searchBy` column matches `search` term
      const [{ count }] = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(table)
        .where(
          like(
            table[searchBy as keyof typeof table] as AnyColumn,
            `%${search}%`
          )
        )
        .execute();

      return { count: Number(count) };
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error (countDB): ${error.message}`);
    } else {
      throw new Error(`Error (countDB): ${error}`);
    }
  }
};

export type CountAllDBType = {
  complete: number;
  total: number;
  other: number;
  pass: number;
  leadboard: { name: string; count: number }[];
  status: {
    completed: number;
    waiting: number;
    inProgress: number;
    inQueue: number;
    fromAP: number;
    fromS2: number;
    fromSA: number;
    fromJB: number;
  };
};

export const countAllDB = async (
  local: string,
  prefix: string,
  leadList: string[]
): Promise<CountAllDBType> => {
  try {
    const completeCount = await countDB(
      `${local}_local`,
      "status",
      "Completed"
    );
    const totalCount = await countDB(`${local}_local`, undefined, "");
    const otherCount = await countDB(
      `${local}_local`,
      "serviceNo",
      `%${prefix}%`
    );
    const other = totalCount.count - otherCount.count;
    const passCount = await countDB(`${local}_other`, undefined, "");
    const lead = await countLeadDB(`${local}_local`, "pic", leadList);
    const statusP = await countDB(`${local}_local`, "status", "In Progress");
    const statusQ = await countDB(`${local}_local`, "status", "In Queue");
    const statusW = await countDB(`${local}_local`, "status", "Waiting For");
    const statusAP = await countDB(`${local}_local`, "status", "From Ampang");
    const statusS2 = await countDB(`${local}_local`, "status", "From SS2");
    const statusSA = await countDB(
      `${local}_local`,
      "status",
      "From Setia Alam"
    );
    const statusJB = await countDB(`${local}_local`, "status", "From JB");

    return {
      complete: completeCount.count,
      total: totalCount.count,
      other,
      pass: passCount.count,
      leadboard: lead,
      status: {
        completed: completeCount.count,
        waiting: statusW.count,
        inProgress: statusP.count,
        inQueue: statusQ.count,
        fromAP: statusAP.count,
        fromS2: statusS2.count,
        fromSA: statusSA.count,
        fromJB: statusJB.count,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error (countAllDB): ${error.message}`);
    } else {
      throw new Error(`Error (countAllDB): ${error}`);
    }
  }
};

type CountAllBranchDBType = {
  total: number;
  status: {
    completed: number;
    inProgress: number;
    inQueue: number;
  };
};

export const countAllBranchDB = async (): Promise<CountAllBranchDBType> => {
  const locals = ["ap", "s2", "sa", "jb"];
  try {
    // Create an array of promises for each count operation for every local entry
    const promises = locals.flatMap((local) => [
      countDB(`${local}_local`, "status", "Completed"),
      countDB(`${local}_local`, "status", "In Progress"),
      countDB(`${local}_local`, "status", "In Queue"),
    ]);

    // Wait for all promises to resolve
    const results = await Promise.all(promises);

    // console.log(results[0]);

    // Process results
    let completed = 0,
      inProgress = 0,
      inQueue = 0;

    for (let i = 0; i < results.length; i += 3) {
      completed += results[i].count;
      inProgress += results[i + 1].count;
      inQueue += results[i + 2].count;
    }

    return {
      total: completed + inProgress + inQueue,
      status: {
        completed,
        inProgress,
        inQueue,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error (countAllBranchDB): ${error.message}`);
    } else {
      throw new Error(`Error (countAllBranchDB): ${error}`);
    }
  }
};

export const countLeadDB = async (
  tableName: string,
  columnName: string,
  array: string[]
): Promise<{ name: string; count: number }[]> => {
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

    const counts = await Promise.all(
      array.map(async (data) => {
        const [{ count }] = await db
          .select({ count: sql<number>`COUNT(*)` })
          .from(table)
          .where(eq(table[columnName as keyof typeof table] as AnyColumn, data))
          .execute();

        return { name: data, count };
      })
    );

    counts.sort((a, b) => b.count - a.count);

    return counts;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error (countLeadDB): ${error.message}`);
    } else {
      throw new Error(`Error (countLeadDB): ${error}`);
    }
  }
};

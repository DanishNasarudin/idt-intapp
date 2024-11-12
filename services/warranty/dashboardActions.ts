"use server";
import connection from "@/lib/mysql";
import { FieldPacket, RowDataPacket } from "mysql2";

export async function countDB(
  tableName: string,
  searchBy: string,
  search: string
): Promise<{ count: number }> {
  try {
    if (search === "") {
      const countQuery = `SELECT COUNT(*) AS count FROM ??`;
      const [countRows] = (await connection.query(countQuery, [tableName])) as [
        RowDataPacket[],
        FieldPacket[]
      ];

      const count = countRows[0].count as number;
      return { count };
    } else {
      const countQuery = `SELECT COUNT(*) AS count FROM ?? WHERE ?? LIKE ?`;
      const [countRows] = (await connection.query(countQuery, [
        tableName,
        searchBy,
        search,
      ])) as [RowDataPacket[], FieldPacket[]];

      const count = countRows[0].count as number;
      return { count };
    }
  } catch (error) {
    throw new Error(`Database error (countDB): ${error}`);
  }
}

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

export async function countAllDB(
  local: string,
  prefix: string,
  leadList: string[]
): Promise<CountAllDBType> {
  try {
    const completeCount = await countDB(
      `${local}_local`,
      "status",
      "Completed"
    );
    const totalCount = await countDB(`${local}_local`, "", "");
    const otherCount = await countDB(
      `${local}_local`,
      "service_no",
      `%${prefix}%`
    );
    const other = totalCount.count - otherCount.count;
    const passCount = await countDB(`${local}_other`, "", "");
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
    throw new Error(`Database error (countAllDB): ${error}`);
  }
}

type CountAllBranchDBType = {
  total: number;
  status: {
    completed: number;
    inProgress: number;
    inQueue: number;
  };
};

export async function countAllBranchDB(): Promise<CountAllBranchDBType> {
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
    throw new Error(`Database error (countAllBranchDB): ${error}`);
  }
}

type CountLead = {
  name: string;
  count: number;
};

export async function countLeadDB(
  tableName: string,
  columnName: string,
  array: string[]
): Promise<{ name: string; count: number }[]> {
  try {
    const counts = await Promise.all(
      array.map(async (data) => {
        const countQuery = `SELECT COUNT(*) AS count FROM ?? WHERE ?? = ?`;
        const [countRows] = (await connection.query(countQuery, [
          tableName,
          columnName,
          data,
        ])) as [RowDataPacket[], FieldPacket[]];

        const count = countRows[0].count as number;
        return { name: data, count };
      })
    );
    counts.sort((a, b) => b.count - a.count);

    return counts;
  } catch (error) {
    throw new Error(`Database error (countLeadDB): ${error}`);
  }
}

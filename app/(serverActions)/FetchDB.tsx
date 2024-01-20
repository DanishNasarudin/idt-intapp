"use server";
import { RowDataPacket, FieldPacket } from "mysql2";
import connection from "@/lib/mysql";
import { format } from "date-fns";

type MyDataType = RowDataPacket & {
  service_no: string;
  date: string;
  pic: string;
  name: string;
  contact: string;
  status: string;
  email: string;
  address: string;
  purchase_date: string;
  invoice: string;
  received_items: string;
  pin: string;
  issues: string;
  solutions: string;
  status_desc: string;
  remarks: string;
};

type UserData = RowDataPacket & {
  id: number;
  email: string;
  roles: string;
};

async function fetchData(
  tableName: string,
  pageSize: number,
  pageNum: number,
  search: string
): Promise<{ rows: MyDataType[]; count: number }> {
  try {
    const searchLike = `%${search}%`;
    const whereClause = search ? `WHERE service_no LIKE ?` : "";

    const query = `SELECT * FROM ?? ${whereClause} ORDER BY service_no DESC LIMIT ? OFFSET ?`;
    const queryParams = search
      ? [tableName, searchLike, pageSize, pageSize * (pageNum - 1)]
      : [tableName, pageSize, pageSize * (pageNum - 1)];
    const [rows] = await connection.query<MyDataType[]>(query, queryParams);

    const countQuery = `SELECT COUNT(*) AS count FROM ??`;
    const [countRows] = (await connection.query(countQuery, [tableName])) as [
      RowDataPacket[],
      FieldPacket[]
    ];

    const count = countRows[0].count as number;

    return { rows: rows, count };
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function getMaxSequence(
  tableName: string,
  serviceNo: string
): Promise<number> {
  const query = `SELECT MAX(service_no) as maxServiceNo FROM ${tableName} WHERE service_no LIKE ?`;
  const [rows] = await connection.query<RowDataPacket[]>(query, [serviceNo]);
  if (rows.length > 0 && rows[0].maxServiceNo) {
    return parseInt(rows[0].maxServiceNo.slice(-3), 10);
  }
  return 0;
}

async function addData(tableName: string): Promise<void> {
  try {
    let prefix = "";
    if (tableName === "ap_local") {
      prefix = "WAP";
    } else if (tableName === "s2_local") {
      prefix = "WSS";
    } else if (tableName === "sa_local") {
      prefix = "WSA";
    } else if (tableName === "jb_local") {
      prefix = "WJB";
    }

    const year = new Date().getFullYear().toString().substr(-2); // Get the last two digits of the year
    const month = `0${new Date().getMonth() + 1}`.slice(-2); // Get the month in two-digit format

    // Query the database to find the last service_no for the current year and month

    const likePattern = `${prefix}${year}${month}%`;

    const tables = ["ap_local", "s2_local", "sa_local", "jb_local"];

    // Get the highest sequence number across all tables
    const maxSequences = await Promise.all(
      tables.map((table) => getMaxSequence(table, likePattern))
    );
    const maxSequence = Math.max(...maxSequences, 0);

    // Increment the sequence number
    const sequenceNumber = maxSequence + 1;

    // Construct the service_no
    const serviceNo = `${prefix}${year}${month}${`00${sequenceNumber}`.slice(
      -3
    )}`;

    //   const query = `
    //   SELECT service_no FROM ${tableName}
    //   WHERE service_no LIKE ?
    //   ORDER BY service_no DESC
    //   LIMIT 1
    // `;
    // const [rows] = await connection.query<MyDataType[]>(query, [likePattern]);

    // let sequenceNumber = 1; // Default sequence number
    // if (rows.length > 0) {
    //   // Extract the numeric part of the service_no and increment it
    //   const lastSequenceNumber = parseInt(rows[0].service_no.slice(-3), 10);
    //   sequenceNumber = lastSequenceNumber + 1;
    // }

    // // Construct the service_no using the prefix, year, month, and next sequence number
    // const serviceNo = `${prefix}${year}${month}${`00${sequenceNumber}`.slice(
    //   -3
    // )}`;

    const today = new Date();
    const formattedDate = format(today, "dd/MM/yyyy");
    const status = "Pending";

    const query2 = `INSERT INTO ${tableName} (service_no, date, status) VALUES (?, ?, ?)`;
    await connection.query(query2, [serviceNo, formattedDate, status]);
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function updateData(
  tableName: string,
  id: string,
  column: string,
  value: string
): Promise<void> {
  try {
    if (id != "") {
      const query = `UPDATE ${tableName} SET ?? = ? WHERE service_no = ?`;
      await connection.query(query, [column, value, id]);
    }
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function deleteData(tableName: string, id: string): Promise<void> {
  try {
    if (id != "") {
      const query = `DELETE FROM ${tableName} WHERE service_no = ?`;
      await connection.query(query, [id]);
    }
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function updateAllData(
  tableName: string,
  id: string,
  changes: Record<string, string | null>
): Promise<void> {
  try {
    if (id != "") {
      const entries = Object.entries(changes);
      const setClause = entries
        .map(([column, value]) => `\`${column}\` = ?`)
        .join(", ");
      const values = entries.map(([, value]) => value);

      if (setClause) {
        const query = `UPDATE ${tableName} SET ${setClause} WHERE service_no = ?`;
        await connection.query(query, [...values, id]);
      }
    }
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function moveData(
  fromTable: string,
  toTable: string,
  id: string
): Promise<void> {
  try {
    if (id != "") {
      const queryCheck = `SELECT * FROM ?? WHERE service_no = ?`;
      const check = await connection.query(queryCheck, [toTable, id]);
      if (check) {
        deleteData(toTable, id);
      }
      const queryMove = `INSERT INTO ?? SELECT * FROM ?? WHERE service_no = ?`;
      await connection.query(queryMove, [toTable, fromTable, id]);
    }
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function fetchUsers(): Promise<UserData[]> {
  try {
    const query = `SELECT * FROM auth_users`;
    const [rows] = await connection.query<UserData[]>(query);

    return rows;
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function searchUser(
  email: string | null | undefined
): Promise<UserData | null> {
  try {
    if (email === null || email === undefined) return null;
    const query = `SELECT * FROM auth_users WHERE email = ?`;
    const [rows] = await connection.query<UserData[]>(query, [email]);
    // console.log(rows, "check users");

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function updateDBGeneral(
  table: string,
  columnId: string,
  id: string,
  column: string,
  value: string
): Promise<void> {
  try {
    if (id != "") {
      console.log(table, columnId, id, column, value, "check");
      const query = `UPDATE ${table} SET ?? = ? WHERE ?? = ?`;
      await connection.query(query, [column, value, columnId, id]);
    }
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function addDBGeneral(
  table: string,
  columnId: string,
  id: string
): Promise<void> {
  try {
    if (id != "") {
      const query = `INSERT INTO ${table} (??) VALUES (?)`;
      await connection.query(query, [columnId, id]);
    }
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function deleteDBGeneral(
  table: string,
  columnId: string,
  id: string
): Promise<void> {
  try {
    if (id != "") {
      const query = `DELETE FROM ${table} WHERE ?? = ?`;
      await connection.query(query, [columnId, id]);
    }
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

export {
  fetchData,
  updateData,
  addData,
  deleteData,
  updateAllData,
  moveData,
  fetchUsers,
  searchUser,
  updateDBGeneral,
  addDBGeneral,
  deleteDBGeneral,
};

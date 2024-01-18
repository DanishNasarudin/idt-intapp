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

// async function checkExists(
//   tableName: string,
//   serviceNo: string
// ): Promise<boolean> {
//   const query = `SELECT 1 FROM ?? WHERE service_no = ? LIMIT 1`;
//   const [rows] = await connection.query(query, [tableName, serviceNo]);
//   return rows.length > 0;
// }

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
    const query = `
    SELECT service_no FROM ${tableName}
    WHERE service_no LIKE ?
    ORDER BY service_no DESC
    LIMIT 1
  `;
    const likePattern = `${prefix}${year}${month}%`;
    const [rows] = await connection.query<MyDataType[]>(query, [likePattern]);

    let sequenceNumber = 1; // Default sequence number
    if (rows.length > 0) {
      // Extract the numeric part of the service_no and increment it
      const lastSequenceNumber = parseInt(rows[0].service_no.slice(-3), 10);
      sequenceNumber = lastSequenceNumber + 1;
    }

    // Construct the service_no using the prefix, year, month, and next sequence number
    const serviceNo = `${prefix}${year}${month}${`00${sequenceNumber}`.slice(
      -3
    )}`;

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

export { fetchData, updateData, addData, deleteData, updateAllData, moveData };

// const API_URL = "https://intapi.idealtech.com.my";
// const API_KEY = process.env.DB_API_KEY || ""; // Replace with your actual API key

// async function insertData(tableName: string, data: MyDataType): Promise<any> {
//   const response = await fetch(`${API_URL}/insert/${tableName}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "API-Key": API_KEY,
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error(`Error: ${response.status}`);
//   }

//   return response.json();
// }

// async function updateData(
//   tableName: string,
//   id: number,
//   data: Partial<MyDataType>
// ): Promise<any> {
//   const response = await fetch(`${API_URL}/update/${tableName}/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       "API-Key": API_KEY,
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error(`Error: ${response.status}`);
//   }

//   return response.json();
// }

// async function deleteData(tableName: string, id: number): Promise<any> {
//   const response = await fetch(`${API_URL}/delete/${tableName}/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       "API-Key": API_KEY,
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`Error: ${response.status}`);
//   }

//   return response.json();
// }

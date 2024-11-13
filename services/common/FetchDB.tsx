"use server";
import connection from "@/lib/mysql";
import { format } from "date-fns";
import { FieldPacket, RowDataPacket } from "mysql2";
import { BranchFormat, BranchType } from "../../app/warranty/[branch]/page-old";

export type WarrantyDataType = {
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

type MyDataType = RowDataPacket & WarrantyDataType;

type UserData = RowDataPacket & {
  id: number;
  email: string;
  roles: string;
};

type SortType = {
  type: string;
  direction: string;
};

export async function fetchData(
  tableName: string,
  pageSize: number,
  pageNum: number,
  search: string,
  searchBy: string,
  sortList: SortType[]
): Promise<{ rows: MyDataType[]; count: number }> {
  try {
    let searchFilter;
    if (searchBy === "By: Service No") {
      searchFilter = "service_no";
    } else if (searchBy === "By: Name") {
      searchFilter = "name";
    } else if (searchBy === "By: Email") {
      searchFilter = "email";
    } else if (searchBy === "By: PIC") {
      searchFilter = "pic";
    } else if (searchBy === "By: Contact") {
      searchFilter = "contact";
    }
    const searchLike = `%${search}%`;
    const whereClause = search ? `WHERE ${searchFilter} LIKE ?` : "";

    let orderClause: any = [];
    if (sortList) {
      const statusOrder = `CASE status
                        WHEN 'From Ampang' THEN 1
                        WHEN 'From SS2' THEN 2
                        WHEN 'From Setia Alam' THEN 3
                        WHEN 'From JB' THEN 4
                         WHEN 'In Queue' THEN 5 
                         WHEN 'In Progress' THEN 6 
                         WHEN 'Waiting For' THEN 7 
                         WHEN 'Completed' THEN 8 
                         ELSE 9 END`;
      const statusOrderRev = `CASE status
      WHEN 'Completed' THEN 1 
      WHEN 'Waiting For' THEN 2 
      WHEN 'In Progress' THEN 3 
      WHEN 'In Queue' THEN 4 
      WHEN 'From JB' THEN 5
      WHEN 'From Setia Alam' THEN 6
      WHEN 'From SS2' THEN 7
      WHEN 'From Ampang' THEN 8
                         ELSE 9 END`;
      // sortList.forEach((sort) => {
      //   if (sort.type === "status" && sort.direction === "ASC")
      //     orderClause.push(statusOrder);
      //   if (sort.type === "status" && sort.direction === "DESC")
      //     orderClause.push(statusOrderRev);
      // });
      sortList.forEach((sort) => {
        if (sort.type === "status" && sort.direction === "ASC")
          orderClause.push(statusOrder);
        if (sort.type === "status" && sort.direction === "DESC")
          orderClause.push(statusOrderRev);
        if (sort.type === "status") return sort;
        orderClause.push(`${sort.type} ${sort.direction}`);
      });
    }

    // const dateOrder = sortDate ? "date ASC" : "date DESC";

    // console.log(orderClause);

    const orderClauseString = orderClause.length
      ? `ORDER BY ${orderClause.join(", ")}`
      : "";

    // console.log(orderClauseString);
    const query = `SELECT * FROM ?? ${whereClause} ${orderClauseString} LIMIT ? OFFSET ?`;
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
    throw new Error(`Database error (fetchData): ${error}`);
  }
}

export async function fetchHistoryData(
  tableName: string,
  search: string
): Promise<{ rows: RowDataPacket[] }> {
  try {
    const searchLike = `%${search}%`;
    const whereClause = search ? `WHERE service_no LIKE ?` : "";

    const query = `SELECT * FROM ?? ${whereClause} ORDER BY history_id DESC LIMIT 500`;
    const queryParams = search ? [tableName, searchLike] : [tableName];
    const [data] = await connection.query<RowDataPacket[]>(query, queryParams);
    // console.log(data);

    return { rows: data };
  } catch (error) {
    throw new Error(`Database error (fetchHistoryData): ${error}`);
  }
}

type SearchDataType = RowDataPacket & {
  service_no: string;
  date: string;
  pic: string;
  status: string;
  issues: string;
};

export async function searchData(
  search: string
): Promise<{ rows: SearchDataType[] }> {
  const tables = ["ap_local", "s2_local", "sa_local", "jb_local"];
  const searchLike = `%${search}%`;

  try {
    const searchPromises = tables.map((table) => {
      const whereClause = search ? `WHERE service_no LIKE ?` : "";
      const query = `SELECT service_no, date, pic, status, issues FROM ${table} ${whereClause}`;

      const queryParams = search ? [searchLike] : [];

      return connection.query<SearchDataType[]>(query, queryParams);
    });

    // Execute all search queries concurrently
    const results = await Promise.all(searchPromises);

    // Aggregate results from all tables
    const aggregatedRows = results.flatMap(([rows]) => rows);

    return { rows: aggregatedRows };
  } catch (error) {
    throw new Error(`Database error (searchData): ${error}`);
  }
}

export async function getMaxSequence(
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

export async function addData(
  tableName: string
): Promise<{ date: string; serviceNo: string }> {
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

    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");
    const status = "In Queue";

    const query2 = `INSERT INTO ${tableName} (service_no, date, status) VALUES (?, ?, ?)`;
    await connection.query(query2, [serviceNo, formattedDate, status]);
    return { date: formattedDate, serviceNo };
  } catch (error) {
    throw new Error(`Database error (addData): ${error}`);
  }
}

export async function updateData(
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
    throw new Error(`Database error (updateData): ${error}`);
  }
}

export async function deleteData(tableName: string, id: string): Promise<void> {
  try {
    if (id != "") {
      const query = `DELETE FROM ${tableName} WHERE service_no = ?`;
      await connection.query(query, [id]);
    }
  } catch (error) {
    throw new Error(`Database error (deleteData): ${error}`);
  }
}

export async function updateAllData(
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
    throw new Error(`Database error (updateAllData): ${error}`);
  }
}

export async function moveData(
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
    throw new Error(`Database error (moveData): ${error}`);
  }
}

export async function moveBranchData(
  toTable: number,
  id: string,
  value: string,
  branch: BranchType | null,
  branchFormat: BranchFormat
) {
  const poolConnect = await connection.getConnection();
  try {
    await poolConnect.beginTransaction();

    if (branch === null) throw new Error("Branch is null");

    await moveData(branch.data_local, branch.data_other, id);
    await updateData(branch.data_local, id, "status", value);
    await moveData(
      branch.data_local,
      branchFormat.branch[toTable].data_local,
      id
    );
    await deleteData(branch.data_local, id);

    await poolConnect.commit();
  } catch (error) {
    await poolConnect.rollback();
    throw new Error(`Database error (moveBranchData): ${error}`);
  } finally {
    poolConnect.release();
  }
}

export async function fetchUsers(): Promise<UserData[]> {
  try {
    const query = `SELECT * FROM auth_users`;
    const [rows] = await connection.query<UserData[]>(query);

    return rows;
  } catch (error) {
    throw new Error(`Database error (fetchUsers): ${error}`);
  }
}

export async function searchUser(
  email: string | null | undefined
): Promise<UserData | null> {
  try {
    if (email === null || email === undefined) return null;
    const query = `SELECT * FROM auth_users WHERE email = ?`;
    const [rows] = await connection.query<UserData[]>(query, [email]);
    // console.log(rows, "check users");

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw new Error(`Database error (searchUser): ${error}`);
  }
}

export async function updateDBGeneral(
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
    throw new Error(`Database error (updateDBGeneral): ${error}`);
  }
}

export async function addDBGeneral(
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
    throw new Error(`Database error (addDBGeneral): ${error}`);
  }
}

export async function deleteDBGeneral(
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
    throw new Error(`Database error (deleteDBGeneral): ${error}`);
  }
}

"use server";
import connection from "@/lib/mysql";
import { RowDataPacket } from "mysql2";
import { revalidatePath } from "next/cache";

export const addStaffBranch = async (
  name: string,
  branch: string,
  color: string
) => {
  try {
    const query = `INSERT INTO warranty_staff_branch (name, branch, color) VALUES (?,?,?)`;
    await connection.query(query, [name, branch, color]);
    revalidatePath("/warranty/settings");
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error (addStaffBranch): ${e.message}`);
    } else {
      throw new Error(`Error (addStaffBranch): ${e}`);
    }
  }

  // const query2 = `INSERT INTO ${tableName} (service_no, date, status) VALUES (?, ?, ?)`;
  // await connection.query(query2, [serviceNo, formattedDate, status]);
};

export type StaffBranchType = {
  id: number;
  name: string;
  branch: string;
  color: string;
};

type StaffBranchTypeMysql = RowDataPacket & StaffBranchType;

export const fetchStaffBranch = async (): Promise<StaffBranchTypeMysql[]> => {
  try {
    const query = `SELECT * FROM warranty_staff_branch`;
    const [rows] = await connection.query<StaffBranchTypeMysql[]>(query);
    // revalidatePath("/warranty/settings")
    return rows;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error (fetchStaffBranch): ${e.message}`);
    } else {
      throw new Error(`Error (fetchStaffBranch): ${e}`);
    }
  }
};

export const updateStaffBranch = async (
  colType: string,
  colTypeName: string,
  colId: string,
  id: number
) => {
  try {
    const query = `UPDATE warranty_staff_branch SET ?? = ? WHERE ?? = ?`;
    await connection.query(query, [colType, colTypeName, colId, id]);
    revalidatePath("/warranty/settings");
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error (updateStaffBranch): ${e.message}`);
    } else {
      throw new Error(`Error (updateStaffBranch): ${e}`);
    }
  }

  // const query = `UPDATE ${table} SET ?? = ? WHERE ?? = ?`;
  //     await connection.query(query, [column, value, columnId, id]);
};

export const deleteStaffBranch = async (id: number) => {
  try {
    const query = `DELETE FROM warranty_staff_branch WHERE ?? = ?`;
    await connection.query(query, ["id", id]);
    revalidatePath("/warranty/settings");
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error (updateStaffBranch): ${e.message}`);
    } else {
      throw new Error(`Error (updateStaffBranch): ${e}`);
    }
  }
};

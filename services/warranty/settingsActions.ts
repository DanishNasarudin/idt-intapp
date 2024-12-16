"use server";
import db from "@/db/db";
import { warrantyStaffBranch } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addStaffBranch = async (
  name: string,
  branch: string,
  color: string
) => {
  try {
    await db
      .insert(warrantyStaffBranch)
      .values({
        name,
        branch,
        color,
      })
      .execute();

    revalidatePath("/warranty/settings");
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error (addStaffBranch): ${e.message}`);
    } else {
      throw new Error(`Error (addStaffBranch): ${e}`);
    }
  }
};

export type StaffBranchType = {
  id: bigint;
  name: string;
  branch: string;
  color: string;
};

export const fetchStaffBranch = async (): Promise<StaffBranchType[]> => {
  try {
    const rows = await db.select().from(warrantyStaffBranch).execute();
    return rows as StaffBranchType[];
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error (fetchStaffBranch): ${e.message}`);
    } else {
      throw new Error(`Error (fetchStaffBranch): ${e}`);
    }
  }
};

export const updateStaffBranch = async (
  colType: keyof StaffBranchType,
  colTypeName: string,
  colId: keyof StaffBranchType,
  id: bigint
) => {
  try {
    await db
      .update(warrantyStaffBranch)
      .set({
        [colType]: colTypeName,
      })
      .where(eq(warrantyStaffBranch[colId], id))
      .execute();

    revalidatePath("/warranty/settings");
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error (updateStaffBranch): ${e.message}`);
    } else {
      throw new Error(`Error (updateStaffBranch): ${e}`);
    }
  }
};

export const deleteStaffBranch = async (id: bigint) => {
  try {
    await db
      .delete(warrantyStaffBranch)
      .where(eq(warrantyStaffBranch.id, id))
      .execute();

    revalidatePath("/warranty/settings");
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error (deleteStaffBranch): ${e.message}`);
    } else {
      throw new Error(`Error (deleteStaffBranch): ${e}`);
    }
  }
};

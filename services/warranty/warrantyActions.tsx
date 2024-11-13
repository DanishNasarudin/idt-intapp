"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type WarrantyDataType = {
  service_no: string;
  date: string;
  pic: string;
  received_by: string;
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
    const { table } =
      tableName === "ap_local" ? { table: "ap_local" } : { table: "s2_local" };

    let searchFilter: keyof WarrantyDataType | undefined;
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

    const where = searchFilter
      ? {
          [searchFilter]: {
            contains: search,
          },
        }
      : {};

    const statusOrderAsc = Prisma.sql`CASE 
      WHEN status = 'From Ampang' THEN 1
      WHEN status = 'From SS2' THEN 2
      WHEN status = 'From Setia Alam' THEN 3
      WHEN status = 'From JB' THEN 4
      WHEN status = 'In Queue' THEN 5
      WHEN status = 'In Progress' THEN 6
      WHEN status = 'Waiting For' THEN 7
      WHEN status = 'Completed' THEN 8
      ELSE 9 END`;

    const statusOrderDesc = Prisma.sql`CASE 
      WHEN status = 'Completed' THEN 1
      WHEN status = 'Waiting For' THEN 2
      WHEN status = 'In Progress' THEN 3
      WHEN status = 'In Queue' THEN 4
      WHEN status = 'From JB' THEN 5
      WHEN status = 'From Setia Alam' THEN 6
      WHEN status = 'From SS2' THEN 7
      WHEN status = 'From Ampang' THEN 8
      ELSE 9 END`;

    const orderBy: any[] = sortList.map((sort) => {
      if (sort.type === "status") {
        return {
          orderBy: sort.direction === "asc" ? statusOrderAsc : statusOrderDesc,
        };
      }
      return { [sort.type]: sort.direction };
    });

    let rows: WarrantyDataType[];

    switch (tableName) {
      case "ap_local":
        rows = (await prisma.ap_local.findMany({
          where,
          orderBy,
          skip: (pageNum - 1) * pageSize,
          take: pageSize,
        })) as WarrantyDataType[];
        break;
      case "s2_local":
        rows = (await prisma.s2_local.findMany({
          where,
          orderBy,
          skip: (pageNum - 1) * pageSize,
          take: pageSize,
        })) as WarrantyDataType[];
        break;
      case "sa_local":
        rows = (await prisma.sa_local.findMany({
          where,
          orderBy,
          skip: (pageNum - 1) * pageSize,
          take: pageSize,
        })) as WarrantyDataType[];
        break;
      case "jb_local":
        rows = (await prisma.jb_local.findMany({
          where,
          orderBy,
          skip: (pageNum - 1) * pageSize,
          take: pageSize,
        })) as WarrantyDataType[];
        break;
      default:
        throw new Error(`Unknown table name: ${tableName}`);
    }

    return rows.length > 0 ? rows : [];
  } catch (e) {
    throw new Error(`Database error (getDataByFilter): ${e}`);
  }
};

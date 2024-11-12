"use server";
import { clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function fetchClerkUser(): Promise<
  { id: number; email: string | null; roles: string }[]
> {
  // console.log(userId);
  try {
    const users = await clerkClient.users.getUserList({ limit: 20 });
    const listUsers = users.reverse().map((user, key) => {
      return {
        id: key,
        email: user.emailAddresses[0]
          ? user.emailAddresses[0].emailAddress
          : null,
        roles: user.privateMetadata.role
          ? (user.privateMetadata.role as string)
          : "",
      };
    });
    // console.log(listUsers);
    return listUsers;
  } catch (error) {
    throw new Error(`Database error (fetchClerkUser): ${error}`);
  }
}

export async function createClerkUser(email: string): Promise<void> {
  // console.log(userId);
  try {
    await clerkClient.users.createUser({
      emailAddress: [email],
      privateMetadata: { role: "Normal" },
    });
    revalidatePath("/warranty/settings");
  } catch (error) {
    throw new Error(`Database error (createClerkUser): ${error}`);
  }
}

export async function updateClerkUser(
  prevEmail: string,
  role: string
): Promise<void> {
  // console.log(userId);
  try {
    const users = await clerkClient.users.getUserList({ limit: 20 });
    const listUsers = users.reverse().map((user, key) => {
      return {
        id: user.id,
        email: user.emailAddresses[0]
          ? user.emailAddresses[0].emailAddress
          : null,
        roles: user.privateMetadata.role,
      };
    });

    const userIdSearch = listUsers.filter((user) => user.email === prevEmail);
    const userId = userIdSearch[0].id;
    // console.log(users);

    await clerkClient.users.updateUser(userId, {
      privateMetadata: { role: role },
    });
    revalidatePath("/warranty/settings");
  } catch (error) {
    throw new Error(`Database error (updateClerkUser): ${error}`);
  }
}

export async function deleteClerkUser(prevEmail: string): Promise<void> {
  // console.log(userId);
  try {
    const users = await clerkClient.users.getUserList({ limit: 20 });
    const listUsers = users.reverse().map((user, key) => {
      return {
        id: user.id,
        email: user.emailAddresses[0]
          ? user.emailAddresses[0].emailAddress
          : null,
        roles: user.privateMetadata.role,
      };
    });

    const userIdSearch = listUsers.filter((user) => user.email === prevEmail);
    const userId = userIdSearch[0].id;
    // console.log(users);

    await clerkClient.users.deleteUser(userId);
    revalidatePath("/warranty/settings");
  } catch (error) {
    throw new Error(`Database error (deleteClerkUser): ${error}`);
  }
}

export async function adminClerkUser(id: string): Promise<boolean> {
  // console.log(userId);
  try {
    const users = await clerkClient.users.getUserList({ limit: 20 });
    const listUsers = users.reverse().map((user, key) => {
      return {
        id: user.id,
        email: user.emailAddresses[0]
          ? user.emailAddresses[0].emailAddress
          : null,
        roles: user.privateMetadata.role
          ? (user.privateMetadata.role as string)
          : "",
      };
    });

    const userIdSearch = listUsers.filter((user) => user.id === id);
    const userId = userIdSearch[0];
    // console.log(listUsers);
    if (userId.roles === "Admin") return true;
    else return false;
  } catch (error) {
    throw new Error(`Database error (adminClerkUser): ${error}`);
  }
}

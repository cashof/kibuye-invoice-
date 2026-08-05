"use server";

import { company } from "@/db/schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function userCompany() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  // Fetch the data and limit the response to 1 item
  const result = await db
    .select()
    .from(company)
    .where(eq(company.ownerId, session.user.id)) // Uses the correct company table name reference
    .limit(1);

  return {
    success: true,
    data: result[0] || null, // Grabs the first item from the array safely
  };
}

export async function GetClients() {
  const result = await userCompany();

  if (!result.success || !result.data) {
    throw new Error("Company not found");
  }

  return await db.query.clients.findMany({
    where: eq(clients.companyId, result.data.id),
    orderBy: (clients, { asc }) => [asc(clients.name)],
  });
}
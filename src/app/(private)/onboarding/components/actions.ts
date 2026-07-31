"use server"
import { userType } from "@/db/schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserTypeType } from "@/utils/types";


import { headers } from "next/headers";


export async function userTypeAction(data: UserTypeType){
    const session = await auth.api.getSession({
        headers: await headers() 
    })
      if (!session) {
        throw new Error("Unauthorized");
      }

     await db
    .insert(userType)
    .values({
        userId: session.user.id, 
        usertype: data.usertype
    })
    return {
      success: true,
    };
}
"use server"
import { companies, userType } from "@/db/schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { onboardingcompanyType, UserTypeType } from "@/utils/types";


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


export async function onboardingCompanyAction(data: onboardingcompanyType){
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized");
  }
  await db.insert(companies).values({
    ownerId: session.user.id,
    name: data.name,
    telephoneNumber: data.telephoneNumber,
    location: data.location,
    description: data.description,
    logo: data.logo,
    POBox: data.POBox,
    
  });

}
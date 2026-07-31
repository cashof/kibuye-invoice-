import React, { ReactNode } from 'react'

import { headers } from "next/headers";
import { auth } from '@/lib/auth';


    
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized");
  }
  return (
    <div className="min-h-full grid grid-cols-1 md:grid-cols-3 ">
      <div className="col-span-1 ">
      
      </div>
      <div className="col-span-2">{children}</div>
    </div>
  );
}

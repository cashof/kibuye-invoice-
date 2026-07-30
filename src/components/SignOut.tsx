"use client"
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { Spinner } from './ui/spinner';

export default function SignOut() {
    const [isloading, setIsloading] =  useState(false)
    const router = useRouter()
    const signout = async ()=>{
        setIsloading(true)
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/login"); // redirect to login page
            },
          },
        });
        setIsloading(false)
    }
  return (
    <div>
      <Button
        variant={"outline"}
        onClick={signout}
        className={"flex justify-center items-center flex-1"}
        disabled={isloading}
      >
        {isloading ? (
          <div className="flex flex-1 justify-center items-center gap-2">
            <LogOut />
            SignOut
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-1 justify-center items-center gap-2">
            <LogOut />
            SignOut
          </div>
        )}
      </Button>
    </div>
  );
}

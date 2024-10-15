/** @format */

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat With PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="mt-2 flex">
            {isAuth && <Button> Go to Chats</Button>}
          </div>

          <p className="max-w-xl mt-1 text-lg">
            Join millions of students, researchers and professionals to
            instantly answer questions and understand research with AI
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <h1>fileUpload</h1>
            ) : (
              <Link href={"/sign-in"}>
                <Button>
                  Login to get Started
                  <LogIn className="inline-block w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

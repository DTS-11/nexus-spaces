"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const { data: session } = useSession();

  if (session) {
    return (
      // Create Home Page
      <div className="flex flex-col items-center justify-center h-screen w-full bg-black text-white">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-4xl font-bold">Nexus Spaces</h1>
          <p className="text-lg">
            Nexus Spaces is a social media platform for developers, designers and
            other skilled individuals.
          </p>
          <p className="text-lg">
            Join the community and connect with like-minded individuals.
          </p>
          <Link href="/chat">
            <Button>Open Chat</Button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-black text-white">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-4xl font-bold">Nexus Spaces</h1>
          <p className="text-lg">
            Nexus Spaces is a social media platform for developers, designers and
            other skilled individuals.
          </p>
          <p className="text-lg">
            Join the community and connect with like-minded individuals.
          </p>
          <Link href="/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }
}
import { SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";
import React from "react";

export const dynamic = "force-static";

const page = () => {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24 text-black">
      <p>
        Hello from a page, unmatched by clerk middleware because we didn&apos;t
        include it in the middleware matcher config, where auth doesn&apos;t
        work
      </p>
      <SignedIn>
        <UserProfile />
      </SignedIn>
      <SignedOut>
        <p>Sign in to see more</p>
      </SignedOut>
    </main>
  );
};

export default page;

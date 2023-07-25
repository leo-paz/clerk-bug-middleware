import { SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";
import React from "react";
import Ui from "./ui";

export const dynamic = "force-static";

const page = () => {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24 text-black bg-white">
      <p>
        Hello from a <b>static</b> page, where auth works because we hydrate the
        page server-side with auth-dependant data
      </p>
      <pre>{JSON.stringify({ static: "data" }, null, 4)}</pre>
      <Ui />
    </main>
  );
};

export default page;

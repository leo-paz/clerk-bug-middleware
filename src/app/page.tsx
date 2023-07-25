import { SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24 text-black">
      <p>
        Hello from a server page, matched by clerk middleware, where auth works
      </p>
      <SignedIn>
        <UserProfile />
      </SignedIn>
      <SignedOut>
        <p>Sign in to see more</p>
      </SignedOut>
    </main>
  );
}

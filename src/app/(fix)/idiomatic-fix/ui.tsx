import { SignInButton, SignedIn, SignedOut, UserButton, UserProfile } from "@clerk/nextjs";

const Ui = () => {
  return <>
    {/* <SignedIn>
      <UserButton />
    </SignedIn>
    <SignedOut>
      <SignInButton />
    </SignedOut> */}
    <UserProfile />
  </>;
};

export default Ui;

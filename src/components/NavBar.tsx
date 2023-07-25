import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center flex-shrink-0">
              <span className="self-center text-2xl font-semibold text-white whitespace-nowrap">
                Simple NavBar
              </span>
            </a>
          </div>
          <SignedIn>
            <UserButton afterSignOutUrl="/" userProfileUrl="/profile" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="redirect">You need to sign in</SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

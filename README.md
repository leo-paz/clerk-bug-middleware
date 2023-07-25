# clerk-bug-middleware

> Minimal reproducible example for the issue discussed [here](https://github.com/clerkinc/clerk-next-app-router-starter/issues/2)

> Clerk: auth() was called but it looks like you aren't using authMiddleware in your middleware file. Please use authMiddleware and make sure your middleware matcher is configured correctly and it matches this route or page

## Usage

First setup your clerk app and replace the env variables from .env.example in your .env.local

```sh
npm i
npm run dev
```

Then:

- `open http://localhost:3000/` -> this works, as expected
- `open http://localhost:3000/expected-unmatched` -> this does not work, as expected
- `open http://localhost:3000/error` -> this does not work and this is the issue

## Findings

In my findings, static pages that rely on auth data seem to be the culprit.

For example, this line for the /error page triggers the error:

```ts
export const dynamic = "force-static";
```

But if you add back `"use client"` to the page, the error disappears.
This is because the page had a layout which used a Navbar which in turns uses clerk auth data.
But a truly static page cannot rely on auth data since the data is static.

For the other pages in this codebase - including with the `"use client"` pseudo-fix - next.js silently turn the pages into server-side rendered pages. You can see for yourself by running `npm run build` and look for these lines (the output of npm run build is attached at the end):

```txt
λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

So, how to keep using static pages together with clerk auth data (for example from a Navbar)?
I have managed to make it work by extracting auth-dependant data to a separate component which is hydrated into the static page.

Further investigation:
- nextjs docs are clear https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering 
  > By default, Next.js statically renders routes to improve performance. [...] During static rendering, if a dynamic function [...] is discovered, Next.js will switch to dynamically rendering the whole route at request time. [...] Dynamic functions rely on information that can only be known at request time such as a user's cookies, current requests headers, or the URL's search params.
- by reading the clerk source code, we find such dynamic function call with `headers()` called here https://github.com/clerkinc/javascript/blob/main/packages/nextjs/src/app-beta/auth.ts which is used to set the initial state of `<ClerkProvider/>` in https://github.com/clerkinc/javascript/blob/main/packages/nextjs/src/app-beta/ClerkProvider.tsx
- (also) clerk devs have setup a playground for nextjs app router https://github.com/clerkinc/javascript/tree/main/playground/app-router



```sh
→ npm run build

> clerk-bug-middleware@0.1.0 build
> next build

- info Loaded env from /Users/louis.guitton/workspace/clerk-bug-middleware/.env.local
- info Creating an optimized production build
- info Compiled successfully
- info Linting and checking validity of types
- info Collecting page data
- info Generating static pages (7/7)
- info Finalizing page optimization

Route (app)                                Size     First Load JS
┌ λ /                                      1.19 kB        91.5 kB
├ λ /error                                 19.5 kB         110 kB
├ λ /expected-unmatched                    1.19 kB        91.5 kB
├ ○ /favicon.ico                           0 B                0 B
├ ○ /idiomatic-fix                         1.19 kB        91.5 kB
├ λ /sign-in/[[...sign-in]]                1.19 kB        91.5 kB
└ λ /sign-up/[[...sign-up]]                1.18 kB        91.5 kB
+ First Load JS shared by all              90.3 kB
  ├ chunks/52-0b19101870ca2da7.js          12.2 kB
  ├ chunks/596-02dd902429d6b491.js         25.7 kB
  ├ chunks/fd9d1056-6becc0648d5029ca.js    50.5 kB
  ├ chunks/main-app-830910d2db03a3b7.js    214 B
  └ chunks/webpack-7d349c12197dee14.js     1.7 kB

Route (pages)                              Size     First Load JS
─ ○ /404                                   182 B          75.8 kB
+ First Load JS shared by all              75.6 kB
  ├ chunks/framework-8883d1e9be70c3da.js   45 kB
  ├ chunks/main-a48cf18973c7929a.js        28.7 kB
  ├ chunks/pages/_app-52924524f99094ab.js  195 B
  └ chunks/webpack-7d349c12197dee14.js     1.7 kB

ƒ Middleware                               167 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

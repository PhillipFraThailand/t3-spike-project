// middleware.ts is a filename that tells next.js to treat this file as a middleware
import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// If you want to make other routes public, check out https://clerk.com/docs/references/nextjs/auth-middleware

export default authMiddleware({
    beforeAuth: async () => console.log('middleware beforeAuth'),
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

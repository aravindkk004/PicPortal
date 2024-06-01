export { default } from "next-auth/middleware";

export const config = { matcher: ["/", "/createPost", "/savedPost", "/profile", "/followers", "/following", "/peoples", "/userProfile"] };

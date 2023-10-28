import TwitterProvider from "next-auth/providers/twitter";
import NextAuth from "next-auth/next";

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWEETER_CLIENT_ID,
      clientSecret: process.env.TWEETER_CLIENT_SECRET,
      version: "2.0",
    }),
  ],
});

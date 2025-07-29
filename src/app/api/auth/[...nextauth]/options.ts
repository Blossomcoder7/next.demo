import connectDb from "@/_lib/mongodb";
import ClientModel from "@/_models/users/client/Client";
import UserModel from "@/_models/users/user/User";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import { AuthOptions } from "next-auth";

const sanitizeUser = (user: any) => {
  const obj = user.toObject?.() || user;
  const { password, __v, createdAt, updatedAt, ...cleaned } = obj;
  cleaned.id = user._id?.toString();
  return cleaned;
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDb();

        const user =
          (await UserModel.findOne({ email: credentials?.email })) ||
          (await ClientModel.findOne({ email: credentials?.email }));

        if (!user) throw new Error("User not found");

        const isMatch = await user.matchPassword(credentials!.password);
        if (!isMatch) throw new Error("Invalid password");

        return sanitizeUser(user); // Return all fields except sensitive ones
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      await connectDb();
      console.log({ user, account });
      // From Google OAuth
      if (account?.provider === "google" && token?.email) {
        const existingUser =
          (await UserModel.findOne({ email: token.email })) ||
          (await ClientModel.findOne({ email: token.email }));

        const userToUse = existingUser
          ? existingUser
          : await UserModel.create({
              firstName: token.name?.split(" ")[0] || "Guest",
              lastName: token.name?.split(" ")[1] || "User",
              email: token.email,
              avatar: token.picture,
              provider: "google",
            });

        console.log({
          user,
          userToUse,
          u: token.user,
        });
        token.user = sanitizeUser(userToUse);
      } else if (account?.provider === "credentials") {
        token.user = user;
      }

      return token;
    },

    async session({ session, token }) {
      console.log({
        session,
        token,
      });
      if (token?.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

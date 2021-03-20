/* eslint-disable no-throw-literal */
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { getUser } from "../../../api/db";
import { Token } from "../../../types";

const secret = process.env.SECRET;

export default NextAuth({
  secret,
  callbacks: {
    async jwt(token, user) {
      // Adds user fields to token
      const result = token;
      if (user) result.user = user;
      return result;
    },

    async redirect(url, baseUrl) {
      // Redirect override for relative URLs
      return url.startsWith(baseUrl) ? url : baseUrl + url;
    },

    async session(session, token: Token) {
      const result = session;
      result.user = token.user;
      return result;
    },
  },
  jwt: {
    encryption: true,
    secret,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },

  providers: [
    Providers.Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials.username && credentials.password) {
          const user = await getUser(credentials.username);
          if (!user) throw "/auth/login/?error=invalid_credentials";
          const {
            _id: username,
            name,
            isAdmin,
            passwordHash: correctHash,
          } = user;
          // TODO: hash password and then compare salted hashes
          const hashToTest = credentials.password;
          const areCredentialsValid = hashToTest === correctHash;

          if (areCredentialsValid) {
            return { username, name, isAdmin };
          }
          // throws when invalid credentials were given
          throw "/auth/login/?error=invalid_credentials";
        }
        throw "/auth/login/?error=invalid_credentials";
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
});

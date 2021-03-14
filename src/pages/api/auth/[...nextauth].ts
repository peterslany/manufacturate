/* eslint-disable no-throw-literal */
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { getUser } from "../../../db";
import { Token } from "../../../types";

const secret = process.env.SECRET;

export default NextAuth({
  secret,
  callbacks: {
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    async jwt(token, user) {
      // Adds user fields to token
      console.log("JWT token - user: ", token, user);
      const result = token;
      if (user) result.user = user;

      return result;
    },
    async redirect(url, baseUrl) {
      // Redirect override for relative URLs
      return url.startsWith(baseUrl) ? url : baseUrl + url;
    },
    /**
     * @param  {object} session      Session object
     * @param  {object} token        User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    async session(session, token: Token) {
      // Add property to session, like an access_token from a provider.
      console.log("Session session-token:", session, token);
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
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials.username && credentials.password) {
          // TODO: hash password and then compare salted hashes
          const {
            _id: username,
            name,
            passwordHash: correctHash,
            isAdmin,
          } = await getUser(credentials.username);
          const hashToTest = credentials.password;
          const areCredentialsValid = hashToTest === correctHash;

          if (areCredentialsValid) {
            return { username, name, isAdmin };
          }
          // throws when invalid credentials were given
          throw "/auth/login/?error=invalid_credentials";
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
});

import bcrypt from "bcrypt";
import { NextApiRequest } from "next";
import jwt from "next-auth/jwt";
import { Token, User } from "../../types";

const secret = process.env.SECRET;
const encryptionKey = process.env.JWT_ENCRYPTION_KEY;
const signingKey = process.env.JWT_SIGNING_PRIVATE_KEY;

export const checkToken = async (req: NextApiRequest): Promise<User | null> => {
  if (!secret) {
    throw new Error("process.env.SECRET need to be assigned!");
  }
  try {
    const { user } = (await jwt.getToken({
      req,
      secret,
      encryption: true,
      encryptionKey,
      signingKey,
    })) as Token;
    return user;
  } catch {
    return null;
  }
};

export const hashPassword = (password: string): string => {
  const SALT_ROUNDS = 10;
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
};

export const checkPasswordAgainstHash = async (
  passwordToCheck: string,
  hashToMatch: string
): Promise<boolean> => bcrypt.compare(passwordToCheck, hashToMatch);

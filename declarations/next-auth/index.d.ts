/* eslint-disable import/no-cycle */
// Type definitions for next-auth 3.7
// Project: https://github.com/iaincollins/next-auth#readme
// Definitions by: Lluis <https://github.com/lluia>
//                 Iain <https://github.com/iaincollins>
//                 Juan <https://github.com/JuanM04>
//                 Balázs <https://github.com/balazsorban44>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5

/// <reference types="node" />

import { ConnectionOptions } from "typeorm";
import { Adapter } from "./adapters";
import { SessionProvider } from "./client";
import { JWTDecodeParams, JWTEncodeParams } from "./jwt";
import { PossibleProviders } from "./providers";
import {
  GenericObject,
  NextApiRequest,
  NextApiResponse,
  SessionBase,
} from "./_utils";

interface InitOptions {
  providers: ReadonlyArray<ReturnType<PossibleProviders>>;
  database?: string | ConnectionOptions;
  secret?: string;
  session?: Session;
  jwt?: JWTOptions;
  pages?: PageOptions;
  callbacks?: Callbacks;
  debug?: boolean;
  adapter?: Adapter;
  events?: Events;
  useSecureCookies?: boolean;
  cookies?: Cookies;
  theme?: "light" | "dark" | "auto";
}

interface AppOptions {
  debug: boolean;
  pages: PageOptions;
  adapter: Adapter;
  baseUrl: string;
  basePath: string;
  action:
    | "providers"
    | "session"
    | "csrf"
    | "signin"
    | "signout"
    | "callback"
    | "verify-request"
    | "error";
  provider?: string;
  cookies: Cookies;
  secret: string;
  csrfToken: string;
  providers: {
    [provider: string]: SessionProvider;
  };
  session: Session;
  jwt: JWTOptions;
  events: Events;
  callbacks: Callbacks;
  callbackUrl: string;
  // redirect?(redirectUrl: string): any;
}

interface PageOptions {
  signIn?: string;
  signOut?: string;
  error?: string;
  verifyRequest?: string;
  newUser?: string | null;
}

interface Cookies {
  [cookieKey: string]: Cookie;
}

interface Cookie {
  name: string;
  options?: CookieOptions;
}

interface CookieOptions {
  httpOnly?: boolean;
  sameSite?: true | "strict" | "lax" | "none";
  path?: string;
  secure?: boolean;
  maxAge?: number;
  domain?: string;
}

interface Events {
  signIn?(message: any): Promise<void>;
  signOut?(message: any): Promise<void>;
  createUser?(message: any): Promise<void>;
  updateUser?(message: any): Promise<void>;
  linkAccount?(message: any): Promise<void>;
  session?(message: any): Promise<void>;
  error?(message: any): Promise<void>;
}

interface Session {
  jwt?: boolean;
  maxAge?: number;
  updateAge?: number;
}

interface User {
  username: string;
  name: string;
  isAdmin: boolean;
}

interface JWTOptions {
  secret?: string;
  maxAge?: number;
  encryption?: boolean;
  signingKey?: string;
  encryptionKey?: string;
  encode?(options: JWTEncodeParams): Promise<string>;
  decode?(options: JWTDecodeParams): Promise<GenericObject>;
}

// TODO: Improve callback typings
interface Callbacks {
  signIn?(
    user: User,
    account: GenericObject,
    profile: GenericObject
  ): Promise<boolean | string>;
  redirect?(url: string, baseUrl: string): Promise<string>;
  session?(session: SessionBase, token: GenericObject): Promise<GenericObject>;
  jwt?(
    token: GenericObject,
    user: User,
    account: GenericObject,
    profile: GenericObject,
    isNewUser: boolean
  ): Promise<GenericObject>;
}

declare function NextAuth(options: InitOptions): Promise<void>;
declare function NextAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  options: InitOptions
): Promise<void>;
export default NextAuth;
export {
  InitOptions,
  AppOptions,
  PageOptions,
  Cookies,
  Events,
  Session,
  JWTOptions,
  User,
  Callbacks,
};

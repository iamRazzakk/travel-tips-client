export type TUSER = {
  _id: string;
  email: string;
  role: "USER" | "ADMIN";
  name: string;
  bio: string;
  address: string;
  iat: number;
  exp: number;
} | null;

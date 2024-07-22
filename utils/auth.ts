import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
const secret = "secretValue";
const key = new TextEncoder().encode(secret);

export const encrypt = async (payload: any) => {
  const increptedValue = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + 60 * 60 * 60 * 7))
    .sign(key);
  return increptedValue;
};

export const decrypt = async (input: string): Promise<any> => {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
};

export const getSession = async () => {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
};

export const updateSession = async (request: NextRequest) => {
  const session = await request.cookies.get("session")?.value;
  if (!session) return;
  const parsed = await decrypt(session);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    maxAge: 60 * 60 * 60 * 7,
  });
  return res;
};

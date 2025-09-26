// app/api/get-token/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const tokenUrl = process.env.NEXT_PUBLIC_MANSAR_GET_TOKEN_URL!;
const MANSAR_USERNAME = process.env.NEXT_PUBLIC_MANSAR_USERNAME!;
const MANSAR_PASSWORD = process.env.NEXT_PUBLIC_MANSAR_PASSWORD!;

let cachedToken: string | null = null;
let tokenExpiresAt: number | null = null;

export async function GET(req: NextRequest) {
  const now = Date.now();

  if (cachedToken && tokenExpiresAt && now < tokenExpiresAt) {
    return NextResponse.json({ token: cachedToken });
  }

  try {
    const res = await axios.post(tokenUrl, {
      username: MANSAR_USERNAME,
      password: MANSAR_PASSWORD,
    });

    const token = res.data?.token;
    const expiresIn = res.data?.expiresIn || 3600;

    cachedToken = token;
    tokenExpiresAt = now + expiresIn * 1000;

    return NextResponse.json({ token });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

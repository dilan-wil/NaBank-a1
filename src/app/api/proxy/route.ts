import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_MANSAR_BASE_URL!;
const TOKEN_URL = process.env.NEXT_PUBLIC_MANSAR_GET_TOKEN_URL!;
const MANSAR_API_ID = process.env.NEXT_PUBLIC_MANSAR_API_ID!;
const MANSAR_API_KEY = process.env.NEXT_PUBLIC_MANSAR_API_KEY!;
const USERNAME = process.env.NEXT_PUBLIC_MANSAR_USERNAME!;
const PASSWORD = process.env.NEXT_PUBLIC_MANSAR_PASSWORD!;

let cachedToken: string | null = null;
let tokenExpiresAt: number | null = null;

async function getToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && tokenExpiresAt && now < tokenExpiresAt) return cachedToken;

  const res = await axios.post(TOKEN_URL, {
    username: USERNAME,
    password: PASSWORD,
  });
  const token = res.data.token;
  const expiresIn = res.data.expiresIn || 3600;

  cachedToken = token;
  tokenExpiresAt = now + expiresIn * 1000;

  return token;
}

// Generic proxy handler
export async function POST(req: NextRequest) {
  const token = await getToken();
  const body = await req.json();
  const { path, method = "POST", data, params } = body;

  try {
    const res = await axios({
      url: `${BASE_URL}${path}`,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        apiId: MANSAR_API_ID,
        apiKey: MANSAR_API_KEY,
        "Content-Type": "application/json",
      },
      params,
      data,
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    return NextResponse.json(
      {
        message: "External API error",
        error: err.response?.data || err.message,
      },
      { status: err.response?.status || 500 }
    );
  }
}

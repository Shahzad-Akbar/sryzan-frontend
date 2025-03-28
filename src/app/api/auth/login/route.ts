// Write the api route for sending login data and seting the cookies
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api/config";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const body = await request.json();
  const { email, password } = body;
  
  try {
    const loginUrl = API_BASE_URL + API_ENDPOINTS.LOGIN;
  const res = await axios.post(loginUrl, {
    email,
    password,
  });

  const { user, accessToken, refreshToken } = res.data;

  cookieStore.set("token", accessToken);
  cookieStore.set("refreshToken", refreshToken);

  if (user.role === "admin") {
    cookieStore.set("admin", "admin");
    return NextResponse.json({ message: "Logged in" });
  }

  return NextResponse.json({ message: "Logged in" });
  } catch (error) {
    return NextResponse.json({ error }); 
  }
}

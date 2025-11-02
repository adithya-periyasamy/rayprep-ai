import { getCurrentUser } from "@/lib/actions/auth.action";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ authenticated: !!user });
  } catch (error) {
    // If anything goes wrong, treat as unauthenticated.
    return NextResponse.json({ authenticated: false });
  }
}

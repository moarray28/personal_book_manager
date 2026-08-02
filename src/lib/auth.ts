import { cookies } from "next/headers";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";

export async function getCurrentUser() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = verifyToken(token);

    const user = await User.findById(payload.userId).select("-passwordHash");

    if (!user) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}
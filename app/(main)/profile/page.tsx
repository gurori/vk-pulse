import apiFetch from "@/services/apiFetch";
import { User } from "@/shared/types/models";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserProfile from "./UserProfile";

export default async function ProfilePage() {
  const token = (await cookies()).get("auth");
  if (!token) redirect("/");
  const res = await apiFetch("/users/me", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });
  if (!res.ok) {
    console.log(res);
    redirect("/");
  }
  const user: User = await res.json();

  return <UserProfile user={user} />;
}

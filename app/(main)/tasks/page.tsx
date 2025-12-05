import apiFetch from "@/services/apiFetch";
import { Task } from "@/shared/types/models";
import { Button, Flex, Text, Title } from "@vkontakte/vkui";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Main from "../Main";
import CreateTaskButton from "./CreateTaskButton";

export default async function TasksPage() {
  const token = (await cookies()).get("auth");
  if (!token) redirect("/");

  const res = await apiFetch("/tasks", {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });
  if (!res.ok) {
    redirect("/");
  }
  const tasks: Task[] = await res.json();

  return (
    <Main title="Задачи">
      <CreateTaskButton token={token.value} />
    </Main>
  );
}

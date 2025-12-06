import apiFetch from "@/services/apiFetch";
import { Task } from "@/shared/types/models";
import { Flex } from "@vkontakte/vkui";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Main from "../Main";
import CreateTaskButton from "./CreateTaskButton";
import TaskEl from "@/components/TaskEl";

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
      <Flex direction="column" gap={30} className="w-full">
        {tasks.map((t) => (
          <TaskEl task={t} key={t.id} token={token.value} />
        ))}
      </Flex>
    </Main>
  );
}

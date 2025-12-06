import GanttChart from "@/components/GanttChart/GanttChart";
import Main from "../Main";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import apiFetch from "@/services/apiFetch";
import { Task } from "@/shared/types/models";
import { Flex, Headline } from "@vkontakte/vkui";
import s from "@/components/GanttChart/GanttChart.module.css";

export default async function ChartPage() {
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
  console.log(tasks);

  return (
    <Main title="Диаграмма Ганта">
      <Flex gap={4}>
        <div className="relative w-8 mb-8">
          <span className={s.fact} style={{ top: 1 }}></span>
        </div>
        <Headline> - план</Headline>
      </Flex>
      <Flex gap={4}>
        <div className="relative w-8 mb-8">
          <span className={s.plan} style={{ top: 1 }}></span>
        </div>
        <Headline> - факт</Headline>
      </Flex>
      <GanttChart tasks={tasks} />
    </Main>
  );
}

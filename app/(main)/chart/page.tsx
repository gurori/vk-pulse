import GanttChart, { Task } from "@/components/GanttChart/GanttChart";
import Main from "../Main";

const sample: Task[] = [
  {
    id: "1",
    name: "Подготовка ТЗ",
    //description: "Сбор требований и согласование",
    //isCompleted: true,
    //score: 5,
    startDate: "2025-11-01",
    endDate: "2025-11-07",
    actualStartDate: "2025-11-01",
    actualEndDate: "2025-11-06",
    receiver: { id: "u1", name: "Анна" },
  },
  {
    id: "2",
    name: "Дизайн",
    // description: "Макеты и правки",
    // isCompleted: true,
    // score: 8,
    startDate: "2025-11-08",
    endDate: "2025-11-18",
    actualStartDate: "2025-11-10",
    actualEndDate: "2025-11-20",
    receiver: { id: "u2", name: "Иван" },
  },
  {
    id: "3",
    name: "Разработка",
    // description: "Frontend + Backend",
    // isCompleted: false,
    // score: 13,
    startDate: "2025-11-19",
    endDate: "2025-12-10",
    actualStartDate: "2025-11-22",
    actualEndDate: "2025-12-02",
    receiver: { id: "u3", name: "Мария" },
  },
];

export default function Page() {
  return (
    <Main title="Диаграмма Ганта">
      <GanttChart tasks={sample} />
    </Main>
  );
}

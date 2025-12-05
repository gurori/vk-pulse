"use client";

import React, { useMemo } from "react";
import styles from "./GanttChart.module.css";

export interface User {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  actualStartDate: string;
  actualEndDate: string;
  receiver?: User | null;
}

type Props = {
  tasks: Task[];
  timelineStart?: string;
  timelineEnd?: string;
};

function toDayNumber(iso: string) {
  const d = new Date(iso);
  return (
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000
  );
}

export const GanttTable: React.FC<Props> = ({
  tasks,
  timelineStart,
  timelineEnd,
}) => {
  const { start, end, days } = useMemo(() => {
    let minDay = Infinity;
    let maxDay = -Infinity;

    tasks.forEach((t) => {
      [t.startDate, t.endDate, t.actualStartDate, t.actualEndDate].forEach(
        (iso) => {
          const d = toDayNumber(iso);
          if (d < minDay) minDay = d;
          if (d > maxDay) maxDay = d;
        }
      );
    });

    if (timelineStart) minDay = Math.min(minDay, toDayNumber(timelineStart));
    if (timelineEnd) maxDay = Math.max(maxDay, toDayNumber(timelineEnd));

    minDay -= 1;
    maxDay += 1;

    const days = [];
    for (let d = minDay; d <= maxDay; d++) {
      const date = new Date(d * 86400000);
      days.push({
        dayNum: d,
        label: `${date.getUTCDate()}.${date.getUTCMonth() + 1}`,
      });
    }

    return { start: minDay, end: maxDay, days };
  }, [tasks, timelineStart, timelineEnd]);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.nameCol}>Задача</th>
            {days.map((d) => (
              <th key={d.dayNum} className={styles.dayCol}>
                {d.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => {
            const planStart = toDayNumber(task.startDate);
            const planEnd = toDayNumber(task.endDate);
            const factStart = toDayNumber(task.actualStartDate);
            const factEnd = toDayNumber(task.actualEndDate);

            return (
              <tr key={task.id}>
                <td className={styles.nameCell}>
                  <div className={styles.taskName}>{task.name}</div>
                  <div className={styles.taskSub}>
                    {task.receiver?.name ?? "—"}
                  </div>
                </td>

                {days.map((d) => {
                  const inPlan = d.dayNum >= planStart && d.dayNum <= planEnd;
                  const inFact = d.dayNum >= factStart && d.dayNum <= factEnd;

                  return (
                    <td key={d.dayNum} className={styles.dayCell}>
                      {inPlan && <div className={styles.plan} />}
                      {inFact && <div className={styles.fact} />}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GanttTable;

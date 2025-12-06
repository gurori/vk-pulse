"use client";

import React, { useMemo } from "react";
import styles from "./GanttChart.module.css";
import type { Task } from "@/shared/types/models";

type Props = {
  tasks: Task[];
  timelineStart?: string;
  timelineEnd?: string;
};

/** Парсит ISO дату и возвращает номер дня (UTC days since epoch) или null если дата некорректна/пустая */
function toDayNumberSafe(iso?: string | null): number | null {
  if (!iso) return null;

  // guard: some backends send '0001-01-01T00:00:00' to mean "not set"
  if (iso.startsWith("0001-") || iso.startsWith("0000-")) return null;

  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;

  const y = d.getUTCFullYear();
  // treat very old years as "not set"
  if (y < 1900) return null;

  return Math.floor(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000
  );
}

function fromDayNumber(dayNum: number) {
  return new Date(dayNum * 86400000);
}

export const GanttTable: React.FC<Props> = ({
  tasks,
  timelineStart,
  timelineEnd,
}) => {
  const { start, end, days } = useMemo(() => {
    let minDay = Infinity;
    let maxDay = -Infinity;

    // collect valid day numbers
    tasks.forEach((t) => {
      const candidates = [
        toDayNumberSafe(t.startDate),
        toDayNumberSafe(t.endDate),
        toDayNumberSafe(t.actualStartDate),
        toDayNumberSafe(t.actualEndDate),
      ];

      candidates.forEach((dn) => {
        if (dn === null) return;
        if (dn < minDay) minDay = dn;
        if (dn > maxDay) maxDay = dn;
      });
    });

    // include timeline overrides (if provided and valid)
    const ts = toDayNumberSafe(timelineStart ?? null);
    const te = toDayNumberSafe(timelineEnd ?? null);
    if (ts !== null && ts < minDay) minDay = ts;
    if (te !== null && te > maxDay) maxDay = te;

    // if nothing valid, fallback to today week
    if (!isFinite(minDay) || !isFinite(maxDay)) {
      const today = Math.floor(
        Date.UTC(
          new Date().getUTCFullYear(),
          new Date().getUTCMonth(),
          new Date().getUTCDate()
        ) / 86400000
      );
      minDay = today - 3;
      maxDay = today + 7;
    }

    // breathing room
    minDay -= 1;
    maxDay += 1;

    const daysArr: { dayNum: number; label: string }[] = [];
    for (let d = minDay; d <= maxDay; d++) {
      const date = fromDayNumber(d);
      const day = date.getUTCDate().toString().padStart(2, "0");
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      daysArr.push({ dayNum: d, label: `${day}.${month}` });
    }

    return { start: minDay, end: maxDay, days: daysArr };
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
            const planStart = toDayNumberSafe(task.startDate);
            const planEnd = toDayNumberSafe(task.endDate);
            const factStart = toDayNumberSafe(task.actualStartDate);
            const factEnd = toDayNumberSafe(task.actualEndDate);

            return (
              <tr key={task.id}>
                <td className={styles.nameCell}>
                  <div className={styles.taskName}>{task.name}</div>
                  <div className={styles.taskSub}>
                    {task.creator?.name ?? "—"}
                  </div>
                </td>

                {days.map((d) => {
                  const inPlan =
                    planStart !== null &&
                    planEnd !== null &&
                    d.dayNum >= planStart &&
                    d.dayNum <= planEnd;
                  const inFact =
                    factStart !== null &&
                    factEnd !== null &&
                    d.dayNum >= factStart &&
                    d.dayNum <= factEnd;

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

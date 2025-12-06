"use client";

import apiFetch from "@/services/apiFetch";
import { dateFormat } from "@/shared/date-format";
import { Task } from "@/shared/types/models";
import {
  Box,
  DisplayTitle,
  Flex,
  Headline,
  Popover,
  SimpleCell,
  Subhead,
} from "@vkontakte/vkui";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskEl({ task, token }: { task: Task; token: string }) {
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  async function handleTake(id: Task["id"]) {
    const res = await apiFetch(`/Tasks/take?id=${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) push("/");

    setOpen(false);
  }

  async function handleComplete(id: Task["id"]) {
    const res = await apiFetch(`/Tasks?id=${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) push("/");

    setOpen(false);
  }

  return (
    <Box className="task shadow">
      <Flex justify="space-between">
        <Flex direction="column" gap={10}>
          <DisplayTitle>{task.name}</DisplayTitle>
          <Subhead>{task.description}</Subhead>
          <Flex gap={8} className="items-center">
            <div className="def-logo-sm relative">
              <Image src="/umniychelvochkah.png" fill alt="avatar" />
            </div>
            <DisplayTitle level="4">{task.creator?.name}</DisplayTitle>
          </Flex>
        </Flex>
        <Flex direction="column" justify="space-between">
          <Flex gap={32} className="self-end">
            <Box
              className={
                task.isCompleted ? "task-completed" : "task-not-completed"
              }
            >
              <Headline>{task.isCompleted ? "Выполнено" : "Задано"}</Headline>
            </Box>
            <Flex className="items-center">
              <DisplayTitle style={{ color: "var(--vkui--color_accent_blue)" }}>
                +{task.score}
              </DisplayTitle>
              <Image src="/icons/star.svg" alt="star" height={32} width={32} />
            </Flex>
          </Flex>
          <Flex gap={32} className="items-center">
            <Headline>
              {dateFormat(task.startDate)} - {dateFormat(task.endDate)}
            </Headline>
            <Popover
              shown={open}
              onShownChange={setOpen}
              placement="bottom-end"
              trigger="click"
              content={
                <div>
                  {task.receiver ? (
                    <SimpleCell
                      onClick={async () => await handleComplete(task.id)}
                    >
                      Выполнено
                    </SimpleCell>
                  ) : (
                    <SimpleCell onClick={async () => await handleTake(task.id)}>
                      Принять
                    </SimpleCell>
                  )}
                </div>
              }
            >
              <div onClick={() => setOpen(true)} className="cursor-pointer">
                <MenuIcon />
              </div>
            </Popover>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

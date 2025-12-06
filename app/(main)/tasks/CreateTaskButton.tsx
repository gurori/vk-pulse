"use client";

import { Button, Flex, Text } from "@vkontakte/vkui";
import { PlusIcon } from "lucide-react";
import CreateTaskModal from "./CreateTaskModal";
import { useState } from "react";

export default function CreateTaskButton({ token }: { token: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="self-start">
        <Flex justify="space-around" gap={8}>
          <Text>Создать</Text>
          <PlusIcon />
        </Flex>
      </Button>
      <CreateTaskModal
        open={open}
        onClose={() => setOpen(false)}
        token={token}
      />
    </>
  );
}

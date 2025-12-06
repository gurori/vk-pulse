import { DisplayTitle, Flex } from "@vkontakte/vkui";
import type { ReactNode } from "react";

export default function Main({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <Flex
      direction="column"
      gap={32}
      className="w-full justify-items-start content-start"
    >
      <DisplayTitle>{title}</DisplayTitle>
      {children}
    </Flex>
  );
}

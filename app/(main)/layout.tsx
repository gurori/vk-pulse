import SidePanel from "@/components/SidePanel";
import { Box, Flex } from "@vkontakte/vkui";
import type { ReactNode } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Flex>
      <SidePanel />
      <Box padding={60}>{children}</Box>
    </Flex>
  );
}

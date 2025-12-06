import SidePanel from "@/components/SidePanel";
import { Box, Flex } from "@vkontakte/vkui";
import type { ReactNode } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Flex noWrap>
      <SidePanel />
      <Box
        className="w-full grid justify-items-start"
        paddingInline={60}
        paddingBlock={32}
      >
        {children}
      </Box>
    </Flex>
  );
}

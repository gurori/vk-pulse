import { Box, Flex, Title } from "@vkontakte/vkui";
import {
  BookCheckIcon,
  ChartNoAxesCombinedIcon,
  UserPenIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SidePanel() {
  return (
    <Box padding={26} className="min-h-screen h-[1500px] bg-[#F6F7F8]">
      <Link href="/">
        <Flex noWrap gap={20} align="center">
          <Image
            src="/logos/pulse/main.svg"
            alt="logo"
            width={40}
            height={40}
          />
          <Title>VK Pulse</Title>
        </Flex>
      </Link>
      <Box paddingBlock={30}>
        <Flex direction="column" gap={36}>
          <Link href="/profile">
            <Flex noWrap gap={12} align="center">
              <UserPenIcon />
              <Title level="2">Профиль</Title>
            </Flex>
          </Link>
          <Link href="/chart">
            <Flex noWrap gap={12} align="center">
              <ChartNoAxesCombinedIcon />
              <Title level="2">Диаграмма</Title>
            </Flex>
          </Link>
          <Link href="/tasks">
            <Flex noWrap gap={12} align="center">
              <BookCheckIcon />
              <Title level="2">Задачи</Title>
            </Flex>
          </Link>
          <Link href="/">
            <Flex noWrap gap={12} align="center">
              <UsersIcon />
              <Title level="2">Пользователи</Title>
            </Flex>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}

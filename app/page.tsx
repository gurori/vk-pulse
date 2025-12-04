import {
  Box,
  Button,
  ButtonGroup,
  Caption,
  Flex,
  Title,
} from "@vkontakte/vkui";
import s from "./page.module.css";
import Image from "next/image";
import AuthModals from "@/components/AuthModals";

export default function Home() {
  return (
    <>
      <Box className="container" paddingBlock={20}>
        <Flex justify="space-between">
          <Title level="2">VK WorkSpace</Title>
          <AuthModals />
        </Flex>
      </Box>
      <Box paddingBlock={128}>
        <Flex className="container" justify="space-between">
          <Box
            className="max-w-xl grid gap-4 justify-items-start"
            paddingBlock={100}
          >
            <Title>
              Сделайте совместную работу более структурированной, прозрачной и
              удобной в VK WorkSpace Pulse
            </Title>
            <Caption>
              Отслеживание прогресса команды, создание задач по диаграмме Ганта,
              карточка сотрудника.
            </Caption>
            <Button size="l" className="w-56">
              Попробовать
            </Button>
          </Box>
          <div className={s.logo}>
            <Image alt="logo" src="/logos/pulse/main.svg" fill />
          </div>
        </Flex>
      </Box>
    </>
  );
}

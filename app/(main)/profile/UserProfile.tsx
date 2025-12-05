import { User } from "@/shared/types/models";
import { Box, DisplayTitle, Flex, Headline, Title } from "@vkontakte/vkui";
import Main from "../Main";

export default function UserProfile({ user }: { user: User }) {
  return (
    <Main title="Профиль пользователя">
      <Flex gap={26}>
        <span className="def-logo" />
        <Flex direction="column">
          <Title>{user.name}</Title>
          <Headline>{user.email}</Headline>
        </Flex>
      </Flex>
    </Main>
  );
}

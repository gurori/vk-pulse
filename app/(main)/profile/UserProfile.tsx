import { User } from "@/shared/types/models";
import { Box, DisplayTitle, Flex, Headline, Title } from "@vkontakte/vkui";
import Main from "../Main";
import Image from "next/image";

export default function UserProfile({ user }: { user: User }) {
  return (
    <Main title="Профиль пользователя">
      <Flex gap={26}>
        <div className="def-logo relative">
          <Image src="/umniychelvochkah.png" fill alt="avatar" />
        </div>
        <Flex direction="column">
          <Title>{user.name}</Title>
          <Headline>{user.email}</Headline>
        </Flex>
      </Flex>
      <div className="score-bg flex items-center w-full place-content-center">
        <DisplayTitle style={{ color: "white", fontSize: 64 }}>
          {user.score}
        </DisplayTitle>
        <Image src="/icons/star-white.svg" alt="star" height={64} width={64} />
      </div>
    </Main>
  );
}

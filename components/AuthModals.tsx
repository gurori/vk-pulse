"use client";

import { useState } from "react";
import {
  ModalRoot,
  ModalCard,
  CardScroll,
  Button,
  ButtonGroup,
} from "@vkontakte/vkui";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useRouter } from "next/navigation";

type ActiveModal = "login" | "register" | null;

export default function AuthModals() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const { push } = useRouter();

  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");
  const close = () => setActiveModal(null);

  return (
    <>
      <ButtonGroup>
        <Button onClick={openRegister} mode="tertiary">
          Регистрация
        </Button>
        <Button onClick={openLogin}>Вход</Button>
      </ButtonGroup>

      <ModalRoot activeModal={activeModal}>
        <ModalCard
          id="login"
          onClose={close}
          //header="Войти"
          //settlingHeight={420}
        >
          <CardScroll>
            <LoginModal
              onSuccess={() => push("/profile")}
              onSwitch={() => setActiveModal("register")}
            />
          </CardScroll>
        </ModalCard>

        <ModalCard
          id="register"
          onClose={close}
          //header="Регистрация"
          //settlingHeight={620}
        >
          <CardScroll>
            <RegisterModal
              onSuccess={() => setActiveModal("login")}
              onSwitch={() => setActiveModal("login")}
            />
          </CardScroll>
        </ModalCard>
      </ModalRoot>
    </>
  );
}

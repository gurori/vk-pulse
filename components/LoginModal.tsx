"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, passwordSchema } from "@/shared/zod-schemas";
import { FormItem, Input, Button, Title } from "@vkontakte/vkui";
import apiFetch from "@/services/apiFetch";
import ApiError from "@/shared/types/ApiError";
import { setCookie } from "@/shared/actions";

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginModal({
  onSuccess,
  onSwitch,
}: {
  onSuccess?: () => void;
  onSwitch?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginValues) {
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload: ApiError = await res
          .json()
          .catch(() => ({ detail: "Ошибка сервера" }));
        setError("password", {
          message: payload.detail,
        });
        return;
      }
      const token = await res.text();
      setCookie("auth", token);
      onSuccess?.();
    } catch (err) {
      console.log(err);

      setError("password", { message: "Ошибка сети — повторите попытку" });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Title align="center">Войти в аккаунт</Title>
      <FormItem
        top="Email"
        status={errors.email ? "error" : undefined}
        bottom={errors.email?.message}
      >
        <Input {...register("email")} type="email" placeholder="your@mail.ru" />
      </FormItem>

      <FormItem
        top="Пароль"
        status={errors.password ? "error" : undefined}
        bottom={errors.password?.message}
      >
        <Input {...register("password")} type="password" placeholder="Пароль" />
      </FormItem>

      <FormItem style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <Button
          size="l"
          stretched
          mode="primary"
          loading={isSubmitting}
          type="submit"
        >
          Войти
        </Button>
        <Button size="l" stretched mode="tertiary" onClick={onSwitch}>
          Регистрация
        </Button>
      </FormItem>
    </form>
  );
}

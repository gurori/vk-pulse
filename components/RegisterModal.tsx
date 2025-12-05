"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormItem, Input, Button, Title } from "@vkontakte/vkui";
import { emailSchema, nameSchema, passwordSchema } from "@/shared/zod-schemas";
import apiFetch from "@/services/apiFetch";
import type ApiError from "@/shared/types/ApiError";

const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: z.string(),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterModal({
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
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "User",
    },
  });

  async function onSubmit(values: RegisterValues) {
    try {
      const res = await apiFetch("/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const payload: ApiError = await res
          .json()
          .catch(() => ({ detail: "Ошибка сервера" }));
        setError("email", {
          message: payload.detail,
        });
        return;
      }
      onSuccess?.();
    } catch (err) {
      setError("email", { message: "Ошибка сети — повторите попытку" });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Title align="center">Регистрация</Title>
      <FormItem
        top="Имя"
        status={errors.name ? "error" : "default"}
        bottom={errors.name?.message}
      >
        <Input {...register("name")} placeholder="Иван" />
      </FormItem>

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
          Далее
        </Button>
        <Button size="l" stretched mode="tertiary" onClick={onSwitch}>
          Войти
        </Button>
      </FormItem>
    </form>
  );
}

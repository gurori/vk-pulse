"use client";

import apiFetch from "@/services/apiFetch";
import {
  dateSchema,
  mdTextSchema,
  nameSchema,
  scoreSchema,
} from "@/shared/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CardScroll,
  FormItem,
  Input,
  ModalCard,
  ModalRoot,
} from "@vkontakte/vkui";
import { useController, useForm } from "react-hook-form";
import z from "zod";

export default function CreateTaskModal({
  open,
  onClose,
  token,
}: {
  open: boolean;
  onClose: () => void;
  token: string;
}) {
  const taskSchema = z.object({
    name: nameSchema,
    description: mdTextSchema,
    score: scoreSchema,
    startDate: dateSchema,
    endDate: dateSchema,
  });

  type FormValues = z.infer<typeof taskSchema>;

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(taskSchema),
  });

  const startDateField = useController({ control, name: "startDate" }).field;
  const endDateField = useController({ control, name: "endDate" }).field;

  async function onSubmit(values: FormValues) {
    try {
      const res = await apiFetch("/tasks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const json = await res
          .json()
          .catch(() => ({ message: "Ошибка сервера" }));
        if (json?.field) {
          setError(json.field as any, { message: json.message || "Ошибка" });
        } else {
          setError("name", {
            message: json?.message || "Ошибка при создании задачи",
          });
        }
        return;
      }

      reset();
      onClose();
    } catch (err) {
      setError("name", { message: "Сетевая ошибка — повторите попытку" });
    }
  }

  return (
    <ModalRoot activeModal={open ? "create" : null}>
      <ModalCard id="create" onClose={onClose}>
        <CardScroll>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormItem
              top="Название"
              status={errors.name ? "error" : undefined}
              bottom={errors.name?.message}
            >
              <Input
                {...register("name")}
                placeholder="Краткое название задачи"
              />
            </FormItem>

            <FormItem
              top="Описание"
              status={errors.description ? "error" : undefined}
              bottom={errors.description?.message}
            >
              <Input
                {...register("description")}
                placeholder="Подробности задачи"
              />
            </FormItem>

            <FormItem
              top="Баллы"
              status={errors.score ? "error" : undefined}
              bottom={errors.score?.message}
            >
              <Input
                {...register("score", { valueAsNumber: true })}
                type="number"
                min={0}
              />
            </FormItem>

            <div style={{ display: "flex", gap: 8 }}>
              <FormItem
                top="Дата начала"
                status={errors.startDate ? "error" : undefined}
                bottom={errors.startDate?.message}
                style={{ flex: 1 }}
              >
                <Input
                  value={startDateField.value}
                  onChange={(e) => startDateField.onChange(e.target.value)}
                  type="date"
                />
              </FormItem>

              <FormItem
                top="Дата окончания"
                status={errors.endDate ? "error" : undefined}
                bottom={errors.endDate?.message}
                style={{ flex: 1 }}
              >
                <Input
                  value={endDateField.value}
                  onChange={(e) => endDateField.onChange(e.target.value)}
                  type="date"
                />
              </FormItem>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <Button
                type="submit"
                mode="primary"
                size="l"
                stretched
                loading={isSubmitting}
              >
                Создать
              </Button>
              <Button
                type="button"
                mode="tertiary"
                size="l"
                stretched
                onClick={onClose}
              >
                Отмена
              </Button>
            </div>
          </form>
        </CardScroll>
      </ModalCard>
    </ModalRoot>
  );
}

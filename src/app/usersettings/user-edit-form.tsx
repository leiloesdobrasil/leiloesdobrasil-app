"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordConfirmModal } from "./password-confirm-modal";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Nome completo deve ter pelo menos 2 caracteres."),
  email: z.string().email("Endereço de email inválido."),
  postalCode: z.string().min(5, "CEP deve ter pelo menos 5 caracteres."),
  street: z.string().min(3, "Rua deve ter pelo menos 3 caracteres."),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres."),
  state: z.string().min(2, "Estado deve ter pelo menos 2 caracteres."),
  whatsapp: z
    .string()
    .min(10, "Número de WhatsApp deve ter pelo menos 10 caracteres."),
  cpfOrCnpj: z.string().min(11, "CPF/CNPJ deve ter pelo menos 11 caracteres."),
});

type FormValues = z.infer<typeof formSchema>;

export function UserEditForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changedFields, setChangedFields] = useState<Set<keyof FormValues>>(
    new Set()
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      postalCode: "",
      street: "",
      city: "",
      state: "",
      whatsapp: "",
      cpfOrCnpj: "",
    },
  });

  function onSubmit() {
    if (changedFields.size > 0) {
      setIsModalOpen(true);
    }
  }

  function handlePasswordConfirm() {
    setIsModalOpen(false);

    setChangedFields(new Set());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {Object.keys(formSchema.shape).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as keyof FormValues}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormItem>
                <FormLabel>{field}</FormLabel>
                <FormControl>
                  <Input
                    className="h-9 text-sm"
                    onChange={(e) => {
                      onChange(e);
                      setChangedFields((prev) =>
                        new Set(prev).add(field as keyof FormValues)
                      );
                    }}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="mt-4">
          Salvar alterações
        </Button>
      </form>
      <PasswordConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handlePasswordConfirm}
      />
    </Form>
  );
}

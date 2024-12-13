"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { format } from "path";

interface Estado {
  label: string;
  value: string;
}

interface Cidade {
  label: string;
  value: string;
  city: string;
}

interface CidadesResponse {
  data: Cidade[];
}

interface Bairro {
  label: string;
  value: string;
  district: string;
}

interface BairrosResponse {
  data: Bairro[];
}

interface FormValues {
  estado: string[];
  cidade: string[];
  bairro: string[];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  desconto: number | undefined;
  dataInicio: string | undefined;
  dataFim: string | undefined;
}

const FormSchema = z.object({
  estado: z.array(z.string().min(1, "Estado é obrigatório.")), // Obrigatório
  cidade: z.array(z.string()).optional(), // Opcional, mas sempre array
  bairro: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  desconto: z.number().optional(),
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
});

export function FieldsFilterProperties() {
  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [bairros, setBairros] = useState<Bairro[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const selectedEstado = form.watch("estado");
  const selectedCidades = form.watch("cidade");
  const selectedBairro = form.watch("bairro");

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado.");
          return;
        }

        const response = await axios.get(`${getBaseUrl()}/filters/auctions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const parsedEstados = response.data.state.map((estado: any) => ({
          label: estado.state,
          value: estado.state.toLowerCase(),
        }));
        setEstados(parsedEstados);
      } catch (error) {
        console.error("Erro ao buscar estados:", error);
      }
    };

    fetchEstados();
  }, []);

  useEffect(() => {
    const fetchCidades = async () => {
      if (!selectedEstado || selectedEstado.length === 0) return;

      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado.");
          return;
        }

        const response = await axios.get<CidadesResponse>(
          `${getBaseUrl()}/filters/city/auctions/${selectedEstado.join(",")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const cidadesData = response.data?.data;
        if (Array.isArray(cidadesData)) {
          const parsedCidades = cidadesData.map((cidade) => ({
            label: cidade.city,
            value: cidade.city.toLowerCase(),
            city: cidade.city,
          }));
          setCidades(parsedCidades);
        } else {
          console.error(
            "Dados de cidades não encontrados ou formato inválido."
          );
        }
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      }
    };

    fetchCidades();
  }, [selectedEstado]);

  useEffect(() => {
    const fetchBairros = async () => {
      if (!selectedCidades || selectedCidades.length === 0) return;

      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado.");
          return;
        }

        const response = await axios.get<BairrosResponse>(
          `${getBaseUrl()}/filters/district/auctions/${selectedCidades.join(
            ","
          )}/${selectedEstado.join(",")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        const bairrosData = response.data?.data;
        if (Array.isArray(bairrosData)) {
          const parsedBairros = bairrosData.map((bairro) => ({
            label: bairro.district,
            value: bairro.district.toLowerCase(),
            district: bairro.district, // Incluímos essa propriedade para satisfazer o tipo Bairro
          }));
          setBairros(parsedBairros);
        } else {
          console.error(
            "Dados de bairros não encontrados ou formato inválido."
          );
        }
      } catch (error) {
        console.error("Erro ao buscar bairros:", error);
      }
    };

    fetchBairros();
  }, [selectedCidades]);

  const buildQueryParams = (data: FormValues) => {
    const queryParams = new URLSearchParams();

    if (data.estado?.length) {
      queryParams.set("state", data.estado.join(","));
    }
    if (data.cidade?.length) {
      queryParams.set("city", data.cidade.join(","));
    }
    if (data.bairro) {
      queryParams.set("district", data.bairro.join(","));
    }
    if (data.minPrice !== undefined) {
      queryParams.set("minPrice", data.minPrice.toString());
    }
    if (data.maxPrice !== undefined) {
      queryParams.set("maxPrice", data.maxPrice.toString());
    }
    if (data.desconto !== undefined) {
      queryParams.set("discount", data.desconto.toString());
    }
    if (data.dataInicio) {
      queryParams.set("startDate", data.dataInicio);
    }
    if (data.dataFim) {
      queryParams.set("endDate", data.dataFim);
    }

    return queryParams.toString();
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Dados submetidos:", data);
    const queryParams = buildQueryParams(data);
    router.push(`/dashboard?${queryParams}`);
    alert("Filtros aplicados!");
  };

  const isCidadeDisabled = !selectedEstado || selectedEstado.length === 0;
  const isBairroDisabled = !selectedCidades || selectedCidades.length === 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Estado */}
        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Estado</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        field.value?.length === 0 && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length > 0
                        ? field.value.join(", ").toUpperCase()
                        : "Selecione os estados"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] p-0">
                  <Command>
                    <CommandInput placeholder="Pesquisar estado..." />
                    <CommandList>
                      <CommandEmpty>Nenhum estado encontrado.</CommandEmpty>
                      <CommandGroup>
                        {estados.map((estado) => (
                          <CommandItem
                            key={estado.value}
                            value={estado.label}
                            onSelect={() => {
                              const currentValue = field.value || [];
                              if (currentValue.includes(estado.value)) {
                                form.setValue(
                                  "estado",
                                  currentValue.filter((e) => e !== estado.value)
                                );
                              } else {
                                form.setValue("estado", [
                                  ...currentValue,
                                  estado.value,
                                ]);
                              }
                            }}
                          >
                            {estado.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value?.includes(estado.value)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cidade */}
        <FormField
          control={form.control}
          name="cidade"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Cidade</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      disabled={isCidadeDisabled}
                      className={cn(
                        "w-full justify-between",
                        field.value?.length === 0 && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length > 0
                        ? field.value.join(", ")
                        : "Selecione a cidade"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] p-0">
                  <Command>
                    <CommandInput placeholder="Pesquisar cidade..." />
                    <CommandList>
                      <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                      <CommandGroup>
                        {cidades.map((cidade) => (
                          <CommandItem
                            key={cidade.value}
                            value={cidade.label}
                            onSelect={() => {
                              const currentValue = field.value || [];
                              if (currentValue.includes(cidade.value)) {
                                form.setValue(
                                  "cidade",
                                  currentValue.filter((e) => e !== cidade.value)
                                );
                              } else {
                                form.setValue("cidade", [
                                  ...currentValue,
                                  cidade.value,
                                ]);
                              }
                            }}
                          >
                            {cidade.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value?.includes(cidade.value)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bairro */}
        <FormField
          control={form.control}
          name="bairro"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Bairro</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      disabled={isBairroDisabled}
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value || "Selecione o bairro"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] p-0">
                  <Command>
                    <CommandInput placeholder="Pesquisar bairro..." />
                    <CommandList>
                      <CommandEmpty>Nenhum bairro encontrado.</CommandEmpty>
                      <CommandGroup>
                        {bairros.map((bairro) => (
                          <CommandItem
                            key={bairro.value}
                            value={bairro.label}
                            onSelect={() => {
                              const currentValue = field.value || [];
                              if (currentValue.includes(bairro.value)) {
                                form.setValue(
                                  "bairro",
                                  currentValue.filter((e) => e !== bairro.value)
                                );
                              } else {
                                form.setValue("bairro", [
                                  ...currentValue,
                                  bairro.value,
                                ]);
                              }
                            }}
                          >
                            {bairro.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value?.includes(bairro.value)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Min and Max Price */}
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="minPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço Mínimo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Selecione um valor"
                    type="number"
                    className="border rounded w-full px-2 py-1"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço Máximo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Selecione um valor"
                    type="number"
                    className="border rounded w-full px-2 py-1"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Desconto */}
        <FormField
          control={form.control}
          name="desconto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desconto mínimo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Selecione de 0% a 99%"
                  type="number"
                  className="border rounded w-full px-2 py-1"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Datas */}
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="dataInicio"
            render={() => (
              <FormItem>
                <FormLabel>Data limite </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[350px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {date ? format(date) : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          type="submit"
        >
          Aplicar Filtros
        </Button>
      </form>
    </Form>
  );
}

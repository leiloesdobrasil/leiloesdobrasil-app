"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { NumericFormat } from "react-number-format";

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

import { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { DrawerClose } from "./ui/drawer";

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

interface Tipodeleilao {
  label: string;
  value: string;
  sale_type: string;
}
interface TipoDeLeilaoResponse {
  saleTypes?: Tipodeleilao[];
}

interface FormValues {
  estado: string[];
  cidade: string[];
  bairro: string[];
  minPrice: string;
  maxPrice: string;
  desconto: string;
  tipodeleilao: string[];
}

const FormSchema = z.object({
  estado: z.array(z.string()).optional(),
  cidade: z.array(z.string()).optional(),
  bairro: z.array(z.string()).optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  desconto: z.string().optional(),

  tipodeleilao: z.array(z.string()).optional(),
});

export function FieldsFilterProperties() {
  const router = useRouter();

  const sanitizePrice = (price: string | null) => {
    if (!price) return "";

    const decodedPrice = decodeURIComponent(price);

    const cleanedPrice = decodedPrice.replace("R$", "").replace(/[^\d]/g, "");

    return cleanedPrice;
  };

  const sanitizePercentage = (percentage: string | null) => {
    if (!percentage) return "";

    let decodedPrice = "";

    try {
      decodedPrice = decodeURIComponent(percentage);
    } catch {
      decodedPrice = percentage;
    }

    const cleanedPrice = decodedPrice.replace("%", "").replace(/[^\d]/g, "");

    return cleanedPrice;
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const estadoFromUrl = queryParams.get("state")?.split(",") || [];
    const cidadeFromUrl = queryParams.get("city")?.split(",") || [];
    const bairroFromUrl = queryParams.get("district")?.split(",") || [];
    const tipodeleilao = queryParams.get("type")?.split(",") || [];

    const minPriceFromUrl = sanitizePrice(queryParams.get("minPrice"));
    const maxPriceFromUrl = sanitizePrice(queryParams.get("maxPrice"));
    const descontoFromUrl = sanitizePercentage(
      queryParams.get("discountPercentage")
    );

    // Definir os valores no formulário
    form.setValue("estado", estadoFromUrl);
    form.setValue("cidade", cidadeFromUrl);
    form.setValue("bairro", bairroFromUrl);
    form.setValue("minPrice", minPriceFromUrl);
    form.setValue("maxPrice", maxPriceFromUrl);
    form.setValue("desconto", descontoFromUrl);
    form.setValue("tipodeleilao", tipodeleilao);
  }, [router]);

  const clearFilters = () => {
    form.reset();

    const currentUrl = window.location.pathname;
    router.push(currentUrl);
  };

  const buildQueryParams = (data: FormValues) => {
    let queryString = "";

    if (data.estado?.length) {
      queryString += `state=${data.estado.join(",")}&`;
    }

    if (data.cidade?.length) {
      queryString += `city=${encodeURIComponent(data.cidade.join(","))}&`;
    }
    if (data.bairro?.length) {
      queryString += `district=${encodeURIComponent(data.bairro.join(","))}&`;
    }
    if (data.tipodeleilao?.length) {
      queryString += `type=${encodeURIComponent(data.tipodeleilao.join(","))}&`;
    }

    if (data.minPrice) {
      queryString += `minPrice=${sanitizePrice(data.minPrice)}&`;
    }
    if (data.maxPrice) {
      queryString += `maxPrice=${sanitizePrice(data.maxPrice)}&`;
    }
    if (data.desconto) {
      queryString += `discountPercentage=${sanitizePercentage(data.desconto)}&`;
    }

    return queryString.slice(0, -1);
  };

  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [tipoDeLeilao, setTipodeLeilao] = useState<Tipodeleilao[]>([]);
  const [bairros, setBairros] = useState<Bairro[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const selectedEstado = form.watch("estado");
  const selectedCidades = form.watch("cidade");

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

        const parsedEstados = response.data.state.map(
          (estado: { state: string }) => ({
            label: estado.state,
            value: estado.state.toLowerCase(),
          })
        );
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
            district: bairro.district,
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

  useEffect(() => {
    const fetchSaleType = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado.");
          return;
        }

        const response = await axios.get<TipoDeLeilaoResponse>(
          `${getBaseUrl()}/filters/auctions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const saleTypeData = response.data?.saleTypes;
        if (Array.isArray(saleTypeData)) {
          const parsedTipodeLeilao = saleTypeData.map(
            (tipodeleilao: { sale_type: string }) => ({
              label: tipodeleilao.sale_type,
              value: tipodeleilao.sale_type.toLowerCase(),
              sale_type: tipodeleilao.sale_type,
            })
          );
          setTipodeLeilao(parsedTipodeLeilao);
        } else {
          console.error(
            "Dados de tipo de leilão não encontrados ou formato inválido."
          );
        }
      } catch (error) {
        console.error("Erro ao buscar tipo de leilão:", error);
      }
    };

    fetchSaleType();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    sessionStorage.setItem("filters", JSON.stringify(data));

    const queryParams = buildQueryParams(data);

    const currentParams = new URLSearchParams(window.location.search);
    queryParams.split("&").forEach((param) => {
      const [key, value] = param.split("=");
      if (value) currentParams.set(key, value);
    });

    router.push(`/dashboard?${queryParams}`);
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
                        ? `${field.value.slice(0, 2).join(", ")}${
                            field.value.length > 2
                              ? `, +${field.value.length - 2} estados...`
                              : ""
                          }`
                        : "Selecione os estados"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="max-w-[300px] p-0">
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
                              let updatedValue;

                              // Adicionar ou remover estado
                              if (currentValue.includes(estado.value)) {
                                updatedValue = currentValue.filter(
                                  (e) => e !== estado.value
                                );
                              } else {
                                updatedValue = [...currentValue, estado.value];
                              }

                              // Atualizar o valor do estado
                              form.setValue("estado", updatedValue);

                              // Resetar o campo "cidade"
                              form.setValue("cidade", []); // ou [] para arrays
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
                        ? `${field.value.slice(0, 2).join(", ")}${
                            field.value.length > 2
                              ? `, +${field.value.length - 2} cidades...`
                              : ""
                          }`
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
                        field.value?.length === 0 && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length > 0
                        ? `${field.value.slice(0, 2).join(", ").toUpperCase()}${
                            field.value.length > 2
                              ? `, +${field.value.length - 2} bairros...`
                              : ""
                          }`
                        : "Selecione o Bairro"}
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

        {/* tipo de leilao */}
        <FormField
          control={form.control}
          name="tipodeleilao"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Tipo de Leilão</FormLabel>
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
                        ? `${field.value.slice(0, 1).join(", ").toUpperCase()}${
                            field.value.length > 2
                              ? `, +${
                                  field.value.length - 2
                                } tipos de leilões...`
                              : ""
                          }`
                        : "Selecione o tipo de leilão"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] p-0">
                  <Command>
                    <CommandInput placeholder="Pesquisar tipo de leilão..." />
                    <CommandList>
                      <CommandEmpty>
                        Nenhum tipo de leilão encontrado.
                      </CommandEmpty>
                      <CommandGroup>
                        {tipoDeLeilao.map((tipodeleilao) => (
                          <CommandItem
                            key={tipodeleilao.value}
                            value={tipodeleilao.label}
                            onSelect={() => {
                              const currentValue = field.value || [];
                              if (currentValue.includes(tipodeleilao.value)) {
                                form.setValue(
                                  "tipodeleilao",
                                  currentValue.filter(
                                    (e) => e !== tipodeleilao.value
                                  )
                                );
                              } else {
                                form.setValue("tipodeleilao", [
                                  ...currentValue,
                                  tipodeleilao.value,
                                ]);
                              }
                            }}
                          >
                            {tipodeleilao.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value?.includes(tipodeleilao.value)
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
        <FormField
          control={form.control}
          name="minPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço Mínimo</FormLabel>
              <FormControl>
                <NumericFormat
                  {...field}
                  placeholder="Selecione um valor"
                  type="text"
                  className="border rounded bg-background w-full px-2 py-1"
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  allowNegative={false}
                  onValueChange={({ value }) => {
                    const cleanedValue = value
                      ? value.replace(/[^\d]/g, "")
                      : "";

                    field.onChange(cleanedValue);
                  }}
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
                <NumericFormat
                  {...field}
                  placeholder="Selecione um valor"
                  type="text"
                  className="border rounded bg-background w-full px-2 py-1"
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  allowNegative={false}
                  onValueChange={({ value }) => {
                    const cleanedValue = value
                      ? value.replace(/[^\d]/g, "")
                      : "";

                    field.onChange(cleanedValue);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Desconto */}
        <FormField
          control={form.control}
          name="desconto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desconto mínimo</FormLabel>
              <FormControl>
                <NumericFormat
                  {...field}
                  placeholder="Selecione de 0% a 99%"
                  type="text"
                  className="border rounded bg-background w-full px-2 py-1"
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="% "
                  allowNegative={false}
                  isAllowed={({ value }) => {
                    const numericValue = Number(value.replace(/\D/g, ""));
                    return numericValue >= 0 && numericValue <= 99;
                  }}
                  onValueChange={({ value }) => {
                    field.onChange(
                      value ? Number(value.replace(/\D/g, "")) : undefined
                    );
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="p-0 text-teal-500"
          variant="link"
          onClick={clearFilters}
        >
          Limpar filtros
        </Button>

        <DrawerClose asChild className="w-full">
          <Button
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            type="submit"
          >
            Aplicar Filtros
          </Button>
        </DrawerClose>
      </form>
    </Form>
  );
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp } from "lucide-react";

export function OrderByFilter() {
  const router = useRouter();
  const [position, setPosition] = React.useState<string>("bottom");

  const handleValueChange = (value: string) => {
    setPosition(value);
    router.push(`?sort=${value}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="ml-2 mr-2">
          <ArrowDownUp /> Ordenar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Ordenar por:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={handleValueChange}
        >
          <DropdownMenuRadioItem value="">Sem ordenacao</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="endDateDesc">
            Mais próximo de finalizar
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="endDateAsc">
            Menos próximo de finalizar
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="priceDesc">
            Maior valor
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="priceAsc">
            Menor valor
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="discountDesc">
            Maior desconto
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="discountAsc">
            Menor desconto
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

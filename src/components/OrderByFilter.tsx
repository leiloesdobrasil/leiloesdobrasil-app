"use client";

import * as React from "react";

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
  const [position, setPosition] = React.useState("bottom");

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
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">
            Mais proximo de finalizar
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">
            Menos proximo de finalizar
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">
            Maior valor
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right2">
            Menor valor
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right3">
            Maior desconto
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right4">
            Menor desconto
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

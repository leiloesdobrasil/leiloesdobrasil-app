"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
import { Save } from "lucide-react";

export function FilterSaved() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [position, setPosition] = React.useState<string>("");

  const handleValueChange = (value: string) => {
    setPosition(value);

    const params = new URLSearchParams(searchParams?.toString());
    params.set("sort", value);

    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="ml-2 mr-2">
          <Save /> Filtros Salvos
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Meus filtros:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={handleValueChange}
        >
          <DropdownMenuRadioItem value="endDateDesc">
            Aqui vao estar os filtros salvos
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

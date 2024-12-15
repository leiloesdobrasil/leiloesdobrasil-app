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
import { Layers2 } from "lucide-react";

export function PerPageSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [position, setPosition] = React.useState<string>("bottom");

  const handleValueChange = (value: string) => {
    setPosition(value);

    const params = new URLSearchParams(searchParams?.toString());
    params.set("perPage", value);

    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="mr-2">
          <Layers2 /> Exibir por página
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Ordenar por:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={handleValueChange}
        >
          <DropdownMenuRadioItem value="15">
            15 leilões por página
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="30">
            30 leilões por página
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="50">
            50 leilões por página
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="70">
            70 leilões por página
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="100">
            100 leilões por página
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

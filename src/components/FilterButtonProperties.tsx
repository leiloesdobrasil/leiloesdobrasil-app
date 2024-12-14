"use client";

import * as React from "react";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FieldsFilterProperties } from "./FieldsFIlterProperties";
import { ScrollArea } from "@/components/ui/scroll-area";

export function FilterButtonProperties() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary" className="ml-2">
          <Filter /> Filtros
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Filtro</DrawerTitle>
            <DrawerDescription>
              Facilite sua pesquisa aplicando nossos filtros.
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="h-[800px]">
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <FieldsFilterProperties />
              </div>
            </div>
          </ScrollArea>

          <DrawerFooter className="flex justify-end"></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

"use client";

import * as React from "react";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FieldsFilterProperties } from "./FieldsFIlterProperties";

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
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <FieldsFilterProperties />
            </div>
          </div>

          <DrawerFooter className="flex justify-end">
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

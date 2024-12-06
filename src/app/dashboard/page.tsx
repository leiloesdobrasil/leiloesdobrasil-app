"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import AuctionsPropertiesView from "../views/AuctionsPropertiesView";

export default function Page() {
  const [activeView, setActiveView] = useState("imoveis");

  const renderView = () => {
    switch (activeView) {
      case "imoveis":
        return (
          <>
            <AuctionsPropertiesView />
          </>
        );
      case "veiculos":
        return <div>Exibindo visão de Veículos.</div>;
      case "maquinas":
        return <div>Exibindo visão de Máquinas.</div>;
      case "configuracoes":
        return <div>Configurações do Sistema.</div>;
      default:
        return <div>Selecione uma visão no menu lateral.</div>;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar onMenuSelect={(view) => setActiveView(view)} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 relative">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{activeView}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="absolute right-4 top-4">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {renderView()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

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
        return <AuctionsPropertiesView />;
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
      <div className="flex h-screen">
        <AppSidebar onMenuSelect={(view) => setActiveView(view)} />
        <SidebarInset className="flex flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-10 flex h-12 items-center bg-[#08A0A0] border-b px-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 text-white" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink className="text-white" href="#">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block text-white" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-white">{activeView}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <ModeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4">{renderView()}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

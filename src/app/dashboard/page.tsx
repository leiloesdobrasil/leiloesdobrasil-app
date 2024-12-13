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
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import AuctionsPropertiesView from "../views/AuctionsPropertiesView";
import Sonar from "@/components/Sonar";

export default function Page() {
  const [activeView, setActiveView] = useState("imoveis");

  useEffect(() => {
    setActiveView("imoveis");
  }, []);

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
      case "Sonar":
        return <Sonar />;
      default:
        return <div>Selecione uma visão no menu lateral.</div>;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar onMenuSelect={(view) => setActiveView(view)} />
        <SidebarInset className="flex flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-10 flex h-12 items-center px-4 dark:bg-[#17181c]">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 dark:text-white text-black" />
                <Separator
                  orientation="vertical"
                  className="mr-2 h-4 dark:text-white text-black"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="dark:text-white text-black hidden md:block">
                      <BreadcrumbLink
                        className="dark:text-white text-black"
                        href="#"
                      >
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="dark:text-white text-black hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="dark:text-white text-black">
                        {activeView}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <ModeToggle />
            </div>
          </header>
          <main className="flex-1 dark:bg-[#17181c] overflow-y-auto p-4 w-full ">
            {renderView()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

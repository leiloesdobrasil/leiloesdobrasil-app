"use client";

import { useState, useEffect } from "react";
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
import { ModeToggle } from "@/components/ModeToggle";
import AuctionsPropertiesView from "../views/AuctionsPropertiesView";
import Sonar from "@/components/Sonar";
import AnalyticsView from "../views/AnalyticsView";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Activity, Car, Home, Radar, Tractor, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import LogoLight from "../../assets/logolight.svg";
import LogoDark from "../../assets/logodark.svg";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Page() {
  const [activeView, setActiveView] = useState("imoveis");

  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";

  useEffect(() => {
    setActiveView("imoveis");
  }, []);

  const renderView = () => {
    switch (activeView) {
      case "imoveis":
        return <AuctionsPropertiesView />;
      case "minha atividade":
        return <div>Exibindo visão de minha atividade.</div>;
      case "veículos":
        return <div>Exibindo visão de Veículos.</div>;
      case "maquinas":
        return <div>Exibindo visão de Máquinas.</div>;
      case "configuracoes":
        return <div>Configurações do Sistema.</div>;
      case "Sonar":
        return <Sonar />;
      case "Analytics":
        return <AnalyticsView />;
      default:
        return <div>Selecione uma visão no menu lateral.</div>;
    }
  };

  const categories = [
    "Imóveis",
    "Veículos",
    "Maquinas",
    "Atividade",
    "Sonar",
    "Analytics",
  ];

  const navItems = [
    { icon: Radar, label: "Sonar", view: "Sonar" },
    { icon: Activity, label: "Atividade", view: "favoritos" },
    { icon: Home, label: "Imóveis", view: "imoveis" },
    { icon: Car, label: "Veículos", view: "veículos" },
    { icon: Tractor, label: "Maquinas", view: "maquinas" },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar onMenuSelect={(view) => setActiveView(view)} />
        <SidebarInset className="flex flex-1 flex-col overflow-hidden">
          {/* Desktop Header */}
          <header className="sticky top-0 z-10 hidden md:flex h-12 items-center px-4 dark:bg-[#17181c]">
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

          {/* Mobile Header */}
          <header className="md:hidden">
            <div className="flex flex-col gap-4 p-4  dark:bg-[#17181c]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={currentTheme === "dark" ? LogoLight : LogoDark}
                    alt="logo"
                    className="max-w-[300px] object-cover"
                    style={{
                      borderRadius: "6px",
                    }}
                    width={200}
                  />
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="O que você quer ver?" className="pl-9" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="rounded-md  bg-background px-4 py-1.5 text-sm"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <main className="flex-1 dark:bg-[#17181c] overflow-y-auto overflow-x-hidden p-4 md:p-0 w-full pb-20 md:pb-4">
            {renderView()}
          </main>

          {/* Mobile Navigation */}
          <nav className="fixed bottom-0 dark:bg-[#17181c] left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background px-4 md:hidden">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setActiveView(item.view)}
                className={cn(
                  "flex flex-col items-center gap-1",
                  activeView === item.view
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </nav>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

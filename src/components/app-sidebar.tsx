"use client";

import * as React from "react";
import {
  Activity,
  Car,
  Command,
  Home,
  LifeBuoy,
  Radar,
  Send,
  Settings2,
  Tractor,
  ChartArea,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Minha Atividade",
      url: "#",
      icon: Activity,
      isActive: true,
      items: [
        {
          title: "Leiloes Curtidos",
          url: "#",
        },
        {
          title: "Leiloes Ocultos",
          url: "#",
        },
      ],
    },
    {
      title: "Imoveis",
      url: "#",
      icon: Home,
      items: [
        {
          title: "Todos os Imóveis",
          url: "#",
        },
        {
          title: "Imóveis Caixa",
          url: "#",
        },
      ],
    },
    {
      title: "Veículos",
      url: "#",
      icon: Car,
    },
    {
      title: "Maquinas",
      url: "#",
      icon: Tractor,
    },
    {
      title: "Configuracoes",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Informacoes da conta",
          url: "#",
        },
        {
          title: "Pagamentos",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Analytics",
      url: "#",
      icon: ChartArea,
    },
    {
      name: "Sonar",
      url: "#",
      icon: Radar,
    },
  ],
};

export function AppSidebar({
  onMenuSelect,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  onMenuSelect: (view: string) => void;
}) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Leiloes do Brasil
                  </span>
                  <span className="truncate text-xs">LTDA</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            onClick: () => onMenuSelect(item.title.toLowerCase()),
          }))}
        />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

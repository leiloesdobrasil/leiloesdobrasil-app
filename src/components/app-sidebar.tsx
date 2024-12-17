import * as React from "react";
import { Activity, Car, Home, Radar, Tractor, ChartArea } from "lucide-react";

import LogoLight from "../assets/logolight.svg";
import LogoDark from "../assets/logodark.svg";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
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
import Image from "next/image";
import { useTheme } from "next-themes";

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
      url: "/dashboard",
      icon: Home,
      isActive: true,

      items: [
        {
          title: "Todos os Imóveis",
          url: "/dashboard",
        },
        {
          title: "Imóveis Caixa",
          url: "/dashboard?bank=caixa",
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
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";

  const [selectedMenu, setSelectedMenu] = React.useState<string>("");

  // Função para alterar o item selecionado
  const handleMenuSelect = (view: string) => {
    setSelectedMenu(view); // Define o item como selecionado
    onMenuSelect(view); // Passa o item selecionado para a função de callback
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <Image
                  src={currentTheme === "dark" ? LogoLight : LogoDark}
                  alt={"logo"}
                  className="w-full object-cover"
                  style={{
                    borderRadius: "6px",
                  }}
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Renderiza o menu principal */}
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            onClick: () => handleMenuSelect(item.title.toLowerCase()),
            className:
              item.title.toLowerCase() === selectedMenu
                ? "bg-blue-500 text-black" // Estilo de foco
                : "hover:bg-gray-200", // Estilo para hover
            "aria-selected":
              item.title.toLowerCase() === selectedMenu ? "true" : "false",
            tabIndex: 0, // Para navegação via teclado
          }))}
        />
        {/* Renderiza os projetos */}
        <NavProjects
          projects={data.projects.map((project) => ({
            ...project,
            onClick: () => handleMenuSelect(project.name),
            className:
              project.name === selectedMenu
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200", // Estilo para hover
            "aria-selected": project.name === selectedMenu ? "true" : "false",
            tabIndex: 0, // Para navegação via teclado
          }))}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

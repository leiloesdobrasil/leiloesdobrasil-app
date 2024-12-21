import { MapPin, Heart, Search, Home, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function MobileNav({ activeView, onViewChange }: MobileNavProps) {
  const navItems = [
    { icon: MapPin, label: "Mapa", view: "mapa" },
    { icon: Heart, label: "Favoritos", view: "favoritos" },
    { icon: Search, label: "Buscar", view: "buscar" },
    { icon: Home, label: "Home", view: "imoveis" },
    { icon: User, label: "Buscar", view: "perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background px-4 md:hidden">
      {navItems.map((item) => (
        <button
          key={item.view}
          onClick={() => onViewChange(item.view)}
          className={cn(
            "flex flex-col items-center gap-1",
            activeView === item.view ? "text-primary" : "text-muted-foreground"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className="text-xs">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

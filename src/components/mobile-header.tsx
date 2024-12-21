import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MobileHeader() {
  return (
    <div className="flex flex-col gap-4 p-4 md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold">Leilões do Brasil</span>
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
        {["Carros", "Máquinas", "Imóveis", "Garagem", "Terreno"].map(
          (category) => (
            <button
              key={category}
              className="rounded-full border bg-background px-4 py-1.5 text-sm"
            >
              {category}
            </button>
          )
        )}
      </div>
    </div>
  );
}

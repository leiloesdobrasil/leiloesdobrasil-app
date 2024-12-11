import { Filter, ArrowDownUp, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShareFilter } from "./ShareFilter";

function CardAuctionFilter() {
  return (
    <div className="flex items-center justify-between w-full p-2">
      <div className="flex items-center">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />{" "}
            <Input
              className="pl-10"
              type="text"
              placeholder="O que você está procurando?"
            />
          </div>
          <Button variant="secondary" className="ml-2">
            <Filter /> Filtros
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <Button variant="secondary" className="ml-2 mr-2">
          <ArrowDownUp /> Ordenar
        </Button>
        <ShareFilter />
      </div>
    </div>
  );
}

export default CardAuctionFilter;

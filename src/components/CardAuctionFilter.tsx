import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ShareFilter } from "./ShareFilter";
import { OrderByFilter } from "./OrderByFilter";
import { FilterButtonProperties } from "./FilterButtonProperties";

function CardAuctionFilter() {
  return (
    <div className="flex items-center justify-between w-full p-2">
      <div className="flex items-center">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              className="pl-10"
              type="text"
              placeholder="O que você está procurando?"
            />
          </div>
          <FilterButtonProperties />
        </div>
      </div>
      <div className="flex items-center">
        <OrderByFilter />
        <ShareFilter />
      </div>
    </div>
  );
}

export default CardAuctionFilter;

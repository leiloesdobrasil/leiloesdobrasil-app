import CardAuction from "./CardAuction";

interface ContentSwitcherProps {
  activeView: string;
  auctions: any[];
  loading: boolean;
  currentPage: number;
  meta: any;
  setCurrentPage: (page: number) => void;
}

export default function ContentSwitcher({
  activeView,
  auctions,
  loading,
  currentPage,
  setCurrentPage,
  meta,
}: ContentSwitcherProps) {
  switch (activeView) {
    case "leiloes":
      return (
        <div className="ml-[15rem]">
          <AuctionContent
            auctions={auctions}
            loading={loading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            meta={meta}
          />
        </div>
      );
    case "imoveis":
      return <SimpleMessage message="Lista de imóveis aparecerá aqui..." />;
    case "veiculos":
      return <SimpleMessage message="Lista de veículos aparecerá aqui..." />;
    case "maquinas":
      return <SimpleMessage message="Lista de máquinas aparecerá aqui..." />;
    case "minhaatividade":
      return <div className="ml-[18rem] mt-[1rem]">porra</div>;
    case "sonar":
      return <div className="ml-[16rem] ">porra</div>;
    case "analytics":
      return <SimpleMessage message="Lista de máquinas aparecerá aqui..." />;
    case "userconfig":
      return <div className="ml-[18rem] mt-[1rem]">porra</div>;
    case "whatsapp":
      return <SimpleMessage message="Lista de máquinas aparecerá aqui..." />;
    case "billing":
      return <SimpleMessage message="Lista de máquinas aparecerá aqui..." />;
    case "themes":
      return <SimpleMessage message="Lista de máquinas aparecerá aqui..." />;
    default:
      return null;
  }
}

interface AuctionContentProps {
  auctions: any[];
  loading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  meta: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
  };
}

function AuctionContent({
  auctions,
  currentPage,
  setCurrentPage,
  meta,
}: AuctionContentProps) {
  const totalPages = meta.lastPage || Math.ceil(meta.total / meta.perPage);
  return (
    <div className="p-4 flex flex-wrap">{<CardAuction items={auctions} />}</div>
  );
}

interface SimpleMessageProps {
  message: string;
}

function SimpleMessage({ message }: SimpleMessageProps) {
  return (
    <div className="p-4 sm:ml-64">
      <p>{message}</p>
    </div>
  );
}

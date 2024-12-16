import { useEffect, useState, useCallback } from "react";
import CardAuction from "@/components/CardAuction";
import PaginationControls from "@/components/PaginationControls";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import CardAuctionFilter from "../../components/CardAuctionFilter";
import { SkeletonCard } from "../../components/SkeletonCard";
import { AxiosError } from "axios";

export default function AuctionsPropertiesView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noAuctionsMessage, setNoAuctionsMessage] = useState("");

  const fetchAuctions = useCallback(async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado!");
      router.push("/login");
      return;
    }

    try {
      const params = Object.fromEntries(searchParams.entries());

      const defaultParams = {
        state: params.state || "SP", // Se o estado não estiver na URL, usará "SP"
        perPage: params.perPage || "15", // Se a quantidade de itens não estiver definida, usará 15
        page: params.page || "1", // Se a página não estiver definida, usará 1
      };

      // Misturando os parâmetros existentes com os valores padrão
      const newParams = new URLSearchParams({ ...defaultParams, ...params });
      router.push(`/dashboard?${newParams.toString()}`, undefined); // Atualiza a URL sem sobrescrever completamente

      const response = await api.get("/auctions", {
        params: defaultParams, // Passa apenas os valores padrão para a requisição
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data, meta } = response.data;
      setAuctions(data);
      setTotalPages(Math.ceil(meta.total / meta.perPage));

      if (data.length === 0) {
        setNoAuctionsMessage("Nenhum leilão encontrado para essa pesquisa.");
      } else {
        setNoAuctionsMessage("");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.status === 404) {
            setNoAuctionsMessage("Leilão não encontrado.");
            setTotalPages(0);
          } else {
            console.error("Erro ao buscar leilões:", error.response);
          }
        } else {
          console.error("Erro de rede ou outro erro:", error);
          setTotalPages(0);
        }
      } else {
        console.error("Erro desconhecido:", error);
        setTotalPages(0);
      }
    } finally {
      setLoading(false);
    }
  }, [router, searchParams]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Atualiza os parâmetros da URL com o novo valor de página
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", page.toString());

    // Navega para a nova página com os parâmetros atualizados
    router.push(`/dashboard?${newParams.toString()}`, undefined);
  };

  useEffect(() => {
    // Obtém o valor da página diretamente da URL e atualiza o estado
    const pageFromUrl = parseInt(searchParams.get("page") || "1");
    setCurrentPage(pageFromUrl);

    // Chama a função para buscar os leilões sempre que a URL mudar
    fetchAuctions();
  }, [searchParams, fetchAuctions]);

  return (
    <>
      {" "}
      {/* Adicionando ref no container */}
      <CardAuctionFilter />
      {loading ? (
        <div className="flex flex-wrap justify-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : noAuctionsMessage ? (
        <div className="text-center text-red-500">{noAuctionsMessage}</div>
      ) : (
        <CardAuction items={auctions} />
      )}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import CardAuction from "@/components/CardAuction";
import PaginationControls from "@/components/PaginationControls";
import api from "@/services/api";
import { useRouter } from "next/navigation";

export default function AuctionsPropertiesView() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAuctions(currentPage);
  }, [currentPage]);

  const fetchAuctions = async (page: number) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Você precisa estar logado!");
        router.push("/login");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.get("/auctions", {
        params: { page },
        ...config,
      });

      setAuctions(response.data.data);
      setTotalPages(
        Math.ceil(response.data.meta.total / response.data.meta.perPage)
      );
    } catch (error: any) {
      console.error(
        "Erro ao buscar leilões:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CardAuction items={auctions} />
      <PaginationControls
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}

import { useEffect, useState, useCallback } from "react";
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

  const fetchAuctions = useCallback(
    async (page: number) => {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Você precisa estar logado!");
        router.push("/login");
        return;
      }

      try {
        const response = await api.get("/auctions", {
          params: { page },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { data, meta } = response.data;
        setAuctions(data);
        setTotalPages(Math.ceil(meta.total / meta.perPage));
      } catch (error: unknown) {
        console.error("Erro ao buscar leilões:", error);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    fetchAuctions(currentPage);
  }, [currentPage, fetchAuctions]);

  return (
    <>
      {loading && <p>Loading...</p>}
      <CardAuction items={auctions} />
      <PaginationControls
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}

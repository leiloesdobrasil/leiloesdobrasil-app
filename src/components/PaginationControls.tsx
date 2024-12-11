import React, { useEffect } from "react";

interface PaginationControlsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const getVisiblePages = () => {
    const maxPagesToShow = 10;
    const pages: number[] = [];

    // Lógica para mostrar páginas ao redor da atual
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  // Usando useEffect para rolar ao topo quando a página mudar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]); // Quando currentPage mudar, o scroll será acionado

  return (
    <nav
      aria-label="Page navigation example"
      className="mt-4 w-full flex justify-center align-center items-center"
    >
      <ul className="flex items-center -space-x-px h-10 text-base">
        {/* Botão Anterior */}
        <li>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 cursor-pointer bg-white border-gray-300 dark:bg-[#1F1F23] dark:border-gray-600 dark:text-white
             border border-e-0 rounded-s-lg hover:text-indigo-400`}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>

        {/* Números das Páginas */}
        {visiblePages.map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`Onest flex items-center justify-center px-4 h-10 bg-white border border-gray-300
                  dark:bg-[#1F1F23] dark:border dark:border-gray-600 dark:text-white
               leading-tight ${
                 page === currentPage
                   ? "text-white bg-[linear-gradient(90deg,_#08A0A0,_#08A0A0)]"
                   : "text-gray-500"
               }`}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Botão Próxima */}
        <li>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-4 h-10 leading-tight dark:bg-[#1F1F23] text-gray-500 bg-white border-gray-300 dark:bg-[#1F1F23] dark:border-gray-600 dark:text-white
             border rounded-e-lg  hover:text-indigo-400`}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationControls;

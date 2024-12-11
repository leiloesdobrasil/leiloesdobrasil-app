import CardImage from "../assets/Leilao-online.jpg";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

interface ImovelPracas {
  originalPrice: number;
}

interface SelectedItem {
  photos?: string;
  title: string;
  road: string;
  saleType: string;
  imovelPracas?: ImovelPracas[];
  docs?: string;

  geolocation?: string;
  auctioneerLink: string;
}

interface Doc {
  type: string;
  link: string;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  selectedItem: SelectedItem | null;
}
const Modal: React.FC<ModalProps> = ({ open, onClose, selectedItem }) => {
  if (!open || !selectedItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  backdrop-blur-sm">
      <div
        className={
          "shadow-lg relative grid grid-cols-1 md:grid-cols-2 w-[85%] h-[85%] bg-white text-gray-900 rounded-lg dark:bg-[#1e1f23] dark:text-gray-200"
        }
      >
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8  transition-all rounded-full hover:scale-110"
        >
          <X />
        </button>

        {/* Coluna da Imagem */}
        <div className="flex items-center justify-center ">
          {selectedItem.photos && selectedItem.photos.trim() !== "" ? (
            <Image
              src={JSON.parse(selectedItem.photos.replace(/'/g, '"'))[0]}
              alt={selectedItem.title}
              width={500}
              height={400}
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <Image
              src={CardImage}
              alt={selectedItem.title || "Imagem padrao"}
              width={500}
              height={400}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Coluna das Informações */}
        <div className="flex flex-col justify-between p-4">
          <div>
            <h2 className="text-medium mt-6 font-bold mb-4">
              {selectedItem.title}
            </h2>
            <p className="mt-1 mb-5 text-sm font-normal text-gray-700 dark:text-gray-400">
              Localização: {selectedItem.road}
            </p>

            {/* Tabela de Informações */}
            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left text-white border-b dark:border-gray-700">
                <thead className="text-xs uppercase border-b dark:border-gray-700 bg-[#08A0A0] dark:bg-[#065B5B]">
                  <tr>
                    <th className="px-6 py-3">Leilão</th>
                    <th className="px-6 py-3">Data</th>
                    <th className="px-6 py-3">Categoria</th>
                    <th className="px-6 py-3">Preço</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700 text-black">
                    <td className="px-6 py-4">{selectedItem.saleType}</td>
                    <td className="px-6 py-4">{selectedItem.saleType}</td>
                    <td className="px-6 py-4">
                      {selectedItem.imovelPracas &&
                        selectedItem.imovelPracas[0]?.originalPrice.toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Documentos */}
            {selectedItem.docs && (
              <div className="mt-4">
                <h3 className="mt-3 mb-2 text-gray-800 dark:text-gray-100">
                  Documentos:
                </h3>
                <div className="flex flex-wrap space-x">
                  {JSON.parse(selectedItem.docs.replace(/'/g, '"')).map(
                    (doc: Doc, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col items-center space-y-2"
                      >
                        <span className="text-sm font-semibold dark:text-gray-100">
                          {doc.type}
                        </span>
                        <a
                          href={doc.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#08A0A0] dark:text-[#06B6B6] hover:underline"
                        >
                          Ver Documento
                        </a>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          <Link target="_blank" href={selectedItem.auctioneerLink}>
            <button className="more-info w-full rounded-md bg-[#08A0A0] text-white px-4 py-2 font-semibold shadow-md hover:shadow-lg hover:bg-[#06B6B6] transition-all duration-300">
              Ir para o site do leiloeiro
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;

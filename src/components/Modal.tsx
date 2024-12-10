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
  inclusionDate: string;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={
          "shadow-lg relative grid grid-cols-1 md:grid-cols-2 w-[85%] h-[85%] bg-white dark:bg-[#1F1F23] text-white"
        }
      >
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 bg-[#08A0A0] transition-all rounded-full"
        >
          <X />
        </button>

        {/* Coluna da Imagem */}
        <div className="flex items-center justify-center">
          {selectedItem.photos && selectedItem.photos !== "" ? (
            <Image
              src={JSON.parse(selectedItem.photos.replace(/'/g, '"'))[0] || ""}
              alt={selectedItem.title}
              width={500}
              height={400}
              className="object-cover w-full h-full"
            />
          ) : (
            <Image
              src={CardImage}
              alt={selectedItem.title}
              width={500}
              height={400}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Coluna das Informações */}
        <div className="flex flex-col justify-between p-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2>
            <p
              className={
                "mt-1 mb-5 text-sm font-normal text-gray-700 dark:text-gray-400"
              }
            >
              Localização: {selectedItem.road}
            </p>

            {/* Tabela de Informações */}
            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
                <thead className="text-xs uppercase border-b dark:border-gray-700 bg-[#08A0A0]">
                  <tr>
                    <th className="px-6 py-3">Leilão</th>
                    <th className="px-6 py-3">Data</th>
                    <th className="px-6 py-3">Categoria</th>
                    <th className="px-6 py-3">Preço</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-6 py-4">{selectedItem.saleType}</td>
                    {/* <td className="px-6 py-4">
                      {format(
                        new Date(selectedItem.inclusionDate),
                        "dd/MM/yyyy",
                        { locale: ptBR }
                      )}
                    </td> */}
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
                <h3 className="mt-3 mb-2">Documentos:</h3>
                <div className="flex flex-wrap space-x">
                  {JSON.parse(selectedItem.docs.replace(/'/g, '"')).map(
                    (doc: Doc, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col items-center space-y-2"
                      >
                        <span className="text-sm font-semibold">
                          {doc.type}
                        </span>
                        <a
                          href={doc.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        ></a>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          <Link target="_blank" href={selectedItem.auctioneerLink}>
            <button className="more-info w-full rounded-md bg-[#08A0A0] text-white px-4 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
              Ir para o site do leiloeiro
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;

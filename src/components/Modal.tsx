import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Map, FileCheck } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import ImageCard from "../assets/Leilao-online.jpg";

interface ImovelPracas {
  originalPrice: number;
  inclusionDate: string;
}

export interface CardAuctionProps {
  id: string;
  prev: string;
  title: string;
  road: string;
  photos: string;
  firstAuctionPrice: number;
  secondAuctionPrice: number;
  originalPrice: number;
  firstAuctionDate: string;
  secondAuctionDate: string;
  discountedPrice: number | null;
  saleType: string;
  auctioneerLink: string;
  informacaoJudicial: string;
  discount: number | null;
  typePayments: string;
  propertyType: string | null;
  geolocation: string;
  docs: string;
  description: string;
  imovelPracas: ImovelPracas[];
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  selectedItem: CardAuctionProps | null;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, selectedItem }) => {
  if (!open || !selectedItem) return null;

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string): string => {
    try {
      const parsedDate = new Date(date);
      return parsedDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      console.error("Erro ao formatar a data:", error, date);
      return date; // Retorna a data original em caso de erro
    }
  };

  const openMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${selectedItem.geolocation}`,
      "_blank"
    );
  };

  // Sanitiza a string de fotos
  const photos = JSON.parse(selectedItem.photos.replace(/'/g, '"'));

  // Sanitiza e tenta parsear os documentos
  let parsedDocs = [];
  try {
    if (typeof selectedItem.docs === "string" && selectedItem.docs.trim()) {
      const sanitizedDocs = selectedItem.docs
        .replace(/'/g, '"') // Substitui aspas simples por aspas duplas
        .replace(/,\s*}/g, "}") // Remove vírgulas extras antes de fechar chaves
        .replace(/,\s*]/g, "]"); // Remove vírgulas extras antes de fechar colchetes

      parsedDocs = JSON.parse(sanitizedDocs);
    }
  } catch (error) {
    console.error("Erro ao processar os documentos:", error, selectedItem.docs);
  }

  const hasDiscount =
    selectedItem.discountedPrice &&
    selectedItem.discountedPrice !== selectedItem.originalPrice;
  const multiplePayments =
    selectedItem.typePayments && selectedItem.typePayments.length > 1;

  const hasPropertyType = selectedItem.propertyType != null;

  console.log(photos);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative grid w-[80%] h-[80%] grid-cols-1 overflow-y-auto bg-background dark:bg-[#1f1f23] rounded-lg shadow-lg md:grid-cols-2">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 transition-all rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Seção de Fotos */}
        <div className="flex items-center justify-center p-4">
          <Carousel className="relative w-full">
            <CarouselContent>
              {/* Verifica se a lista de fotos está vazia */}
              {photos.length === 0 ? (
                <CarouselItem key={0}>
                  <div className="relative">
                    <Image
                      src={ImageCard} // Imagem padrão que você deseja exibir
                      alt={`${selectedItem.title} - Imagem Padrão`}
                      width={500}
                      height={400}
                      className="object-cover w-full rounded-lg"
                    />
                    {/* Botões do carrossel */}
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 text-black rounded-full hover:bg-white p-2" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 text-black rounded-full hover:bg-white p-2" />
                  </div>
                </CarouselItem>
              ) : (
                // Caso tenha fotos, exibe o carrossel com as imagens
                photos.map((photo: string, index: number) => (
                  <CarouselItem key={index}>
                    <div className="relative">
                      <Image
                        src={photo} // Imagem da lista
                        alt={`${selectedItem.title} - Imagem ${index + 1}`}
                        width={500}
                        height={400}
                        className="object-cover w-full rounded-lg"
                      />
                      {/* Botões do carrossel */}
                      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 text-black rounded-full hover:bg-white p-2" />
                      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 text-black rounded-full hover:bg-white p-2" />
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Seção de Informações */}
        <div className="flex flex-col justify-between p-6">
          <div>
            <h2 className="mb-1 text-lg font-bold">{selectedItem.title}</h2>
            <div>
              {hasDiscount && (
                <span className="font-geist-mono mr-1 mb-2 inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-1.5 py-0.4 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                  <span className="font-geist-mono w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                  {selectedItem.discount + "%"}
                </span>
              )}
              {multiplePayments &&
                selectedItem.typePayments &&
                selectedItem.typePayments.replace(/[\[\]'"]/g, "") !== "" && (
                  <span className="font-geist-mono mb-2 mr-1 inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.4 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <span className="font-geist-mono w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                    {selectedItem.typePayments.replace(/[\[\]'"]/g, "")}
                  </span>
                )}
              {hasPropertyType && (
                <span className="font-geist-mono mb-2 inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-1.5 py-0.4 rounded-full dark:bg-green-900 dark:text-green-300">
                  <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                  {selectedItem.propertyType}
                </span>
              )}
            </div>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Localização: {selectedItem.road}{" "}
              {selectedItem.geolocation && (
                <Button onClick={openMaps} variant={"link"}>
                  <Map className="w-5 h-5" />
                  Abrir no Google Maps
                </Button>
              )}
            </p>

            {/* Tabela de Leilões */}
            <div className="mb-6 overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-teal-600 dark:bg-teal-700">
                  <tr>
                    <th className="px-6 py-3">Leilão</th>
                    <th className="px-6 py-3">Data</th>
                    <th className="px-6 py-3">Preço Original</th>
                    <th className="px-6 py-3">Preço Atual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-background dark:bg-[#1f1f23] text-black dark:text-white border-b ">
                    <td className="px-6 py-4">{selectedItem.saleType}</td>
                    <td className="px-6 py-4">
                      {formatDate(selectedItem.firstAuctionDate)}
                    </td>
                    <td className="px-6 py-4">
                      {formatCurrency(selectedItem.originalPrice)}
                    </td>
                    <td className="px-6 py-4">
                      {selectedItem.discountedPrice
                        ? formatCurrency(selectedItem.discountedPrice)
                        : "Imóvel sem desconto"}
                    </td>
                  </tr>
                  {selectedItem.secondAuctionDate &&
                    selectedItem.secondAuctionPrice && (
                      <tr className="bg-background dark:bg-[#1f1f23] text-black dark:text-white border-b">
                        <td className="px-6 py-4">
                          {selectedItem.saleType} (2ª Leilão)
                        </td>
                        <td className="px-6 py-4">
                          {formatDate(selectedItem.secondAuctionDate)}
                        </td>
                        <td className="px-6 py-4">
                          {formatCurrency(selectedItem.originalPrice)}
                        </td>
                        <td className="px-6 py-4">
                          {formatCurrency(selectedItem.secondAuctionPrice)}
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>

            <h3 className="mb-2 text-lg font-semibold">Descrição:</h3>
            {selectedItem.description ? (
              <div className="mb-6 mt-2">
                <div>
                  <span className="px-3 py-2 text-sm ">
                    {selectedItem.description}
                  </span>
                </div>
              </div>
            ) : (
              <span>Imóvel sem descrição</span>
            )}

            {/* Seção de Documentos */}
            <h3 className="mb-2 text-lg font-semibold">Documentos:</h3>
            {parsedDocs.length > 0 ? (
              <div className="mb-6">
                <div className="flex flex-wrap gap-4">
                  {parsedDocs.map(
                    (doc: { type: string; link: string }, index: number) => (
                      <a
                        key={index}
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 text-sm text-white bg-teal-600 text-center flex items-center justify-center rounded-md hover:bg-teal-700 gap-2"
                      >
                        <span className="flex items-center justify-center w-5 h-5">
                          <FileCheck className="w-full h-full" />
                        </span>
                        {doc.type}
                      </a>
                    )
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nenhum documento disponível.
              </p>
            )}
          </div>

          <h3 className="mb-2 text-lg font-semibold">Valores e descontos:</h3>
          {selectedItem.firstAuctionPrice && (
            <div className="space-x-[13px] w-full flex">
              <div className="mb-4">
                {selectedItem.discountedPrice &&
                selectedItem.discountedPrice !== selectedItem.originalPrice ? (
                  <h4 className="font-geist-mono line-through text-sm text-red-400 mr-3">
                    {formatCurrency(selectedItem.originalPrice)}
                  </h4>
                ) : (
                  <div className="h-5 w-20" />
                )}
                <h1 className="font-geist-mono text-3xl items-center font-semibold text-[#08A0A0]">
                  {selectedItem.discountedPrice
                    ? formatCurrency(selectedItem.discountedPrice)
                    : formatCurrency(selectedItem.firstAuctionPrice)}
                </h1>
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className=" w-full gap-4 mt-4 ">
            <Link href={selectedItem.auctioneerLink} target="_blank" passHref>
              <Button className="more-info w-full rounded-md bg-teal-700 text-white px-4 py-2  shadow-md hover:shadow-lg hover:bg-[#069292] transition-all duration-300">
                Ir para o site do leiloeiro
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

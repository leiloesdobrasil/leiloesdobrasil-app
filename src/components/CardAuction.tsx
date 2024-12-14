import React, { useState, useEffect } from "react";
import Image from "next/image";
import CardImage from "../assets/Leilao-online.jpg";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaHeart, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Calendar } from "lucide-react";
import { getBaseUrl } from "@/utils/helper";
import Modal from "./Modal";
import * as Tooltip from "@radix-ui/react-tooltip";
interface ImovelPracas {
  originalPrice: number;
  inclusionDate: string;
}

interface ImovelProps {
  id: string;
  prev: string;
  title: string;
  road: string;
  photos: string;
  firstAuctionPrice: number;
  originalPrice: number;
  firstAuctionDate: string;
  secondAuctionDate: string;
  discountedPrice: number;
  saleType: string;
  auctioneerLink: string;
  informacaoJudicial: string;
  discount: number;
  typePayments: string;
  propertyType: string | null;
  geolocation: string;
  docs: string;
  imovelPracas: ImovelPracas[];
  liked?: number;
  index: number;
}

interface CardAuctionProps {
  items: ImovelProps[];
}

export default function CardAuction({ items }: CardAuctionProps) {
  const [favoritedItems, setFavoritedItems] = useState<Set<number>>(new Set());
  const [hiddenItems, setHiddenItems] = useState<Set<number>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ImovelProps | null>(null);

  const formattedPrice = (value: number) =>
    Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const toggleFavorite = async (id: string, index: number) => {
    try {
      const token = sessionStorage.getItem("token");
      const isFavorited = favoritedItems.has(index);

      if (isFavorited) {
        await axios.delete(`${getBaseUrl()}/auctions/remove/toggle`, {
          data: { auctionId: id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFavoritedItems((prev) => {
          const newFavorites = new Set(prev);
          newFavorites.delete(index);
          return newFavorites;
        });

        toast.success("Leilão removido dos favoritos!", toastConfig);
      } else {
        await axios.post(
          `${getBaseUrl()}/auctions/toggle`,
          { auctionId: id, liked: true },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFavoritedItems((prev) => {
          const newFavorites = new Set(prev);
          newFavorites.add(index);
          return newFavorites;
        });

        toast.success("Leilão adicionado aos favoritos!", toastConfig);
      }
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
      toast.error("Erro ao atualizar favorito!", toastConfig);
    }
  };

  const toggleVisibility = async (id: string) => {
    try {
      const token = sessionStorage.getItem("token");
      const isHidden = hiddenItems.has(Number(id));

      if (isHidden) {
        await axios.delete(`${getBaseUrl()}/auctions/remove/toggle`, {
          data: { auctionId: id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHiddenItems((prev) => {
          const newHidden = new Set(prev);
          newHidden.delete(Number(id));
          return newHidden;
        });

        toast.success("O leilão deixou de ser oculto.", toastConfig);
      } else {
        await axios.post(
          `${getBaseUrl()}/auctions/toggle`,
          { auctionId: id, liked: false },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHiddenItems((prev) => {
          const newHidden = new Set(prev);
          newHidden.add(Number(id));
          return newHidden;
        });

        toast.success("Leilão foi ocultado com sucesso.", toastConfig);
      }
    } catch (error) {
      console.error("Erro ao atualizar visibilidade:", error);
      toast.error("Erro ao atualizar visibilidade!", toastConfig);
    }
  };

  const openModal = (item: ImovelProps) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const toastConfig: ToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light dark:dark",
  };

  useEffect(() => {
    const initialFavorites = new Set(
      items
        .map((item, index) => (item.liked === 1 ? index : null))
        .filter((id) => id !== null)
    );
    setFavoritedItems(initialFavorites);
  }, [items]);

  return (
    <div className="flex flex-wrap justify-center" id="root">
      <ToastContainer />
      {items && items.length > 0 ? (
        items.map((item, index) => {
          const photoArray = item.photos;

          const arrayImages = photoArray.replace(/'/g, '"');

          const imageCard = JSON.parse(arrayImages);

          if (hiddenItems.has(index)) return null;

          const dataCadastroFormatada = format(
            new Date(item.firstAuctionDate),
            "dd/MM/yyyy",
            { locale: ptBR }
          );

          const dataFimFormatada = format(
            new Date(item.secondAuctionDate),
            "dd/MM/yyyy",
            { locale: ptBR }
          );

          const tooltipId = `title-title-${index}`;

          const hasDiscount =
            item.discountedPrice && item.discountedPrice !== item.originalPrice;
          const multiplePayments =
            item.typePayments && item.typePayments.length > 1;

          const hasPropertyType = item.propertyType != null;

          return (
            <div
              key={index}
              className={`relative w-[310px] p-3 m-1 shadow-lg transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col justify-between flex-warp 
`}
              style={{
                borderRadius: "16px",
              }}
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  borderRadius: "16px",
                }}
              >
                <div
                  style={{
                    borderRadius: "16px",
                  }}
                  className={`w-full h-full bg-white dark:bg-[#1F1F23] dark:text-white"
                  }`}
                />
              </div>
              <div
                className="relative z-10 overflow-hidden"
                style={{ borderRadius: "8px 8px 0 0" }}
              >
                <div className="relative mb-3">
                  <Image
                    src={
                      item.photos && item.photos !== "[]"
                        ? imageCard[0]
                        : CardImage
                    }
                    alt={item.title || "Imagem do leilão"}
                    className="h-[200px] w-full object-cover border border-gray-300"
                    style={{
                      borderRadius: "6px",
                    }}
                    width={272}
                    height={180}
                  />
                  <button
                    onClick={() => toggleVisibility(item.id)}
                    className="ocult absolute top-3 right-14 p-2 rounded-full bg-opacity-70 bg-black hover:bg-opacity-100 transition-all duration-200"
                  >
                    {hiddenItems.has(index) ? (
                      <FaEye className="text-white" />
                    ) : (
                      <FaEyeSlash className="text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => toggleFavorite(item.id, item.index)}
                    className={`like absolute top-3 right-4 p-2 rounded-full transition-all duration-200 ${
                      item.liked === 1
                        ? "bg-red-500 text-white"
                        : "bg-opacity-70 bg-black hover:bg-opacity-100"
                    }`}
                  >
                    <FaHeart className="text-white" />
                  </button>
                </div>

                <div>
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <h1
                          id={tooltipId}
                          className="Onest font-bold truncate cursor-pointer"
                        >
                          {item.title}
                        </h1>
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        side="top"
                        sideOffset={5}
                        className="bg-black text-white text-xs px-2 py-1 rounded shadow-md max-w-[200px] break-words"
                      >
                        {item.title}
                        <Tooltip.Arrow className="fill-gray-800" />
                      </Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>

                  {/* Flags */}
                  {hasDiscount && (
                    <span className="font-geist-mono mr-1 mb-2 inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-1.5 py-0.4 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                      <span className="font-geist-mono w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                      {item.discount + "%"}
                    </span>
                  )}
                  {multiplePayments &&
                    item.typePayments &&
                    item.typePayments.replace(/[\[\]'"]/g, "") !== "" && (
                      <span className="font-geist-mono mb-2 mr-1 inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.4 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <span className="font-geist-mono w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                        {item.typePayments.replace(/[\[\]'"]/g, "")}
                      </span>
                    )}
                  {hasPropertyType && (
                    <span className="font-geist-mono mb-2 inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-1.5 py-0.4 rounded-full dark:bg-green-900 dark:text-green-300">
                      <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                      {item.propertyType}
                    </span>
                  )}

                  <p
                    className={`text-xs dark:text-gray-400 text-gray-600 pointer truncate mb-2`}
                  >
                    {item.road.charAt(0).toUpperCase() +
                      item.road.slice(1).toLowerCase()}
                  </p>

                  <div className=" space-x-[13px] w-full">
                    <div className="mb-4">
                      {item.discountedPrice ? (
                        <h4 className="font-geist-mono line-through text-xs text-red-400 mr-3">
                          {formattedPrice(item.originalPrice)}
                        </h4>
                      ) : (
                        <div className="h-5 w-20" />
                      )}
                      <h1 className="font-geist-mono text-xl items-center font-semibold text-[#08A0A0]">
                        {item.discountedPrice
                          ? formattedPrice(item.discountedPrice)
                          : formattedPrice(item.firstAuctionPrice)}
                      </h1>
                    </div>

                    <div className="flex ">
                      <div className="flex mb-2 space-x-8">
                        {item.firstAuctionDate && !item.secondAuctionDate ? (
                          // Caso 1: Apenas dataCadastroFormatada presente
                          <div className="flex items-center mb-5">
                            <div>
                              <div className="flex items-center justify-center dark:text-gray-400 text-gray-600">
                                <Calendar className="w-4 h-4 mr-2 dark:text-gray-400 text-gray-600" />
                                <div>
                                  <span className="text-xs block">
                                    Venda Direta
                                  </span>
                                  <span className="text-sm">
                                    {dataCadastroFormatada}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : !item.firstAuctionDate &&
                          !item.secondAuctionDate ? (
                          // Caso 2: Nenhuma data presente
                          <div className="flex items-center mb-5">
                            <div>
                              <div className="flex items-center dark:text-gray-400 text-gray-600">
                                <Calendar className="w-4 h-4 mr-2 dark:text-gray-400 text-gray-600" />
                                <div>
                                  <span className="text-sm block">
                                    Sem data informada
                                  </span>
                                  <span className="text-xs">
                                    Checar no site do leiloeiro
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Caso 3: Ambas as datas presentes
                          <>
                            <div className="flex items-center mb-5">
                              <div>
                                <div className="flex items-center dark:text-gray-400 text-gray-600">
                                  <Calendar className="w-4 h-4 mr-2 dark:text-gray-400 text-gray-600" />
                                  <div>
                                    <span className="text-xs block">
                                      1° leilão
                                    </span>
                                    <span className="text-sm">
                                      {dataCadastroFormatada}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center mb-5">
                              <div>
                                <div className="flex items-center dark:text-gray-400 text-gray-600">
                                  <Calendar className="w-4 h-4 mr-2 dark:text-gray-400 text-gray-600" />
                                  <div>
                                    <span className="text-xs block">
                                      2° leilão
                                    </span>
                                    <span className="text-sm">
                                      {dataFimFormatada}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex">
                <button
                  type="button"
                  className=" mr-4 more-info w-full bg-[#08A0A0] text-xs text-white font-bold py-2.5 px-4 rounded"
                  onClick={() => openModal(item)}
                >
                  Saiba Mais
                </button>
                <button
                  type="button"
                  className=" more-info w-full text-xs dark:bg-[#292b31] bg-[#e9e9e9] dark:text-white text-black  py-2.5 px-5 rounded"
                >
                  Abrir no maps
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
      <Modal
        open={modalOpen}
        onClose={closeModal}
        selectedItem={selectedItem}
      />
    </div>
  );
}

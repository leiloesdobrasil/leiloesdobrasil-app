import React, { useState, useEffect } from "react";
import Image from "next/image";
import CardImage from "../assets/Leilao-online.jpg";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaHeart, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Calendar, MapPin } from "lucide-react";
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
  secondAuctionPrice: number;
  description: string;
  city: string;
  state: string;
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
    const selectedItemForModal: ImovelProps = {
      ...item,
      docs: item.docs || "[]", // Add a fallback for docs if necessary
    };
    setSelectedItem(selectedItemForModal);
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

          const hasPropertyType = item.propertyType != null;

          const hasSaleType = item.saleType != null;

          return (
            <div
              key={index}
              className={`cursor-pointer relative w-[310px] p-3 m-1 shadow-lg transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col justify-between flex-warp 
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
                <div
                  className="relative mb-3"
                  onClick={() => openModal(item)} // Chama o modal ao clicar na imagem
                  style={{ cursor: "pointer" }} // Indica ao usuário que é clicável
                >
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
                  <div
                    className="absolute top-3 right-4 flex space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => toggleVisibility(item.id)}
                      className="ocult p-2 rounded-full bg-opacity-70 bg-black hover:bg-opacity-100 transition-all duration-200"
                    >
                      {hiddenItems.has(index) ? (
                        <FaEye className="text-white" />
                      ) : (
                        <FaEyeSlash className="text-white" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleFavorite(item.id, item.index)}
                      className={`like p-2 rounded-full transition-all duration-200 ${
                        item.liked === 1
                          ? "bg-red-500 text-white"
                          : "bg-opacity-70 bg-black hover:bg-opacity-100"
                      }`}
                    >
                      <FaHeart className="text-white" />
                    </button>
                  </div>
                </div>

                <div onClick={() => openModal(item)}>
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
                    <span className="font-geist-mono mr-1 mb-1 inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-1 py-0.2 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                      <span className="w-1.5 h-1.5 me-1 bg-yellow-500 rounded-full"></span>
                      {item.discount + "%"}
                    </span>
                  )}
                  {hasPropertyType && (
                    <span className="font-geist-mono mb-1 mr-1 inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-1 py-0.2 rounded-full dark:bg-green-900 dark:text-green-300">
                      <span className="w-1.5 h-1.5 me-1 bg-green-500 rounded-full"></span>
                      {item.propertyType}
                    </span>
                  )}
                  {hasSaleType && (
                    <span className="font-geist-mono mb-2 inline-flex items-center bg-orange-100 text-orange-800 text-xs font-medium px-1 py-0.2 rounded-full dark:bg-orange-900 dark:text-orange-300">
                      <span className="w-1.5 h-1.5 me-1 bg-orange-500 rounded-full"></span>
                      {item.saleType}
                    </span>
                  )}

                  <p
                    className={`text-xs dark:text-gray-400 text-gray-600 pointer truncate mb-2`}
                  >
                    {item.road.charAt(0).toUpperCase() +
                      item.road.slice(1).toLowerCase()}
                  </p>
                  <div className=" w-full">
                    <div className="mb-4">
                      {item.discountedPrice &&
                      item.discountedPrice !== item.originalPrice ? (
                        <h4 className="font-geist-mono line-through text-xs text-red-400 mr-3">
                          {formattedPrice(item.originalPrice)}
                        </h4>
                      ) : (
                        <div className="h-5 w-20" />
                      )}
                      <h1 className="font-geist-mono text-xl items-center font-semibold text-[#08A0A0]">
                        {new Date(dataCadastroFormatada) < new Date() &&
                        item.secondAuctionDate
                          ? formattedPrice(item.secondAuctionPrice)
                          : formattedPrice(item.firstAuctionPrice)}{" "}
                      </h1>
                    </div>

                    <div className="flex mb-2">
                      <div className="flex flex-col space-y-2 mb-3">
                        <div className={`flex items-center`}>
                          <MapPin className="w-4 h-4 mr-2 dark:text-gray-400 text-gray-600" />
                          <span className="text-xs dark:text-gray-400 text-gray-600">
                            {item.city} - {item.state}
                          </span>
                        </div>

                        {/* 1° Leilão */}
                        {item.firstAuctionDate && (
                          <div
                            className={`flex items-center ${
                              new Date(item.firstAuctionDate) < new Date()
                                ? "line-through"
                                : ""
                            }`}
                          >
                            <Calendar className="w-4 h-4 mr-2 dark:text-gray-400 text-gray-600" />
                            <span className="text-xs dark:text-gray-400 text-gray-600">
                              1° leilão: {dataCadastroFormatada} -{" "}
                              {formattedPrice(item.firstAuctionPrice)}
                            </span>
                          </div>
                        )}

                        {/* 2° Leilão */}
                        {item.secondAuctionDate && (
                          <div
                            className={`flex items-center ${
                              new Date(item.secondAuctionDate) < new Date()
                                ? "line-through"
                                : ""
                            }`}
                          >
                            <Calendar className="w-4 h-4 mr-2 dark:text-gray-400 text-gray-600" />
                            <span className="text-xs dark:text-gray-400 text-gray-600">
                              2° leilão: {dataFimFormatada} -{" "}
                              {formattedPrice(item.secondAuctionPrice)}
                            </span>
                          </div>
                        )}

                        {/* Caso sem datas */}
                        {!item.firstAuctionDate && !item.secondAuctionDate && (
                          <div className="flex items-center mb-5">
                            <Calendar className="w-4 h-4 mr-2 dark:text-gray-400 text-gray-600" />
                            <span className="text-xs">Sem data informada</span>
                            <span className="text-xs ml-2">
                              Checar no site do leiloeiro
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex">
                <button
                  type="button"
                  className=" z-10 mr-4 more-info w-full bg-[#08A0A0] text-xs text-white font-bold py-2.5 px-4 rounded"
                  onClick={() => openModal(item)}
                >
                  Saiba Mais
                </button>

                {item.geolocation && (
                  <button
                    type="button"
                    className=" more-info w-full text-xs dark:bg-[#292b31] bg-[#e9e9e9] dark:text-white text-black  py-2.5 px-5 rounded"
                  >
                    Abrir no Maps
                  </button>
                )}

                {!item.geolocation && (
                  <button
                    type="button"
                    className=" more-info w-full text-xs dark:bg-[#292b31] bg-[#e9e9e9] dark:text-white text-black  py-2.5 px-5 rounded"
                  >
                    Sem localização
                  </button>
                )}
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

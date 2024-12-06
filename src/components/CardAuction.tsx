import React, { useState, useEffect } from "react";
import Image from "next/image";
import CardImage from "../assets/Leilao-online.jpg";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FaCalendarAlt, FaHeart, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Modal from "./Modal";
import axios from "axios";
import { getBaseUrl } from "../utils/helper";

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
  originalPrice: number;
  inclusionDate: string;
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ImovelProps | null>(null);
  const [favoritedItems, setFavoritedItems] = useState<Set<number>>(new Set());
  const [hiddenItems, setHiddenItems] = useState<Set<number>>(new Set());

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
        await axios.delete(
          `https://api.leiloesdobrasil.com.br/api/v1/web/auctions/remove/toggle`,
          {
            data: { auctionId: id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFavoritedItems((prev) => {
          const newFavorites = new Set(prev);
          newFavorites.delete(index);
          return newFavorites;
        });

        toast.success("Leilão removido dos favoritos!", toastConfig);
      } else {
        await axios.post(
          `https://api.leiloesdobrasil.com.br/api/v1/web/auctions/toggle`,
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
        await axios.delete(
          `https://api.leiloesdobrasil.com.br/api/v1/web/auctions/remove/toggle`,
          {
            data: { auctionId: id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHiddenItems((prev) => {
          const newHidden = new Set(prev);
          newHidden.delete(Number(id));
          return newHidden;
        });

        toast.success("O leilão deixou de ser oculto.", toastConfig);
      } else {
        await axios.post(
          `https://api.leiloesdobrasil.com.br/api/v1/web/auctions/toggle`,
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

  const openModal = (item: ImovelProps) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIsOpen]);

  useEffect(() => {
    const initialFavorites = new Set(
      items
        .map((item, index) => (item.liked === 1 ? index : null))
        .filter((id) => id !== null)
    );
    setFavoritedItems(initialFavorites);
  }, [items]);
  return (
    <div className="flex flex-wrap justify-center">
      <ToastContainer />
      {items && items.length > 0 ? (
        items.map((item, index) => {
          const photoArray = item.photos;

          const arrayImages = photoArray.replace(/'/g, '"');

          const imageCard = JSON.parse(arrayImages);

          if (hiddenItems.has(index)) return null;

          const dataCadastroFormatada = format(
            new Date(item.inclusionDate),
            "dd/MM/yyyy",
            { locale: ptBR }
          );

          const dataFimFormatada = format(
            new Date(item.inclusionDate),
            "dd/MM/yyyy",
            { locale: ptBR }
          );

          // Gerar um id único para cada card
          const tooltipId = `title-title-${index}`;

          const hasDiscount =
            item.discountedPrice && item.discountedPrice !== item.originalPrice;
          const multiplePayments =
            item.typePayments && item.typePayments.length > 1;

          const hasPropertyType = item.propertyType != null;

          return (
            <div
              key={index}
              className={`relative w-[300px] m-1 shadow-lg transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col justify-between flex-warp 
                bg-[#ECF1F4] dark:bg-[#505D6E] dark:text-white
`}
              style={{
                borderRadius: "8px",
              }}
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    borderRadius: "8px",
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
                    src={item.photos === "[]" ? CardImage : imageCard[0]}
                    alt={item.title}
                    className="h-[200px] w-full object-cover scale-125"
                    width={300}
                    height={200}
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

                <div className="p-5">
                  <h1
                    id={tooltipId}
                    className="Onest font-bold mb-1 truncate cursor-pointer "
                  >
                    {item.title}
                  </h1>

                  {/* Flags */}
                  {hasDiscount && (
                    <span className="Inter mr-1 mb-1 inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                      <span className="Inter w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                      {item.discount + "%"}
                    </span>
                  )}
                  {multiplePayments &&
                    item.typePayments &&
                    item.typePayments.replace(/[\[\]'"]/g, "") !== "" && (
                      <span className="Inter mb-1 mr-1 inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <span className="Inter w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                        {item.typePayments.replace(/[\[\]'"]/g, "")}
                      </span>
                    )}
                  {hasPropertyType && (
                    <span className="Inter mb-1 inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                      {item.propertyType}
                    </span>
                  )}

                  <Tooltip
                    anchorSelect={`#${tooltipId}`}
                    place="top"
                    content={item.title}
                    className="tooltip-content Inter"
                  />
                  <p
                    className={`text-sm mb-4 text-gray-700 dark:text-gray-100`}
                  >
                    {item.road.charAt(0).toUpperCase() +
                      item.road.slice(1).toLowerCase()}
                  </p>

                  <div className="mb-4">
                    {item.discountedPrice && (
                      <div className="flex items-center">
                        <h4 className="Inter line-through text-sm text-red-400 mr-3">
                          {formattedPrice(item.originalPrice)}
                        </h4>
                        <MdDiscount className="Inter line-through text-sm text-red-400 mr-3" />
                      </div>
                    )}

                    <h1 className="Inter text-2xl font-semibold text-[#08A0A0]">
                      {item.discountedPrice
                        ? formattedPrice(item.discountedPrice)
                        : formattedPrice(item.originalPrice)}
                    </h1>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                    <div className="flex items-center mb-5">
                      <div className="flex items-center justify-center w-8 h-8 bg-[#08A0A0] rounded-full mr-2">
                        <FaCalendarAlt className="text-white" />
                      </div>
                      <div>
                        <span
                          className={`Inter text-xs block mb-1 text-gray-700 dark:text-gray-100`}
                        >
                          1° leilão
                        </span>
                        <span
                          className={`Inter text-gray-700 dark:text-gray-100
                          `}
                        >
                          {dataCadastroFormatada}
                        </span>
                      </div>
                    </div>
                    {/* Linha separadora */}
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-[#08A0A0] rounded-full mr-2">
                        <FaCalendarAlt className="text-white" />
                      </div>
                      <div>
                        <span
                          className={`Inter text-xs block mb-1 text-gray-700 dark:text-gray-100
                        `}
                        >
                          2° leilão
                        </span>
                        <span
                          className={`Inter text-gray-700 dark:text-gray-100`}
                        >
                          {dataFimFormatada}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 relative z-10">
                <button
                  type="button"
                  className="Onest more-info w-full rounded-md bg-gradient-to-r from-[#08A0A0] to-[#08A0A0] hover:from-[#08A0A0] hover:to-[#08A0A0] text-white px-4 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => openModal(item)}
                >
                  Saiba Mais
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
      {/* <Modal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        selectedItem={selectedItem}
        theme={theme}
      /> */}
    </div>
  );
}

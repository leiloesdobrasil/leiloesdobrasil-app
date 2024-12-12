"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ImageHome from "../assets/gavel-icon-18657.svg";
import ImageAboutUs from "../assets/aboutus.svg";
import { Badge } from "@/components/ui/badge";
import { MouseEvent } from "react";
import LogoLight from "../assets/logolight.svg";
import LogoDark from "../assets/logodark.svg";
import IconLogo from "../assets/iconlogo.svg";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Header from "@/components/Header";

export default function Home() {
  enum PopularPlanType {
    NO = 0,
    YES = 1,
  }

  interface PricingProps {
    title: string;
    popular: PopularPlanType;
    price: number;
    description: string;
    buttonText: string;
    benefitList: string[];
  }

  const handleSmoothScroll = (e: MouseEvent, targetId: string) => {
    e.preventDefault();

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const pricingList: PricingProps[] = [
    {
      title: "Free",
      popular: 0,
      price: 0,
      description:
        "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
      buttonText: "Get Started",
      benefitList: [
        "1 Team member",
        "2 GB Storage",
        "Upto 4 pages",
        "Community support",
        "lorem ipsum dolor",
      ],
    },
    {
      title: "Premium",
      popular: 1,
      price: 5,
      description:
        "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
      buttonText: "Start Free Trial",
      benefitList: [
        "4 Team member",
        "4 GB Storage",
        "Upto 6 pages",
        "Priority support",
        "lorem ipsum dolor",
      ],
    },
    {
      title: "Enterprise",
      popular: 0,
      price: 40,
      description:
        "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
      buttonText: "Contact US",
      benefitList: [
        "10 Team member",
        "8 GB Storage",
        "Upto 10 pages",
        "Priority support",
        "lorem ipsum dolor",
      ],
    },
  ];

  return (
    <div className="dark:bg-[#17181c] ">
      <Header />
      {/* <header className="p-2 border-b w-full flex align-center justify-center ">
        <div className="container flex items-center justify-between">
          <div className="logo flex items-center space-x-3">
            <Image
              src={currentTheme === "dark" ? LogoLight : LogoDark}
              alt={"logo"}
              className=" object-cover"
              style={{
                borderRadius: "6px",
              }}
              width={240}
            />
          </div>

          <div className="links flex space-x-6">
            <Button variant="link" className="text-medium hover:text-[#08A0A0]">
              <a
                href="#aboutus"
                onClick={(e) => handleSmoothScroll(e, "aboutus")}
              >
                Sobre Nos
              </a>
            </Button>
            <Button variant="link" className="text-medium hover:text-[#08A0A0]">
              <a
                href="#statistics"
                onClick={(e) => handleSmoothScroll(e, "statistics")}
              >
                Estatisticas
              </a>
            </Button>
            <Button variant="link" className="text-medium hover:text-[#08A0A0]">
              <a
                href="#aboutproduct"
                onClick={(e) => handleSmoothScroll(e, "aboutproduct")}
              >
                Sobre o Produto
              </a>
            </Button>
            <Button variant="link" className="text-medium hover:text-[#08A0A0]">
              <a
                href="#pricing"
                onClick={(e) => handleSmoothScroll(e, "pricing")}
              >
                Preco
              </a>
            </Button>
            <Button variant="link" className="text-medium hover:text-[#08A0A0]">
              <a href="#faq" onClick={(e) => handleSmoothScroll(e, "faq")}>
                Perguntas Frequentes
              </a>
            </Button>
          </div>
          <div className="auth-mode-toggle flex items-center space-x-4">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/signin">
              <Button variant="secondary">Cadastre-se</Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header> */}

      <div className="flex flex-col items-center align-center justify-center md:flex-row">
        <div className="w-full px-3 md:w-1/2">
          <div className="aboutus flex justify-center mt-[150px] mb-[150px]">
            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0 text-center md:text-left">
              <div className="logo flex items-center space-x-3">
                <Image
                  src={IconLogo}
                  alt={"logo"}
                  className=" object-cover"
                  style={{
                    borderRadius: "6px",
                  }}
                  width={90}
                />
              </div>
              <h1
                className={
                  " font-bold tracking-tight sm:text-3xl  dark:text-white text-gray-900"
                }
              >
                <span className="block xl:inline">
                  Lugar ideal para aproveitar
                </span>
                <span className="block ">o melhor leilão</span>
              </h1>
              <p
                id="aboutus"
                className="text-base  sm:max-w-md lg:text-medium md:max-w-3xl"
              >
                Descubra o portal definitivo para encontrar leilões online em
                todo o Brasil com facilidade e rapidez. Não perca mais tempo
                procurando, encontre os melhores leilões agora mesmo!
              </p>
              <div className="relative flex flex-col sm:flex-row sm:space-x-4 justify-center md:justify-start">
                <Button onClick={(e) => handleSmoothScroll(e, "pricing")}>
                  Comprar licença
                </Button>
                <Button
                  onClick={(e) => handleSmoothScroll(e, "aboutproduct")}
                  variant={"secondary"}
                >
                  Saiba mais
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-1/3 relative group">
          {/* Contêiner para a sombra */}
          <div className="w-full max-w-[500px] h-auto overflow-hidden relative">
            {/* Imagem */}
            <Image
              src={ImageHome}
              alt="Online Auction"
              layout="responsive"
              width={6000}
              height={5475}
              className="z-10"
            />
          </div>
        </div>
      </div>
      <div
        className="dark:bg-[#1e1f23] bg-[#f4f4f5] py-24 sm:py-32 mb-[8rem] mt-[2rem] "
        id="statistics"
      >
        <div className="flex flex-wrap "></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Nossas estatísticas não mentem!
              </h2>
              <p className="text-lg leading-8 ">
                Os números refletem a verdade: desempenho comprovado e
                resultados concretos.
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-white/5 p-8 ">
                <dt className="text-sm font-semibold leading-6 z-100 ">
                  Imóveis
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">
                  X
                </dd>
              </div>
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 ">Veículos</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">
                  X
                </dd>
              </div>
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 ">Leiloeiros</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">
                  920
                </dd>
              </div>
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 ">
                  De todos os leilões do brasil
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">
                  90%
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* aboutus */}

      <div className="container sm:flex items-center px-8 mx-auto xl:px-5 mb-[8rem] md:px-3">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <Image
              id="aboutproduct"
              src={ImageAboutUs}
              alt="Online Auction"
              layout="responsive"
              width={700}
              height={475}
            />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span
              className={
                "border-b-2 border-[#08A0A0] uppercase text-black dark:text-white"
              }
            >
              Sobre o produto
            </span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
              Todos os Leilões em um{" "}
              <span className="text-[#08A0A0]">Só Lugar</span>
            </h2>
            <p className={" text-justify "}>
              Encontre imóveis, veículos, máquinas, equipamentos e diversos
              outros bens na maior lista de leilões do Brasil! Com nossa
              plataforma, você tem acesso a uma análise simultânea de mais de
              1.000 sites de leiloeiros em todo o país, colocando você sempre à
              frente na busca e seleção dos melhores bens. Sem essa ferramenta,
              encontrar tantas oportunidades seria praticamente impossível, já
              que muitos imóveis e bens valiosos podem estar sendo leiloados em
              diferentes estados por leiloeiros pouco conhecidos. Agora, com a
              nossa tecnologia, você pode ser o primeiro a descobrir esses
              leilões exclusivos, aumentando suas chances de arrematar os
              melhores lotes sem concorrência. Nossa plataforma eleva sua
              experiência em leilões para um patamar superior. Com o uso de
              Inteligência Artificial avançada, oferecemos dados atualizados
              diariamente, garantindo que você tenha acesso às melhores
              oportunidades de leilões, com segurança e praticidade. Simplifique
              sua busca, economize tempo e descubra bens únicos com apenas
              alguns cliques. Prepare-se para transformar sua estratégia de
              leilões com a tecnologia que facilita seu sucesso!
            </p>
          </div>
        </div>
      </div>
      <div className="pricing flex justify-center dark:bg-[#1e1f23] bg-[#f4f4f5]">
        <section id="pricing" className="container py-24 sm:py-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center ">
            Obtenha
            <span className=""> Acesso </span>
          </h2>
          <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8 ">
            Nossos planos sao personalizados para todos os tipos de leiloeiros
            do Brasil.
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingList.map((pricing: PricingProps) => (
              <Card
                id="pricing"
                key={pricing.title}
                className={
                  pricing.popular === PopularPlanType.YES
                    ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                    : ""
                }
              >
                <CardHeader>
                  <CardTitle className="flex item-center justify-between">
                    {pricing.title}
                    {pricing.popular === PopularPlanType.YES ? (
                      <Badge
                        variant="secondary"
                        className="text-sm text-primary"
                      >
                        Most popular
                      </Badge>
                    ) : null}
                  </CardTitle>
                  <div>
                    <span className="text-3xl font-bold">${pricing.price}</span>
                    <span className="text-muted-foreground"> /month</span>
                  </div>

                  <CardDescription>{pricing.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <Button className="w-full">{pricing.buttonText}</Button>
                </CardContent>

                <hr className="w-4/5 m-auto mb-4" />

                <CardFooter className="flex">
                  <div className="space-y-4">
                    {pricing.benefitList.map((benefit: string) => (
                      <span key={benefit} className="flex">
                        <Check className="text-green-500" />{" "}
                        <h3 className="ml-2">{benefit}</h3>
                      </span>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <div className="py-4 max-w-screen-sm mx-auto">
        <div className="text-center mb-16">
          <p className="mt-4 text-sm leading-7  font-regular">F.A.Q</p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight ">
            <span className="text-[#08A0A0]">Perguntas </span>Frequentes
          </h3>
        </div>

        <div className="px-10 sm:px-16">
          <div id="faq" className="py-3 uppercase text-sm  font-medium">
            Algumas respostas podem estar aqui!
          </div>

          <div className="ml-5">
            <div className="flex items-start my-8">
              <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-[#08A0A0] text-white border-4 border-white text-xl font-semibold">
                <svg
                  width="24px"
                  fill="white"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g data-name="Layer 2">
                    <g data-name="menu-arrow">
                      <rect
                        width="24"
                        height="24"
                        transform="rotate(180 12 12)"
                        opacity="0"
                      ></rect>
                      <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                      <circle cx="12" cy="19" r="1"></circle>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="text-md">
                <h1 className="text-[#08A0A0] font-semibold mb-2">
                  Eu dou o lance no site leilões do brasil?
                </h1>
                <p className=" text-sm text-justify">
                  Não. O site Leilões do Brasil apenas é um buscador que
                  centraliza todas essas oportunidades em um só lugar,
                  facilitando sua pesquisa. Quando você encontra o bem de
                  interesse, você será redirecionado para o site do leiloeiro
                  oficial responsável, onde fará o cadastro e participará do
                  leilão.
                </p>
              </div>
            </div>
            <div className="flex items-start my-8">
              <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-[#08A0A0] text-white border-4 border-white text-xl font-semibold">
                <svg
                  width="24px"
                  fill="white"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g data-name="Layer 2">
                    <g data-name="menu-arrow">
                      <rect
                        width="24"
                        height="24"
                        transform="rotate(180 12 12)"
                        opacity="0"
                      ></rect>
                      <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                      <circle cx="12" cy="19" r="1"></circle>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="text-md">
                <h1 className="text-[#08A0A0] font-semibold mb-2">
                  O Leilões do Brasil é um site de leilão?
                </h1>
                <p className=" text-sm text-justify">
                  Não! Somos uma plataforma agregadora dos bens de leilão,
                  direcionando você para o site do leiloeiro que fará o leilão.
                </p>
              </div>
            </div>
            <div className="flex items-start my-8">
              <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-[#08A0A0] text-white border-4 border-white text-xl font-semibold">
                <svg
                  width="24px"
                  fill="white"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g data-name="Layer 2">
                    <g data-name="menu-arrow">
                      <rect
                        width="24"
                        height="24"
                        transform="rotate(180 12 12)"
                        opacity="0"
                      ></rect>
                      <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                      <circle cx="12" cy="19" r="1"></circle>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="text-md">
                <h1 className="text-[#08A0A0] font-semibold mb-2">
                  Por que assinar o Leilões do Brasil?
                </h1>
                <p className=" text-sm text-justify">
                  Atualmente temos o maior banco de dados de leilões do Brasil,
                  sendo atualizada diariamente com novos leilões. Oferecemos
                  segurança na escolha de dos leilões, além de oferecer
                  ferramentas para encontrar o que você quer.
                </p>
              </div>
            </div>
            <div className="flex items-start my-8">
              <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-[#08A0A0] text-white border-4 border-white text-xl font-semibold">
                <svg
                  width="24px"
                  fill="white"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g data-name="Layer 2">
                    <g data-name="menu-arrow">
                      <rect
                        width="24"
                        height="24"
                        transform="rotate(180 12 12)"
                        opacity="0"
                      ></rect>
                      <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                      <circle cx="12" cy="19" r="1"></circle>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="text-md">
                <h1 className="text-[#08A0A0] font-semibold mb-2">
                  Todos os bens que estão cadastrados no Leilão do Brasil, são
                  de leiloeiros oficiais?
                </h1>
                <p className=" text-sm text-justify">
                  Sim, Todos os sites de leilão e leiloeiros são verificados
                  antes de entrar em nossa lista e cadastrar em nosso banco de
                  dados. Pode ter certeza que se está em nosso site, é de
                  confiança.
                </p>
              </div>
            </div>
            <div className="flex items-start my-8">
              <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-[#08A0A0] text-white border-4 border-white text-xl font-semibold">
                <svg
                  width="24px"
                  fill="white"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g data-name="Layer 2">
                    <g data-name="menu-arrow">
                      <rect
                        width="24"
                        height="24"
                        transform="rotate(180 12 12)"
                        opacity="0"
                      ></rect>
                      <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                      <circle cx="12" cy="19" r="1"></circle>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="text-md">
                <h1 className="text-[#08A0A0] font-semibold mb-2">
                  Tenho que pagar para utilizar a plataforma do Leilões do
                  Brasil?
                </h1>
                <p className=" text-sm text-justify">
                  Sim. Você pode escolher pagar semestralmente ou anualmente
                  nossa plataforma. Você será de um grupo seleto de arrematantes
                  que com privilégio de saber onde acontecerão os melhores bens
                  em leilão em todo o Brasil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

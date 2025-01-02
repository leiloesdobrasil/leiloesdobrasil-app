"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import LogoLight from "../../assets/logolight.svg";
import LogoDark from "../../assets/logodark.svg";

function NotFound() {
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-[#1f1f23] text-center">
      <div className="bg-white dark:bg-black p-10 rounded-lg shadow-lg max-w-md">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src={currentTheme === "dark" ? LogoLight : LogoDark}
            alt="logo"
            className="max-w-[200px] object-cover"
            style={{
              borderRadius: "6px",
            }}
            width={150}
          />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold mb-4">404 - Página Não Encontrada</h1>
        <p className=" mb-6">
          A página que você está procurando não existe ou foi movida.
        </p>

        {/* Botão */}
        <Link href="/" passHref>
          <button className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400">
            Voltar para o início
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

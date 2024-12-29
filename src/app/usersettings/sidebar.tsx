"use client";

import Link from "next/link";
import { User, CreditCard, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import LogoLight from "../../assets/logolight.svg";
import LogoDark from "../../assets/logodark.svg";

export function Sidebar() {
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";
  return (
    <div className="w-64 h-full bg-gray-100 p-4">
      <div className="logo">
        <Image
          src={currentTheme === "dark" ? LogoLight : LogoDark}
          alt="logo"
          className="max-w-[400px] object-cover"
          width={210}
        />
      </div>
      <nav className="space-y-2 mt-10">
        <Link
          href="/settings"
          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200"
        >
          <User size={20} />
          <span>Perfil</span>
        </Link>
        <Link
          href="/settings/plan"
          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200"
        >
          <CreditCard size={20} />
          <span>Plano</span>
        </Link>
        <Link
          href="/settings/account"
          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200"
        >
          <Settings size={20} />
          <span>Conta</span>
        </Link>
      </nav>
    </div>
  );
}

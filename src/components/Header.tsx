import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

import IconLogo from "../assets/iconlogo.svg";

export default function Header() {

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 p-4 dark:bg-[#17181c] bg-white
    }`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Image
            src={IconLogo}
            alt={"logo"}
            className="object-cover"
            style={{
              borderRadius: "6px",
            }}
            width={60}
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { label: "Sobre Nós", href: "#aboutus" },
            { label: "Estatísticas", href: "#statistics" },
            { label: "Sobre o Produto", href: "#aboutproduct" },
            { label: "Preço", href: "#pricing" },
            { label: "Perguntas Frequentes", href: "#faq" },
          ].map((link, index) => (
            <Button
              key={index}
              variant="link"
              className="text-medium text-muted-foreground hover:text-primary"
            >
              <a
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href.slice(1))}
              >
                {link.label}
              </a>
            </Button>
          ))}
        </nav>

        {/* Authentication and Theme Toggle */}
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button className="text-white bg-teal-600 hover:bg-teal-700">
              Login
            </Button>
          </Link>
          <Link href="/signin">
            <Button variant="secondary">Cadastre-se</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

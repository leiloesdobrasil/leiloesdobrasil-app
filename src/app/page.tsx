import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

export default function Home() {
  return (
    <>
      <header className="p-5 border-b w-full flex align-center justify-center">
        <div className="container flex items-center justify-between">
          <div className="logo flex items-center space-x-3">
            <h1 className="text-xl font-semibold">Leilões do Brasil</h1>
          </div>

          <div className="links flex space-x-6">
            <Button variant="link" className="text-medium">
              Sobre Nos
            </Button>
            <Button variant="link" className="text-medium">
              Estatisticas
            </Button>
            <Button variant="link" className="text-medium">
              Sobre o Produto
            </Button>
            <Button variant="link" className="text-medium">
              Valores
            </Button>
            <Button variant="link" className="text-medium">
              Perguntas Frequentes
            </Button>
          </div>
          <div className="auth-mode-toggle flex items-center space-x-4">
            <Button>Login</Button>
            <Button variant="secondary">Cadastre-se</Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="p-5">
        <div className="w-full md:w-1/2 md:px-3">
          <div className="aboutus flex justify-center mt-10">
            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0 ">
              <h1
                className={
                  "text-4xl font-extrabold tracking-tight sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl dark:text-white text-gray-900"
                }
              >
                <span className="block xl:inline">Uma maneira nova </span>
                <span className="block text-[#08A0A0] xl:inline">
                  de buscar leilões online.
                </span>
              </h1>
              <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                Descubra o portal definitivo para encontrar leilões online em
                todo o Brasil com facilidade e rapidez. Não perca mais tempo
                procurando, encontre os melhores leilões agora mesmo!
              </p>
              <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                <Button>Comprar licença</Button>
                <Button variant={"secondary"}>Saiba mais</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

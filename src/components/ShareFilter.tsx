import { Copy, Share } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ShareFilter() {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copiado com sucesso!", toastConfig);
      })
      .catch((error) => {
        console.error("Erro ao copiar o link: ", error);
        toast.error("Erro ao copiar o link.", toastConfig);
      });
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

  return (
    <>
      <ToastContainer />

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <Share /> Compartilhar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartilhe sua pesquisa!</DialogTitle>
            <DialogDescription>
              Ao copiar você salva essa visão de tela.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" value={url} readOnly />
            </div>
            <Button
              type="button"
              size="sm"
              className="px-3"
              onClick={handleCopy}
            >
              <span className="sr-only">Copiar</span>
              <Copy />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

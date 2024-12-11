"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBaseUrl } from "../../utils/helper";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useTheme } from "next-themes";
import LogoLight from "../../assets/logolight.svg";
import LogoDark from "../../assets/logodark.svg";

export default function Signin() {
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cpfOrCnpj, setCpfOrCnpj] = useState("");
  const router = useRouter();

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value;
    setPostalCode(cepValue);

    if (cepValue.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cepValue}/json/`
        );
        const data = response.data;

        if (!data.erro) {
          setStreet(data.logradouro);
          setCity(data.localidade);
          setState(data.uf);
        } else {
          toast.error("CEP não encontrado.");
        }
      } catch {
        toast.error("erro ao buscar cep");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post(`${getBaseUrl()}/users/register`, {
        fullName,
        email,
        postalCode,
        street,
        city,
        state,
        password,
        whatsapp,
        cpfOrCnpj,
      });

      if (response.status === 200 && response.data) {
        const customerId = response.data?.data?.customerId; // Acessa o customerId corretamente

        if (customerId) {
          sessionStorage.setItem("customerId", customerId); // Armazena o customerId
          sessionStorage.setItem("userEmail", email);
          sessionStorage.setItem("userName", fullName);

          toast.success("Usuário registrado com sucesso!");
          await router.push("/payment");
        } else {
          toast.error("Erro: Customer ID não encontrado.");
        }
      } else {
        toast.error("Erro ao registrar. Tente novamente.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao conectar com o servidor:", error.response?.data);
        toast.error(
          `Erro: ${
            error.response?.data.message || "Erro ao conectar com o servidor."
          }`
        );
      } else {
        console.error("Erro inesperado:", error);
        toast.error("Erro inesperado. Tente novamente.");
      }
    }
  };

  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";
  return (
    <div className="min-h-screen flex">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ScrollArea className="w-1/2 p-12 flex flex-col justify-center overflow-y-auto h-screen">
        <div className="absolute top-4 left-4">
          <Link
            href="/"
            className="text-sm font-medium text-[#08A0A0]"
            prefetch={false}
          >
            Voltar
          </Link>
        </div>
        <div className="mt-7">
          <div>
            <div className="flex flex-col px-6 py-8 mx-auto lg:py-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h2 className="text-3xl font-bold mb-4">Bem-vindo!</h2>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Nome e sobrenome
                    </label>
                    <input
                      type="text"
                      name="nome"
                      id="nome"
                      className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Marcos Da Silva"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      CPF/CNPJ
                    </label>
                    <input
                      type="text"
                      name="cpfOrCnpj"
                      id="cpfOrCnpj"
                      className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="282.450.360-21"
                      value={cpfOrCnpj}
                      onChange={(e) => setCpfOrCnpj(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      WhatsApp
                    </label>
                    <input
                      type="number"
                      name="number"
                      id="WhatsApp"
                      className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="name@company.com"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="cep"
                        className="block mb-2 text-sm font-medium"
                      >
                        CEP:
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        value={postalCode}
                        onChange={handleCepChange}
                        placeholder="89221006 (inserir sem o hífen)"
                        name="cep"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="rua"
                        className="block mb-2 text-sm font-medium"
                      >
                        Rua:
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        value={street}
                        placeholder="Nome da rua"
                        name="rua"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="cidade"
                        className="block mb-2 text-sm font-medium"
                      >
                        Cidade:
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        value={city}
                        placeholder="Nome da cidade"
                        name="cidade"
                        readOnly
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="uf"
                        className="block mb-2 text-sm font-medium"
                      >
                        UF:
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        value={state}
                        placeholder="Sigla do estado"
                        name="uf"
                        required
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium"
                    >
                      Senha
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium"
                    >
                      Confirme sua senha
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="••••••••"
                      className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-[#08A0A0] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Entrar
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Já tem conta?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="w-1/2 bg-[#005252] text-white p-12 flex flex-col justify-between rounded-md m-4">
        <div>
          <Image
            src={currentTheme === "dark" ? LogoLight : LogoDark}
            alt={"logo"}
            className=" max-w-[500px] object-cover"
            style={{
              borderRadius: "6px",
            }}
            width={300}
          />
        </div>
        <div>
          <p className="text-lg italic">
            Este portal foi cuidadosamente desenvolvido para simplificar e
            automatizar o trabalho dos leiloeiros em todo o Brasil
          </p>
        </div>
      </div>
    </div>
  );
}

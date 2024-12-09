"use client";

import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBaseUrl } from "@/utils/helper";

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${getBaseUrl()}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Erro ao fazer login.", {
          position: "bottom-right",
          autoClose: 5000,
        });
        return;
      }

      const responseData = await response.json();
      const token = responseData.data?.token;
      const fullName = responseData.data?.fullName;

      if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userEmail", formData.email);
        sessionStorage.setItem("userName", fullName);

        toast.success("Login realizado com sucesso!", {
          position: "bottom-right",
          autoClose: 5000,
        });

        window.location.href = "/dashboard";
      } else {
        toast.error("Token não encontrado.", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: "bottom-center",
          autoClose: 5000,
        });
      } else {
        toast.error("Erro desconhecido.", {
          position: "bottom-center",
          autoClose: 5000,
        });
      }
    }
  };

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
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="text-sm font-medium text-[#08A0A0]"
          prefetch={false}
        >
          Voltar
        </Link>
      </div>
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <div className="mt-12">
          <div>
            <div className="flex flex-col px-6 py-8 mx-auto lg:py-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h2 className="text-3xl font-bold mb-4">Bem-vindo de volta!</h2>
                <p className="text-gray-600 mb-8">
                  Entre com seu e-mail e senha
                </p>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium "
                    >
                      Senha
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          name="remember"
                          checked={formData.remember}
                          onChange={handleChange}
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="text-gray-500">
                          Lembre-se de mim
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Esqueceu a sua senha?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-[#08A0A0] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Entrar
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Não tem uma conta ainda?{" "}
                    <Link
                      href="/signin"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Registre-se
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-[#08A0A0] text-white p-12 flex flex-col justify-between rounded-md m-4">
        <div>
          <h1 className="text-4xl font-bold mt-2">Leilões do Brasil</h1>
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

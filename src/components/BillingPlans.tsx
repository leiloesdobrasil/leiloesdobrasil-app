"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Building2, Car, Package, Gavel } from 'lucide-react';

const IMOVEIS_FEATURES = [
  "Maior lista de imóveis em leilão do Brasil",
  "7 dias de satisfação",
  "Filtro completo",
  "Geolocalização",
  "Lista com todos os imóveis Caixa a Venda",
  "Robo de alerta para novos imóveis das regiões escolhidas",
  "Alerta e Notificação de Leilão por email e whatsapp",
  "Calculadora de retorno do investimento",
];

const VEICULOS_FEATURES = [
  "Maior lista de veículos em leilão do Brasil",
  "7 dias de satisfação",
  "Filtro completo",
  "Robo de alerta para novos imóveis das regiões escolhidas",
  "Alerta e Notificação de Leilão por email e whatsapp",
];

const COMPLETO_FEATURES = [
  "Maior lista de Imóveis, Máquina e Veículos em leilão do Brasil",
  "7 dias de satisfação",
  "Filtro completo",
  "Geolocalização",
  "Lista com todos os imóveis Caixa a Venda",
  "Robo de alerta para novos imóveis das regiões escolhidas",
  "Alerta e Notificação de Leilão por email e whatsapp",
  "Calculadora de retorno do investimento",
];

export default function BillingPlans() {
  return (
    <div className="p-6 bg-gray-50 dark:bg-[#17181c] min-h-screen">
       <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12 text-gray-900 dark:text-white">
          Conheça nossos <span className="bg-gradient-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent">planos!</span>
        </h2>
      <Tabs defaultValue="imoveis" className="w-full">
        <TabsList className="flex justify-center bg-white dark:bg-[#17181c] rounded-full p-2 mb-8">
          <TabsTrigger value="completo" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white flex items-center gap-2">
            <Package className="w-4 h-4" />
            Completo
          </TabsTrigger>
          <TabsTrigger value="imoveis" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Imóveis
          </TabsTrigger>
          <TabsTrigger value="veiculos" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white flex items-center gap-2">
            <Car className="w-4 h-4" />
            Veículos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="imoveis">
          <PlanGrid plans={IMOVEIS_PLANS} />
        </TabsContent>

        <TabsContent value="veiculos">
          <PlanGrid plans={VEICULOS_PLANS}/>
        </TabsContent>

        <TabsContent value="completo">
          <PlanGrid plans={COMPLETO_PLANS} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface Plan {
  title: string;
  price: string;
  features: string[];
}

interface PlanGridProps {
  plans: Plan[];
}

function PlanGrid({ plans }: PlanGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
      {plans.map((plan, index) => (
        <PlanCard key={index} title={plan.title} price={plan.price} features={plan.features} />
      ))}
    </div>
  );
}

function PlanCard({ title, price, features }: Plan) {
  const [mainPrice, subPrice] = price.split("ou"); // Dividindo preço e parcela

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-[#17181c] border-0 flex flex-col h-full">
      <CardHeader className="bg-teal-600 text-white p-6 rounded-t-lg">
        <CardTitle className="text-xl font-bold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-teal-600 flex items-center justify-center gap-2">
            {mainPrice.trim()}
          </p>
          {subPrice && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              ou <span className="font-semibold text-lg">{subPrice.trim()}</span>
            </p>
          )}
        </div>
        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="text-teal-500 w-5 h-5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6 mt-auto">
        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-300">
        <Gavel className="w-16 h-16 text-white" />
          Adquirir plano
        </Button>
      </CardFooter>
    </Card>
  );
}


const IMOVEIS_PLANS = [
  { title: "Plano Mensal - Imóveis", price: "R$130,00", features: IMOVEIS_FEATURES },
  { title: "Plano Semestral - Imóveis", price: "6x R$109,99 ou R$659,94", features: IMOVEIS_FEATURES },
  { title: "Plano Anual - Imóveis", price: "12x R$89,99 ou R$1079,88", features: IMOVEIS_FEATURES },
];

const VEICULOS_PLANS = [
  { title: "Plano Mensal - Veículos", price: "R$130,00", features: VEICULOS_FEATURES },
  { title: "Plano Semestral - Veículos", price: "6x R$109,99 ou R$659,94", features: VEICULOS_FEATURES },
  { title: "Plano Anual - Veículos", price: "12x R$89,99 ou R$1079,88", features: VEICULOS_FEATURES },
];

const COMPLETO_PLANS = [
  { title: "Plano Mensal - Imóveis, Máquina e Veículos", price: "R$160,00", features: COMPLETO_FEATURES },
  { title: "Plano Semestral - Imóveis, Máquina e Veículos", price: "6x R$119,99 ou R$719,94", features: COMPLETO_FEATURES },
  { title: "Plano Anual - Imóveis, Máquina e Veículos", price: "12x R$99,99 ou R$1199,88", features: COMPLETO_FEATURES },
];
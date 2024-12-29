import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PlanDetails() {
  const planDetails = {
    name: "Plano Premium",
    price: "R$99,99/mês",
    features: ["Recurso 1", "Recurso 2", "Recurso 3"],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes do Plano</CardTitle>
        <CardDescription>
          {planDetails.name} - {planDetails.price}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-1">
          {planDetails.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

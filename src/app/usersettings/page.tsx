import { Sidebar } from "./sidebar";
import { UserEditForm } from "./user-edit-form";
import { PlanDetails } from "./plan-details";

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Configurações do Usuário</h1>
        <div className="space-y-8">
          <UserEditForm />
          <PlanDetails />
        </div>
      </div>
    </div>
  );
}

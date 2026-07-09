import { Header } from "@/components/layout/Header";
import { Tabs, type TabItem } from "@/components/layout/Tabs";

const TABS: TabItem[] = [
  { id: "servicos", label: "Serviços" },
  { id: "detalhes", label: "Detalhes" },
  { id: "profissionais", label: "Profissionais" },
  { id: "avaliacoes", label: "Avaliações" },
  { id: "fidelidade", label: "Fidelidade" },
];

export default function Home() {
  return (
    <div className="app-shell">
      <Header />
      <Tabs tabs={TABS} activeId="servicos" />
    </div>
  );
}

import Tabs from "./Tabs";
import AddChildren from "./components/AddChildren/AddChildren";

import style from "./Style.module.css";
import { useTabAuthStore } from "../../../../../services/store/useTabAuthStore";
import { BadgeLogs } from "./components/LogsScan/BadgeLogs";

export interface TabItem {
  id: number;
  tab: string;
}

const tabs: TabItem[] = [
  { id: 0, tab: "Informacja" },
  { id: 1, tab: "Skanowania" },
  { id: 2, tab: "Dodaj dziecko" },
  { id: 3, tab: "Moje zakupy" },
];

export default function TabsPage() {
  const { activeTab } = useTabAuthStore();

  const renderTab = () => {
    switch (activeTab) {
      case 1:
        return <BadgeLogs />;
      case 2:
        return <AddChildren />;

      default:
        return null;
    }
  };

  return (
    <div className={style.tabs_section_wrapper}>
      <Tabs tabs={tabs} />
      {renderTab()}
    </div>
  );
}

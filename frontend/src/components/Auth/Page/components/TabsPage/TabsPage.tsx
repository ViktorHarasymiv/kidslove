import { useState } from "react";
import Tabs from "./Tabs";
import AddChildren from "./components/AddChildren/AddChildren";

import style from "./Style.module.css";

// TABS

export interface TabItem {
  id: number | null;
  tab: string;
}

const tabs: TabItem[] = [
  { id: 0, tab: "Informacja" },
  { id: 1, tab: "Skanowania" },
  { id: 2, tab: "Dodaj dziecko" },
  { id: 3, tab: "Moje zakupy" },
];

export default function TabsPage() {
  const [active, setActive] = useState(tabs[2].id);

  const renderTab = () => {
    switch (active) {
      // case 1:
      //   return <ChildrenList />;
      case 2:
        return <AddChildren />;
      // case 3:
      //   return <BadgesList />;
      default:
        return;
    }
  };

  return (
    <div className={style.tabs_section_wrapper}>
      <Tabs setActive={setActive} active={active} tabs={tabs} />
      {renderTab()}
    </div>
  );
}

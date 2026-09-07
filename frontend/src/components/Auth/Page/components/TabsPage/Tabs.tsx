import { useTabAuthStore } from "../../../../../services/store/useTabAuthStore";

import type { TabItem } from "./TabsPage";

interface Props {
  tabs: TabItem[];
}

export default function Tabs({ tabs }: Props) {
  const { activeTab, setActiveTab } = useTabAuthStore();

  return (
    <ul className="tabs_wrapper">
      {tabs.map((item) => (
        <li
          key={item.id}
          className={`tab_link ${activeTab === item.id ? "tab_link_active" : ""}`}
          onClick={() => setActiveTab(item.id)}
        >
          {item.tab}
        </li>
      ))}
    </ul>
  );
}

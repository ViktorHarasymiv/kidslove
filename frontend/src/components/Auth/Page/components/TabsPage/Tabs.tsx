import type { TabItem } from "./TabsPage";

interface Props {
  tabs: TabItem[];
  setActive: (id: number | null) => void;
  active: number | null;
}

export default function Tabs({ setActive, active, tabs }: Props) {
  return (
    <ul className="tabs_wrapper">
      {tabs.map((item) => {
        return (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`tab_link ${active === item.id ? "tab_link_active" : ""}`}
          >
            {item.tab}
          </li>
        );
      })}
    </ul>
  );
}

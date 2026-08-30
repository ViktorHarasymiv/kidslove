import { NavLink } from "react-router-dom";

import { nav } from "../../../data/navigation.ts";

import style from "./Style.module.css";

interface Props {
  light?: boolean;
  dark?: boolean;
}

export default function NavList({ light, dark }: Props) {
  return (
    <nav
      className={`${light ? style.light_nav_wrapper : ""} ${style.nav_wrapper}`}
    >
      {nav.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={`${light ? "light_button_link" : dark ? "dark_button_link" : ""}
 button_link`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

interface NavItem {
  label: string;
  to: string;
}

export const nav: NavItem[] = [
  { label: "Jak to działa", to: "/jak-to-dziala" },
  { label: "Funkcje", to: "/funkcje" },
  { label: "FAQ", to: "/faq" },
  { label: "Kup teraz", to: "/kup-teraz" },
];

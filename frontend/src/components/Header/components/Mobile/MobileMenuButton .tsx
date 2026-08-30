import style from "./Style.module.css";

export function MobileMenuButton({
  dark,
  isOpen,
  toggle,
}: {
  dark?: boolean;
  isOpen: boolean;
  toggle: () => void;
}) {
  console.log(dark);

  return (
    <button
      className={`${style.burger} ${dark ? style.dark : ""} ${isOpen ? style.open : ""}`}
      onClick={toggle}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

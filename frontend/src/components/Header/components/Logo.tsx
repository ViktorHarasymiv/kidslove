import logo_tablet from "../../../assets/logo/logo_light_t.svg";
import logo_mobile from "../../../assets/logo/logo_light_m.svg";

import logo_tablet_d from "../../../assets/logo/logo_dark_t.svg";
import logo_mobile_d from "../../../assets/logo/logo_dark_m.svg";

import { useWindowWidth } from "../../../hook/useWindowWidth";

interface Props {
  dark?: boolean;
}

export default function Logo({ dark }: Props) {
  const width = useWindowWidth();

  const isTablet = width > 767;

  const src = dark
    ? isTablet
      ? logo_tablet_d
      : logo_mobile_d
    : isTablet
      ? logo_tablet
      : logo_mobile;

  const size = isTablet
    ? { width: 115, height: 28 }
    : { width: 76, height: 20 };

  return (
    <a href="/">
      <img
        src={src}
        alt="Kids L💛ve"
        width={size.width}
        height={size.height}
        className="logo"
      />
    </a>
  );
}

"use client";

interface SwitcherProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  size?: number; // height of switch
  activeColor?: string; // color when ON
  inactiveColor?: string; // color when OFF
  knobColor?: string; // color of the knob
}

export default function Switcher({
  checked,
  onChange,
  size = 22,
  activeColor = "var(--accent-color )",
  inactiveColor = "#ccc",
  knobColor = "var(--white)",
}: SwitcherProps) {
  const width = size * 2; // switch width = double height
  const knobSize = size - 6;

  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width,
        height: size,
        borderRadius: size,
        backgroundColor: checked ? activeColor : inactiveColor,
        position: "relative",
        cursor: "pointer",
        transition: "background-color 0.25s ease",
      }}
    >
      <div
        style={{
          width: knobSize,
          height: knobSize,
          borderRadius: "50%",
          backgroundColor: knobColor,
          position: "absolute",
          top: 2.6,
          left: checked ? width - knobSize - 3 : 3,
          transition: "left 0.25s ease",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
}

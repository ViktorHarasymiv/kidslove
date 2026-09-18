"use client";

import React from "react";

interface LoaderProps {
  mode?: "fullscreen" | "inline";
  barWidth?: number;
  barHeight?: number;
  gap?: number;
  color?: string;
}

export default function Loader({
  mode = "inline",
  barWidth = 4,
  barHeight = 20,
  gap = 6,
  color = "var(--head-background-color)",
}: LoaderProps) {
  const isFull = mode === "fullscreen";

  return (
    <div style={isFull ? styles.fullscreenWrapper : styles.inlineWrapper}>
      <div style={styles.barsContainer}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              ...styles.bar,
              width: barWidth,
              height: barHeight,
              marginLeft: i === 0 ? 0 : gap,
              backgroundColor: color,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  fullscreenWrapper: {
    position: "fixed",
    inset: 0,
    backgroundColor: "var(--white)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  inlineWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  barsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  bar: {
    opacity: 0.3,
    animation: "barsPulse 0.8s ease-in-out infinite",
  },
};

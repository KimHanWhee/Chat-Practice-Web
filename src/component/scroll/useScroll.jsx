import { useEffect } from "react";
import { useState } from "react";

export const useScroll = () => {
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  const settingScroll = () => {
    setScroll({ x: window.scrollX, y: window.scrollY });
  };

  useEffect(window.addEventListener("scroll", settingScroll));
  return () => window.removeEventListener("scroll", settingScroll);

  return scroll;
};

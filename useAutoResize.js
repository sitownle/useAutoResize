import { useState, useRef } from "react";

export default function useAutoResize(config) {
  const [isExpanded, setIsExpanded] = useState(true);
  const targ = useRef();
  const dir = config ? config.direction.toLowerCase() : "left";
  const o = dir == "top" || dir == "bottom" ? "Y" : "X";
  if (targ.current) {
    targ.current.style.transition = "all 0.20s ease";
    targ.current.style.whiteSpace = "nowrap";
  }
  //const opac = config?.opacity;
  //const minH = config?.minHeight;

  function toggle() {
    if (targ.current) {
      if (isExpanded) {
        targ.current.style.transform = `scale${o}(0)`;
        targ.current.style.transformOrigin = dir;
        targ.current.style.opacity = 0;
        setIsExpanded(false);
      } else {
        targ.current.style.transform = `scale${o}(1)`;
        targ.current.style.opacity = 1;
        setIsExpanded(true);
      }
    }
  }

  return [toggle, targ];
}

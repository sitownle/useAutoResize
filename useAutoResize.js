import { useState, useRef } from "react";

export default function useAutoResize(config) {
  const [isExpanded, setIsExpanded] = useState(true);
  const targ = useRef();
  const dir = config ? config.direction.toLowerCase() : "left";
  const o = dir == "top" || dir == "bottom" ? "Y" : "X";
  const opac = config ? (config.opacity ? 1 : 0) : 0;
  //const minSize = config?.minsize;

  if (targ.current) {
    targ.current.style.transition = "all 0.20s ease";
    targ.current.style.whiteSpace = "nowrap";
    targ.current.willChange = "contents";
    targ.current.style.transformOrigin = dir;
  }

  function toggle() {
    if (targ.current) {
      if (isExpanded) {
        targ.current.style.transform = `scale${o}(0)`;
        targ.current.style.opacity = opac;
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

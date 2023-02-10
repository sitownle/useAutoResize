import { useState, useEffect, useRef } from "react";

export default function useAutoResize(config) {
  const [isExpanded, setIsExpanded] = useState(true);
  const targ = useRef();
  const expandedW = useRef(0);
  const dir = config?.direction.toLowerCase();
  const o = config?.orientation.toLowerCase();
  //const opacity = config?.opacity;
  //const minH = config?.minHeight;

  useEffect(() => {
    //console.log(targ.current);
    targ.current.style.transition = "all 0.25s ease";
    if (o == "height")
      targ.current.style.maxWidth = `${targ.current.offsetWidth + 5}px`;
    else targ.current.style.maxHeight = `${targ.current.offsetHeight}px`;
    targ.current.style.whiteSpace = "nowrap";
    expandedW.current =
      o == "height" ? targ.current.offsetHeight : targ.current.offsetWidth;
  }, []);

  function toggle() {
    let orient = o == "height" ? "height" : "width";
    if (targ.current) {
      if (isExpanded) {
        targ.current.style[orient] = 0;
        if (dir == "right")
          targ.current.style.transform = `translateX(${expandedW.current}px)`;
        if (dir == "down")
          targ.current.style.transform = `translateY(${expandedW.current}px)`;
        targ.current.style.opacity = 0;
        setIsExpanded(false);
      } else {
        targ.current.style[orient] = expandedW.current.toString() + "px";
        if (dir == "right") targ.current.style.transform = "translateX(0px)";
        if (dir == "down") targ.current.style.transform = "translateY(0px)";
        targ.current.style.opacity = 1;
        setIsExpanded(true);
      }
    }
  }

  return [toggle, targ];

  //   throw new Error(
  //     "INVALID ORIENTATION ERROR: Orientation must be 'width', 'height', 'horizontal', or 'vertical', and Direction must be 'up', 'down', 'left', or 'right'"
  //   );
}

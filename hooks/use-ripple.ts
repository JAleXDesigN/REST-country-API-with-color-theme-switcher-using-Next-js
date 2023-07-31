import { useCallback, useLayoutEffect, useRef, useState } from "react";

export interface RippleInfo {
  x: number;
  y: number;
  size: number;
}

export type RippleList = Array<RippleInfo>;

const useRipple = () => {
  const [ripples, setRipples] = useState<RippleList>([]);
  const timeout = useRef<NodeJS.Timeout>();

  const addRipple = useCallback(
    (
      event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>
    ) => {
      const rippleContainer = event.currentTarget.getBoundingClientRect();

      const size =
        rippleContainer.width > rippleContainer.height
          ? rippleContainer.width
          : rippleContainer.height;

      // Adjust for border and padding
      const containerOffsetX = rippleContainer.left + window.scrollX;
      const containerOffsetY = rippleContainer.top + window.scrollY;

      const pageX = "touches" in event ? event.touches[0].pageX : event.pageX;
      const pageY = "touches" in event ? event.touches[0].pageY : event.pageY;

      const x = pageX - containerOffsetX - size / 2;
      const y = pageY - containerOffsetY - size / 2;

      const newRipple = {
        x,
        y,
        size,
      };

      setRipples((prevState) => [...prevState, newRipple]);
    },
    []
  );

  useLayoutEffect(() => {
    if (ripples.length > 0) {
      timeout.current && clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setRipples([]);
        clearTimeout(timeout.current);
      }, 1000 * 2);
    }

    return () => clearTimeout(timeout.current);
  }, [ripples]);

  const listeners = {
    onMouseDown: addRipple,
    onTouchStart: addRipple,
  };

  return {
    ripples,
    listeners,
  };
};

export default useRipple;

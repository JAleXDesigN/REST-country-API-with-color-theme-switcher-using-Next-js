import type { FC } from "react";

import type { RippleList } from "@/hooks";

import styles from "./Ripple.module.scss";

interface RippleProps {
  ripples: RippleList;
}

const { root } = styles;

const Ripple: FC<RippleProps> = ({ ripples }) => {
  return (
    <>
      {ripples.length > 0 &&
        ripples.map((ripple, index) => {
          return (
            <span
              key={"ripple_" + index}
              className={root}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          );
        })}
    </>
  );
};

export default Ripple;

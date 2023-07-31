import type { FC, ButtonHTMLAttributes } from "react";

import { IconX } from "../icons";

import styles from "./ButtonClear.module.scss";

interface ButtonClearProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonClear: FC<ButtonClearProps> = ({ type = "button", ...rest }) => {
  return (
    <button
      type={type}
      className={styles.root}
      {...rest}
    >
      <IconX />
    </button>
  );
};

export default ButtonClear;

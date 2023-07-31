import { forwardRef, useMemo, type JSX } from "react";

import { createPolymorphicComponent, mergeClassNames } from "@/helpers";
import { useRipple } from "@/hooks";

import styles from "./Button.module.scss";
import Ripple from "./Ripple";

export interface ButtonProps {
  variant: "mode" | "back" | "border" | "pagination";
  icon?: () => JSX.Element;
  label: string;
  hiddeOnTheme?: "dark" | "light";
}

const { root, hidde_on_dark, hidde_on_light } = styles;

export const _Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & { component: React.ElementType }
>(({ variant, icon: Icon, label, hiddeOnTheme, component, ...rest }, ref) => {
  const Element = component || "button";
  const { listeners, ripples } = useRipple();

  const classes = useMemo(
    () =>
      mergeClassNames({
        [root]: true,
        [styles[variant]]: true,
        [hidde_on_dark]: hiddeOnTheme === "dark",
        [hidde_on_light]: hiddeOnTheme === "light",
      }),
    [hiddeOnTheme, variant]
  );

  return (
    <Element
      ref={ref}
      className={classes}
      {...(Element === "button" && { type: "button" })}
      {...listeners}
      {...rest}
    >
      {Icon && <Icon />}
      {label}
      <Ripple ripples={ripples} />
    </Element>
  );
});

_Button.displayName = "Button";

const Button = createPolymorphicComponent<"button", ButtonProps>(_Button);
export default Button;

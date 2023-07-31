import type { FC } from "react";

import { useMenuController, useRipple } from "@/hooks";

import { IconArrowDown } from "../icons";
import Ripple from "../Ripple";

import ButtonClear from "./ButtonClear";
import Options from "./Options";
import styles from "./Select.module.scss";

interface SelectProps {
  id: string;
  options: Filter[];
  value: Filter;
  placeholder: string;
  onChange: (value: Filter) => void;
  onClear: () => void;
}

const { root, target } = styles;

const Select: FC<SelectProps> = ({
  id,
  options,
  value,
  placeholder,
  onChange,
  onClear,
}) => {
  const { ripples, listeners } = useRipple();
  const {
    isOpen,
    activeIndex,
    activeId,
    setIsOpen,
    setActiveIndex,
    handleKeyDown,
  } = useMenuController(options, value, "select", onChange);

  return (
    <div className={root}>
      <div
        tabIndex={0}
        id={id}
        className={target}
        role="combobox"
        aria-label={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`option-list-for-${id}`}
        aria-activedescendant={activeId.current ?? undefined}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen((status) => !status);
        }}
        onKeyDown={handleKeyDown}
        {...listeners}
      >
        {value || placeholder}
        {value ? (
          <ButtonClear
            aria-label={`Clear-${id}-value`}
            onClick={() => {
              onClear();
              setActiveIndex(null);
              activeId.current = null;
            }}
          />
        ) : (
          <IconArrowDown />
        )}
        <Ripple ripples={ripples} />
      </div>

      {isOpen && (
        <Options
          options={options}
          activeIndex={activeIndex}
          onChange={(index, value, id) => {
            onChange(value);
            setIsOpen(false);
            setActiveIndex(index);
            activeId.current = id;
          }}
          onClose={() => setIsOpen(false)}
          ignoreOutsideClickId={id}
        />
      )}
    </div>
  );
};

export default Select;

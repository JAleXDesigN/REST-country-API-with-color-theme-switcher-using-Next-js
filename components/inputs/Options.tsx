import { forwardRef } from "react";

import { useClickOutside, useMergedRefs } from "@/hooks";

import styles from "./Options.module.scss";

interface OptionsProps {
  options: Filter[];
  activeIndex: number | null;
  ignoreOutsideClickId: string;
  onChange: (index: number, value: Filter, id: string) => void;
  onClose: () => void;
}

const { root, item } = styles;

const Options = forwardRef<HTMLDivElement, OptionsProps>(
  ({ options, activeIndex, ignoreOutsideClickId, onChange, onClose }, ref) => {
    const setRef = useClickOutside(onClose, ignoreOutsideClickId);
    const refs = useMergedRefs(ref, setRef);

    return (
      <div
        ref={refs}
        className={root}
        id={`option-list-for-${ignoreOutsideClickId}`}
        role="listbox"
      >
        {options.map((option, index) => (
          <button
            key={option}
            type="button"
            role="listitem"
            className={item}
            id={`option-${option}`}
            onClick={() => onChange(index, option, `option-${option}`)}
            onMouseDown={(e) => e.preventDefault()}
            data-active={activeIndex === index || undefined}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }
);

Options.displayName = "OptionList";

export default Options;

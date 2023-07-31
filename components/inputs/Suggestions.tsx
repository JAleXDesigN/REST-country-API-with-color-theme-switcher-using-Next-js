import type { Dispatch, SetStateAction } from "react";
import { forwardRef } from "react";

import { useClickOutside, useMergedRefs } from "@/hooks";

import styles from "./Suggestions.module.scss";

interface SuggestionsProps {
  suggestions: string[];
  activeIndex: number | null;
  ignoreOutsideClickId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSearch: (id: string, value: string, index: number) => void;
}

const { root, item } = styles;

const Suggestions = forwardRef<HTMLDivElement, SuggestionsProps>(
  (
    { suggestions, activeIndex, ignoreOutsideClickId, setIsOpen, onSearch },
    ref
  ) => {
    const setRef = useClickOutside(
      () => setIsOpen(false),
      ignoreOutsideClickId
    );
    const refs = useMergedRefs(ref, setRef);

    return (
      <div
        ref={refs}
        className={root}
        id="suggestions"
        role="listbox"
      >
        {suggestions.map((suggestion, index) => (
          <button
            key={`suggestion-${suggestion.toLowerCase().replace(" ", "-")}`}
            id={`suggestion-${suggestion.toLowerCase().replace(" ", "-")}`}
            role="listitem"
            type="button"
            className={item}
            onClick={() => {
              const id = `suggestion-${suggestion
                .toLowerCase()
                .replace(" ", "-")}`;
              onSearch(id, suggestion, index);
            }}
            onMouseDown={(e) => e.preventDefault()}
            data-active={activeIndex === index || undefined}
          >
            {suggestion}
          </button>
        ))}
      </div>
    );
  }
);

Suggestions.displayName = "SuggestionsList";

export default Suggestions;

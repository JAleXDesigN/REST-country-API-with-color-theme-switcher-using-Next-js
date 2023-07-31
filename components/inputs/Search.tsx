import { type FC } from "react";

import { useMenuController } from "@/hooks";

import { IconSearch } from "../icons";

import styles from "./Search.module.scss";
import Suggestions from "./Suggestions";

interface InputSearchProps {
  id: string;
  data: string[];
  value: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

const { root, input } = styles;

const Search: FC<InputSearchProps> = ({
  id,
  data,
  value,
  onChange,
  onSearch,
}) => {
  const {
    isOpen,
    activeIndex,
    activeId,
    menuItems,
    handleKeyDown,
    setIsOpen,
    setActiveIndex,
  } = useMenuController(data, value, "search", onChange, onSearch);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setIsOpen(true);
    setActiveIndex(null);
    onChange?.(value);
    activeId.current = null;
  };

  return (
    <div
      role="search"
      className={root}
    >
      <IconSearch />
      <input
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls="suggestions"
        aria-activedescendant={activeId.current ?? undefined}
        type="search"
        value={value}
        className={input}
        aria-label="Search for a country"
        placeholder="Search for a country..."
        autoComplete="off"
        onClick={() => setIsOpen(true)}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {isOpen && menuItems && menuItems.length > 0 && (
        <Suggestions
          suggestions={menuItems}
          activeIndex={activeIndex}
          ignoreOutsideClickId={id}
          setIsOpen={setIsOpen}
          onSearch={(id, value, index) => {
            onSearch?.(value);
            setIsOpen(false);
            setActiveIndex(index);
            activeId.current = id;
          }}
        />
      )}
    </div>
  );
};

export default Search;

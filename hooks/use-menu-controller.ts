import type { KeyboardEvent } from "react";
import { useMemo, useRef, useState } from "react";

type MenuType = "search" | "select";
type MaybeNumber = number | null;
type MaybeString = string | null;

type HandleKeyDown = (event: KeyboardEvent<HTMLElement>) => void;

const useMenuController = <T extends string>(
  data: T[],
  value: T,
  menuType: MenuType,
  onChange?: (value: T) => void,
  onSearch?: (value: T) => void
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<MaybeNumber>(null);

  const activeId = useRef<MaybeString>(null);

  const menuItems = useMemo(() => {
    if (menuType === "search" && value.length > 0) {
      return data
        .filter((item) =>
          item.toLowerCase().includes(value.trim().toLowerCase())
        )
        .slice(0, 6);
    }
    if (menuType === "select") return data;
  }, [data, value, menuType]);

  const handleKeyDown: HandleKeyDown = (event) => {
    const { key, target, currentTarget } = event;
    const keysToPreventDefault = ["ArrowDown", "ArrowUp", "Escape"];

    if (keysToPreventDefault.includes(key)) event.preventDefault();
    if (!menuItems) return;

    const actions: Record<string, () => void> = {
      ArrowDown: () => {
        const newIndex =
          activeIndex !== null ? (activeIndex + 1) % menuItems.length : 0;
        setIsOpen(true);
        setActiveIndex(newIndex);
      },
      ArrowUp: () => {
        const newIndex = activeIndex
          ? (activeIndex - 1 + menuItems.length) % menuItems.length
          : menuItems.length - 1;
        setIsOpen(true);
        setActiveIndex(newIndex);
      },
      Enter: () => {
        if (target !== currentTarget) return;
        setIsOpen((status) => !status);
        if (activeIndex !== null) {
          menuType === "search"
            ? onSearch?.(menuItems[activeIndex] as T)
            : onChange?.(menuItems[activeIndex] as T);
        }
      },
      Escape: () => {
        setIsOpen(false);
        setActiveIndex((prev) => (menuItems.includes(value) ? prev : null));
      },
    };

    const action = actions[key];
    if (action) action();
  };

  return {
    isOpen,
    activeIndex,
    activeId,
    menuItems,
    setIsOpen,
    setActiveIndex,
    handleKeyDown,
  };
};

export default useMenuController;

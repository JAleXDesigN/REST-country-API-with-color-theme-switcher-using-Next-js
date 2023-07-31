import { useCallback, useEffect, useRef } from "react";

type ClickOutsideEvent =
  | "mousedown"
  | "mouseup"
  | "click"
  | "touchstart"
  | "touchend";

type UseClickOutside = (
  handler: () => void,
  ignoreId: string,
  events?: ClickOutsideEvent[]
) => (node: HTMLElement | null) => void;

const defaultEvents: ClickOutsideEvent[] = ["mousedown", "touchstart"];

const useClickOutside: UseClickOutside = (
  handler,
  ignoreId,
  events = defaultEvents
) => {
  const refs = useRef<HTMLElement | null>(null);
  const ignoredElement = useRef<HTMLElement | null>(null);

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      refs.current = node;
      ignoredElement.current = document.querySelector(`#${ignoreId}`);
    },
    [ignoreId]
  );

  const eventHandler = useCallback(
    (event: Event) => {
      const target = event.target as HTMLElement;
      if (
        !refs.current ||
        refs.current.contains(target) ||
        (ignoredElement.current && ignoredElement.current.contains(target)) ||
        !document.body.contains(target)
      ) {
        return;
      }
      handler();
    },
    [handler]
  );

  useEffect(() => {
    events?.forEach((event) => document.addEventListener(event, eventHandler));

    return () => {
      events?.forEach((event) =>
        document.removeEventListener(event, eventHandler)
      );
    };
  }, [events, eventHandler]);

  return setRef;
};

export default useClickOutside;

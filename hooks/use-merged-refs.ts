import { useCallback } from "react";

type Ref<T> = React.ForwardedRef<T>;

export const assignRef = <T>(ref: React.ForwardedRef<T>, value: T | null) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
};

export const mergeRefs = <T>(...refs: Ref<T>[]) => {
  return (node: T | null) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
};

const useMergedRef = <T>(...refs: Ref<T>[]) => {
  return useCallback(
    (node: T | null) => {
      refs.forEach((ref) => assignRef(ref as React.ForwardedRef<T>, node));
    },
    [refs]
  );
};

export default useMergedRef;

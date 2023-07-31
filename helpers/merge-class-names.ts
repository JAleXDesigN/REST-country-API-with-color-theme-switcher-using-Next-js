type BaseClassList =
  | string
  | undefined
  | null
  | Record<string, boolean | string | number | null | undefined>
  | BaseClassList[];
type ClassList = BaseClassList | BaseClassList[];

export const mergeClassNames = (obj: ClassList): string => {
  if (!obj) return "";

  if (typeof obj === "string") return obj.trim();

  if (Array.isArray(obj)) {
    return obj.map(mergeClassNames).filter(Boolean).join(" ");
  }

  return Object.entries(obj)
    .filter(([, value]) => value)
    .map(([key]) => key.trim())
    .join(" ");
};

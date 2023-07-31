import { type FC, useId, useEffect } from "react";

import Button from "./Button";
import { IconArrowLeft, IconArrowRight, IconDots } from "./icons";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  range: (number | "dots")[];
  active: number;
  onChange: (page: number) => void;
  goPrevious?: () => void;
  goNext?: () => void;
  goFirst?: () => void;
  goLast?: () => void;
}

const Pagination: FC<PaginationProps> = ({
  range,
  active,
  onChange,
  goPrevious,
  goNext,
}) => {
  const id = useId();

  useEffect(
    () =>
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      }),
    [active]
  );

  return (
    <div className={styles.root}>
      <Button
        variant="pagination"
        icon={IconArrowLeft}
        label=""
        aria-label="Go back page"
        disabled={active === 1 || undefined}
        onClick={() => goPrevious?.()}
      />

      {range.map((btn, idx) => {
        const isNumber = typeof btn === "number";
        return (
          <Button
            key={`${id}-${idx}`}
            variant="pagination"
            icon={!isNumber ? IconDots : undefined}
            label={isNumber ? `${btn}` : ""}
            aria-label={isNumber ? `Go to page ${btn}` : "Dots"}
            data-active={(isNumber && btn === active) || undefined}
            data-aria-dots={!isNumber ? true : undefined}
            {...(isNumber ? { onClick: () => onChange(btn) } : {})}
          />
        );
      })}

      <Button
        variant="pagination"
        icon={IconArrowRight}
        label=""
        aria-label="Go next page"
        disabled={active === range[range.length - 1]}
        onClick={() => goNext?.()}
      />
    </div>
  );
};

export default Pagination;

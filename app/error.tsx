"use client";
import Button from "@/components/Button";
import { IconDatabaseError } from "@/components/icons";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="error">
      <IconDatabaseError />
      <h1>{error.message}</h1>
      <Button
        variant="back"
        onClick={() => reset()}
        label="Try again"
      />
    </div>
  );
}

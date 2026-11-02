import { cn } from "@/lib/utils";

export function Input({ className = "", type = "text", ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "rounded-field border-brand-border text-brand-gray outline-brand-focus placeholder:text-brand-gray md:text-caption w-full border bg-white p-3.75 text-xs disabled:cursor-not-allowed disabled:opacity-50 md:px-4.5 md:py-4",
        className,
      )}
      {...props}
    />
  );
}

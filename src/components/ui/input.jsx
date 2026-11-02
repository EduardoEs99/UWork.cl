import { cn } from "@/lib/utils";

export function Input({ className = "", type = "text", ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "w-full rounded-field border border-brand-border bg-white p-3.75 text-xs text-brand-gray outline-brand-focus placeholder:text-brand-gray disabled:cursor-not-allowed disabled:opacity-50 md:px-4.5 md:py-4 md:text-caption",
        className,
      )}
      {...props}
    />
  );
}

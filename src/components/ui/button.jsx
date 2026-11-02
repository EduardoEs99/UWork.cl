import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full px-7 py-3 text-center text-sm font-medium shadow-brand-button transition duration-200 ease-out hover:scale-103 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-focus active:scale-98 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
  {
    variants: {
      variant: {
        default: "bg-brand-mint text-brand-petroleum hover:bg-brand-hover",
        secondary:
          "bg-brand-orange text-brand-petroleum hover:bg-brand-orange/85",
        outline:
          "border border-brand-mint bg-white text-brand-petroleum hover:bg-brand-surface",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
/**
 * @param {{ className?: string, variant?: "default" | "secondary" | "outline", href?: string, nativeNavigation?: boolean, children?: import("react").ReactNode, [key: string]: any }} props
 */
export function Button({
  className = "",
  variant = "default",
  href = undefined,
  nativeNavigation = false,
  type = "button",
  children,
  ...props
}) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      type={href ? undefined : type}
      data-astro-reload={href && nativeNavigation ? "" : undefined}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

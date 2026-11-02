import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

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
type SharedProps = {
  className?: string;
  variant?: "default" | "secondary" | "outline";
  nativeNavigation?: boolean;
  children?: ReactNode;
};

type LinkProps = SharedProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "href" | "type"
  > & {
    href: string;
  };

type ActionProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

export function Button(props: LinkProps | ActionProps) {
  const classes = cn(
    buttonVariants({ variant: props.variant ?? "default" }),
    props.className,
  );

  if (props.href !== undefined) {
    const {
      href,
      children,
      className,
      variant,
      nativeNavigation,
      ...linkProps
    } = props;
    return (
      <a
        href={href}
        data-astro-reload={nativeNavigation ? "" : undefined}
        className={classes}
        {...linkProps}
      >
        {children}
      </a>
    );
  }

  const {
    href,
    type = "button",
    children,
    className,
    variant,
    nativeNavigation,
    ...buttonProps
  } = props;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

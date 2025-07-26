import * as React from "react";
import { cn } from "@/lib/utils";

const spacingMap = (prefix: string, value?: string) =>
  value ? `${prefix}-${value}` : undefined;

export interface StackProps extends React.ComponentProps<"div"> {
  gap?: string;
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  m?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  mx?: string;
  my?: string;
  p?: string;
  pt?: string;
  pb?: string;
  pl?: string;
  pr?: string;
  px?: string;
  py?: string;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      children,
      gap,
      direction = "col",
      align,
      justify,
      m,
      mt,
      mb,
      ml,
      mr,
      mx,
      my,
      p,
      pt,
      pb,
      pl,
      pr,
      px,
      py,
      ...props
    },
    ref
  ) => {
    const classes = [
      "flex",
      direction === "row" ? "flex-row" : "flex-col",
      gap && `gap-${gap}`,
      align && `items-${align}`,
      justify && `justify-${justify}`,
      spacingMap("m", m),
      spacingMap("mt", mt),
      spacingMap("mb", mb),
      spacingMap("ml", ml),
      spacingMap("mr", mr),
      spacingMap("mx", mx),
      spacingMap("my", my),
      spacingMap("p", p),
      spacingMap("pt", pt),
      spacingMap("pb", pb),
      spacingMap("pl", pl),
      spacingMap("pr", pr),
      spacingMap("px", px),
      spacingMap("py", py),
      className,
    ];
    return (
      <div ref={ref} className={cn(...classes)} {...props}>
        {children}
      </div>
    );
  }
);
Stack.displayName = "Stack";

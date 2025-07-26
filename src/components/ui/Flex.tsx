import * as React from "react";
import { cn } from "@/lib/utils";

// Utility to map prop values to Tailwind classes
const spacingMap = (prefix: string, value?: string) =>
  value ? `${prefix}-${value}` : undefined;

export interface FlexProps extends React.ComponentProps<"div"> {
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
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  flex?: string; // e.g. '1', 'auto', 'initial', 'none'
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      children,
      direction = "row",
      align,
      justify,
      wrap,
      flex,
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
      direction === "col" ? "flex-col" : "flex-row",
      align && `items-${align}`,
      justify && `justify-${justify}`,
      wrap && `flex-${wrap}`,
      flex && `flex-${flex}`,
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
Flex.displayName = "Flex";

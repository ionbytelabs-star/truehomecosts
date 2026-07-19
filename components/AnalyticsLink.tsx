"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { trackEvent } from "@/lib/analytics";

type AnalyticsLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  children: ReactNode;
  eventName: string;
  eventParameters?: Record<string, string | number | boolean>;
};

export function AnalyticsLink({ children, eventName, eventParameters, onClick, ...props }: AnalyticsLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventParameters);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}

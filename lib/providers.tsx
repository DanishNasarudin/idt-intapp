"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { ThemeProvider } from "./providers/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Suspense>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          elements: {
            footer: "hidden",
          },
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextUIProvider navigate={router.push}>
            <TooltipProvider disableHoverableContent={true} delayDuration={100}>
              {children}
            </TooltipProvider>
          </NextUIProvider>
        </ThemeProvider>
      </ClerkProvider>
    </Suspense>
  );
}

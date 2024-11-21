"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

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
        <NextUIProvider navigate={router.push}>
          <TooltipProvider disableHoverableContent={true} delayDuration={100}>
            {/* <SocketProvider>{children}</SocketProvider> */}
            {children}
          </TooltipProvider>
        </NextUIProvider>
      </ClerkProvider>
    </Suspense>
  );
}

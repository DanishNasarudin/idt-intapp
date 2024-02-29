"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { SocketProvider } from "./providers/socket-provider";
import { dark } from "@clerk/themes";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          footer: "hidden",
        },
      }}
    >
      <NextUIProvider navigate={router.push}>
        <SocketProvider>{children}</SocketProvider>
      </NextUIProvider>
    </ClerkProvider>
  );
}

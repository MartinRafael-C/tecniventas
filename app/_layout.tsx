import { ThemeProvider } from "@/lib/contexts/theme/ThemeProvider";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack />
    </ThemeProvider>
  );
}
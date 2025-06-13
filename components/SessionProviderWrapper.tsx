"use client"; // This is a client component

import { SessionProvider } from 'next-auth/react';
import React from 'react';

export function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
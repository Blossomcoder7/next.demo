"use client";
// pages/register/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterIndex() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/register/user");
  }, [router]);
  return null;
}

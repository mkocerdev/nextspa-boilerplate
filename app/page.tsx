"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const authData = authClient.getAuthData();

    if (!authData) {
      router.push("/login"); // Giriş yapmamışsa login sayfasına
    } else {
      router.push("/company/dashboard"); // Giriş yaptıysa dashboard'a
    }
  }, [router]);

  return null; // Yönlendirme yapılacağı için içerik render edilmez
}

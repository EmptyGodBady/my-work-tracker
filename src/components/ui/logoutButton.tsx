import React from "react";
import { Button } from "./button";
import { useRouter } from "next/router";

export default function logoutButton() {
  const router = useRouter();

  async function handleSubmit() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/login");
  }

  return (
    <Button variant="outline" onClick={handleSubmit} className="cursor-pointer">
      Wyloguj się
    </Button>
  );
}

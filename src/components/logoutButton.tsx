import React from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { logout } from "@/store/userSlice";
import { Button } from "./ui/button";
import { clearDate } from "@/store/dateSlice";

export default function logoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  async function handleSubmit() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    toast.success("Wylogowano");
    dispatch(logout());
    dispatch(clearDate());
    router.push("/login");
  }

  return (
    <Button variant="outline" onClick={handleSubmit} className="cursor-pointer">
      Wyloguj się
    </Button>
  );
}

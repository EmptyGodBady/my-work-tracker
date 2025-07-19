import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Registration() {
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      login: formData.get("login"),
      password: formData.get("password"),
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      console.log(res);
      form.reset();
      // TODO: Add toast notification
      router.push("/dashboard");
    } else {
      console.log(res);
      const json = await res.json();
      // TODO: Add toast notification
    }
  }

  return (
    <Card className="w-[350px] max-w-md mx-4 bg-[#157F1F] text-white mt-16 sm:mt-24 md:mt-32 md:w-full">
      <CardHeader>
        <CardTitle>Rejestracja</CardTitle>
        <CardAction>
          <Button variant="link" className="text-white" asChild>
            <Link href="/login">Zaloguj się</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="firstName">Imię</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Katarzyna"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Nazwisko</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Kowalska"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="login">Login</Label>
              <Input
                id="login"
                name="login"
                type="text"
                placeholder="Katarzyna123"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Hasło</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200 mt-4"
          >
            Zarejestruj się
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

import { useRouter } from "next/router";
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
import Link from "next/link";
import { toast } from "sonner";
import { login } from "@/store/userSlice";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      login: formData.get("login"),
      password: formData.get("password"),
    };
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      console.log(res);
      form.reset();
      toast("Zalogowano");
      router.push("/dashboard");
      dispatch(login(data.login as string));
    } else {
      console.log(res);
      const json = await res.json();
      toast("Wszystkie pola są wymagane");
    }
  }
  return (
    <Card className="w-[350px] max-w-[400px]  mx-4 bg-[#157F1F] text-white mt-16 sm:mt-24 md:mt-32 md:w-full">
      <CardHeader>
        <CardTitle>Zaloguj się</CardTitle>
        <CardAction>
          <Button variant="link" className="text-white" asChild>
            <Link href="/">Zarejestruj się</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
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
            Zaloguj się
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

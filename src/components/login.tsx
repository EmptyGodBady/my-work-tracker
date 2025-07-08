import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Login() {
  return (
    <Card className="w-[350px] max-w-md  mx-4 bg-[#157F1F] text-white mt-16 sm:mt-24 md:mt-32 md:w-full">
      <CardHeader>
        <CardTitle>Zaloguj się</CardTitle>

        <CardAction>
          <Button variant="link" className="text-white">
            Zarejestruj się
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="login">Login</Label>
              <Input
                id="login"
                type="text"
                placeholder="Katarzyna123"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Hasło</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-gray-200"
        >
          Zaloguj się
        </Button>
      </CardFooter>
    </Card>
  );
}

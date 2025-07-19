import LoginForm from "@/components/login";
import Navbar from "@/components/navbar";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full  ">
      <Navbar isAuth={false} />
      <LoginForm />
    </div>
  );
}

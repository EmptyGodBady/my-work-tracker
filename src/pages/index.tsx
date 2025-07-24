import LoginForm from "@/components/login-form";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full  ">
      <Navbar />
      <LoginForm />
    </div>
  );
}

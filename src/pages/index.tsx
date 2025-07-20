import Navbar from "@/components/navbar";
import Registration from "@/components/registration";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full  ">
      <Navbar />
      <Registration />
    </div>
  );
}

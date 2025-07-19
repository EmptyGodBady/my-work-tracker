import Navbar from "@/components/navbar";

export default function Main() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full  ">
      <Navbar isAuth={true} />
    </div>
  );
}

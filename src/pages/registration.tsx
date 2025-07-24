import Navbar from "@/components/navbar";
import RegistrationForm from "@/components/registration-form";

export default function Registration() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full  ">
      <Navbar />
      <RegistrationForm />
    </div>
  );
}

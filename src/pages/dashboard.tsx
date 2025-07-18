import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";

export default function Dashboard() {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Navbar />
      <div className="flex flex-col  justify-center h-full gap-2 max-w-[80%] md:w-full w-[350px] pt-32">
        <div className=" flex  ">
          <Clock className="w-6 h-6 mr-2" /> Moje Godziny
        </div>
        <Separator />
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {numbers.map((num) => (
            <div
              key={num}
              className="bg-[#157F1F] p-6 rounded w-32 h-18 text-center"
            >
              MAJ
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

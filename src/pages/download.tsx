import { selectHoursSummary } from "@/store/date/selectors";
import { selectUser } from "@/store/user/selectors";
import { useSelector } from "react-redux";
import generatePDF from "react-to-pdf";
import { useRef } from "react";
import PDFGenerator from "@/components/pdf-generator";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export default function Download() {
  const targetRef = useRef<HTMLDivElement>(null);

  const user = useSelector(selectUser);
  const hoursSummary = useSelector(selectHoursSummary);
  const router = useRouter();
  return (
    <div>
      {hoursSummary && (
        <div className="flex justify-center ">
          <div ref={targetRef} className="text-black absolute mt-20">
            <PDFGenerator hoursSummary={hoursSummary} />
          </div>
          <Button
            className="mt-6 w-1/3 py-2  sm:py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg/30 hover:scale-105 hover:from-green-500 hover:to-green-700 transition transform backdrop-blur-md border border-white/30 text-sm sm:text-lg"
            onClick={() => {
              generatePDF(targetRef, {
                filename: `Ewidencja liczby godzin ${user.userFirstName} ${user.userLastName}.pdf`,
              });
              router.push("/time-tracker");
            }}
          >
            Pobierz
          </Button>
        </div>
      )}
    </div>
  );
}

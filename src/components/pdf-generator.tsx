import { Flex } from "@/components/ui/Flex";
import { Stack } from "@/components/ui/Stack";
import { useAppSelector } from "@/hooks/redux";
import { selectDate, selectMonthRecord } from "@/store/date/selectors";
import { selectUser } from "@/store/user/selectors";
import { useSelector } from "react-redux";

const months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

interface Props {
  hoursSummary: number;
}

export default function PDFGenerator({ hoursSummary }: Props) {
  const user = useSelector(selectUser);
  const date = useSelector(selectDate);
  const monthRecord = useAppSelector(selectMonthRecord);
  return (
    <div className="px-20 h-[296mm] text-[11px] w-[209mm] ">
      <Stack>
        <p className="text-center">Zalącznik nr 1</p>
        <p className="text-center">
          Ewidencja godzin wykonywania umowy zlecenia zawartej w dniu
        </p>
        <p className="text-center">................ r.</p>
        <p>
          Miesiąc: {months[date.month + 1 ?? 0]} {date.year}r.
        </p>
        <p className="capitalize mb-2">
          Nazwisko i imię Zleceniobiorcy: {user.userFirstName}{" "}
          {user.userLastName}
        </p>
      </Stack>
      <Stack>
        <Flex>
          <div className="border-black border text-center flex-1/5 grow">
            Dzień miesięca
          </div>
          <div className="border-black border text-center flex-1/5  grow leading-[1] pb-2">
            Liczba godzin wykonywania umowy zlecenia
          </div>
          <div className="border-black border text-center flex-1/5 grow">
            Podpis Zleceniobiorcy
          </div>
          <div className="border-black border text-center flex-1/5 grow">
            Uwagi
          </div>
          <div className="border-black border text-center flex-1/5 grow leading-[1]">
            Podpis Zleceniodawcy lub osoby przez niego upoważnionej
          </div>
        </Flex>
        <>
          {monthRecord?.map((entry, i) => (
            <Flex
              key={entry.day}
              flex="1"
              className="w-full text-center gap-[0.5px]"
            >
              <div className="pb-1.5  border border-black flex-1/5 grow">
                {entry.day}
              </div>
              <div className="pb-1.5 border border-black flex-1/5 grow">
                {entry.hours} g
              </div>
              <div className="pb-1.5 border border-black flex-1/5 grow"></div>
              <div className="pb-1.5 border border-black flex-1/5 grow">
                {entry.comment}
              </div>
              <div className="pb-1.5 border border-black flex-1/5 grow"></div>
            </Flex>
          ))}
        </>
        <Flex>
          <div className="p-1  border border-black flex-1/5 grow ">
            Liczba godzin wykonywania umowy zlecenia ogółem
          </div>
          <div className="p-1  border border-black flex-1/5 grow text-center">
            {hoursSummary} g
          </div>
          <div className="p-1  border border-black flex-1/5 grow"></div>
          <div className="p-1  border border-black flex-1/5 grow"></div>
          <div className="p-1  border border-black flex-1/5 grow"></div>
        </Flex>
      </Stack>
    </div>
  );
}

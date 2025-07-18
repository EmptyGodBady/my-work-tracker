import LogoutButton from "./ui/logoutButton";

interface Props {
  isAuth: boolean;
}

export default function Navbar({ isAuth }: Props) {
  return (
    <div className="flex h-14 p-2 w-full bg-[#0F1E10] items-center justify-between">
      <div className="pl-2 text-3xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
        Moja Żabka
      </div>
      {isAuth && <LogoutButton />}
    </div>
  );
}

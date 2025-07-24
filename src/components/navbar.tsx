import LogoutButton from "./logoutButton";

interface Props {
  isAuth?: boolean;
  userName?: string;
}

export default function Navbar({ isAuth, userName }: Props) {
  return (
    <div className="flex h-14 p-2 w-full bg-gradient-to-r from-green-400/80 via-green-600/80 to-green-800/80 items-center justify-between">
      <div className="pl-2 text-3xl font-extrabold tracking-wide uppercase  text-border  bg-clip-text  ">
        <p className="text-shadow-lg/30">Moja Żabka</p>
      </div>
      {isAuth && (
        <div className="flex justify-between gap-3 p-2 items-center">
          <LogoutButton />
          <p className="text-white p-1.5 border rounded-md text-sm hidden md:block capitalize">
            {userName}
          </p>
        </div>
      )}
    </div>
  );
}

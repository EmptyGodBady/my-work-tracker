import LogoutButton from "./logoutButton";

interface Props {
  isAuth?: boolean;
  userLogin?: string;
}

export default function Navbar({ isAuth, userLogin }: Props) {
  return (
    <div className="flex h-14 p-2 w-full bg-[#0F1E10] items-center justify-between">
      <div className="pl-2 text-3xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent ">
        Moja Żabka
      </div>
      {isAuth && (
        <div className="flex justify-between gap-3 p-2 items-center">
          <LogoutButton />
          <p className="text-white p-1.5 border rounded-md text-sm hidden md:block">
            {userLogin}
          </p>
        </div>
      )}
    </div>
  );
}

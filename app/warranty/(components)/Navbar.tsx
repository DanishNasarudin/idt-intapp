"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();

  return (
    <div
      className="
      absolute
    flex flex-col gap-4 px-4 py-4 max-w-[220px] w-full h-full
    bg-[#131313] border-r-[1px] border-zinc-800"
    >
      <div className="flex items-center gap-4">
        <img
          src="https://idealtech.com.my/wp-content/uploads/2023/03/IDT_LOGO-150x150.png"
          alt="logo"
          className="w-8 h-8"
        />
        <h5 className="font-bold">Warranty</h5>
      </div>
      <Link href={"/warranty"}>
        <button
          className={`
        flex items-center gap-4 px-4 py-2 rounded-md transition-all w-full
        mobilehover:hover:bg-zinc-800
        ${
          pathname === "/warranty"
            ? "[&>svg]:fill-accent text-accent bg-zinc-800"
            : ""
        }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-white w-4"
          >
            <path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"></path>
          </svg>
          <p className="font-medium">Home</p>
        </button>
      </Link>
      <div className="border-[1px] border-zinc-800" />
      <div className="flex flex-col gap-2">
        <Link href={"/warranty/ampang-hq"}>
          <button
            className={`
          flex items-center gap-4 px-4 py-2 rounded-md transition-all w-full
          mobilehover:hover:bg-zinc-800
          ${
            pathname === "/warranty/ampang-hq"
              ? "[&>svg]:fill-accent text-accent bg-zinc-800"
              : ""
          }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-white w-4"
            >
              <path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"></path>
            </svg>
            <p className="font-medium">Ampang HQ</p>
          </button>
        </Link>
        <Link href={"/warranty/ss2-pj"}>
          <button
            className={`
          flex items-center gap-4 px-4 py-2 rounded-md transition-all w-full
          mobilehover:hover:bg-zinc-800
          ${
            pathname === "/warranty/ss2-pj"
              ? "[&>svg]:fill-accent text-accent bg-zinc-800"
              : ""
          }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-white w-4"
            >
              <path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"></path>
            </svg>
            <p className="font-medium">SS2, PJ</p>
          </button>
        </Link>
        <Link href={"/warranty/setia-alam"}>
          <button
            className={`
          flex items-center gap-4 px-4 py-2 rounded-md transition-all w-full
          mobilehover:hover:bg-zinc-800
          ${
            pathname === "/warranty/setia-alam"
              ? "[&>svg]:fill-accent text-accent bg-zinc-800"
              : ""
          }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-white w-4"
            >
              <path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"></path>
            </svg>
            <p className="font-medium">Setia Alam</p>
          </button>
        </Link>
        <Link href={"/warranty/jb"}>
          <button
            className={`
          flex items-center gap-4 px-4 py-2 rounded-md transition-all w-full
          mobilehover:hover:bg-zinc-800
          ${
            pathname === "/warranty/jb"
              ? "[&>svg]:fill-accent text-accent bg-zinc-800"
              : ""
          }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-white w-4"
            >
              <path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"></path>
            </svg>
            <p className="font-medium">Johor Bharu</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-col z-50 w-full bg-transparent text-sm pb-2 sm:pb-0 top-0 absolute">
      <nav
        className="relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link
            className="flex-none text-xl w-32 md:w-44 font-semibold"
            href="/"
            aria-label="Brand"
          >
            <Image
              src="/alcowell_toolbox.svg"
              width={300}
              height={200}
              alt="alcowell_toolbox"
            />
          </Link>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-bold bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
              onClick={() => menuFunction()}
            >
              <svg
                className="hs-collapse-open:hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hs-collapse-open:block hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className={`ml-60 bg-white sm:bg-transparent shadow-sm hs-collapse transition-all ease-linear duration-300 basis-full grow sm:block ${
            openMenu ? "" : "hidden"
          }`}
        >
          <div className="flex flex-col mt-3 gap-y-4 gap-x-0 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
            <Link
              className="font-bold pt-2 px-3 sm:py-2 sm:text-white text-gray-700 hover:text-gray-500 md:text-xl"
              href="/"
              aria-current="page"
            >
              Home
            </Link>
            <a
              className="font-bold px-3 sm:text-white text-gray-700 hover:text-gray-500 sm:py-2 md:text-xl"
              href="#"
            >
              About
            </a>
            <a
              className="font-bold px-3 sm:text-white text-gray-700 hover:text-gray-500 sm:py-2 md:text-xl"
              href="#"
            >
              Tech
            </a>
            <a
              className="font-bold px-3 pb-2 sm:text-white text-gray-700 hover:text-gray-500 sm:py-2 md:text-xl"
              href="#"
            >
              Diary
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

import { Routes } from "@/types/routes";
import {
  IconBell,
  IconCalendar,
  IconHome,
  IconSchool,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { signOut } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleOnMouseClick = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleOutsideClick = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-200 to-cyan-200">
        <div className="container mx-auto flex justify-between p-5">
          <p className="text-xl font-bold">TaskSculpt</p>
          <ul className="flex  gap-x-5">
            <li>
              <Link href={Routes.DASHBOARD}>
                <IconHome />
              </Link>
            </li>
            <li>
              <IconSchool />
            </li>
            <li>
              <IconCalendar />
            </li>
            <li>
              <IconBell />
            </li>
            <li ref={ref} className="relative flex justify-center">
              <IconUserCircle
                onClick={handleOnMouseClick}
                className="cursor-pointer"
              />
              {isDropdownVisible && (
                <ul className="absolute top-8 flex flex-col items-center gap-y-4 bg-white p-5 shadow">
                  <li className="cursor-pointer rounded p-3 font-semibold hover:bg-slate-50">
                    Profile
                  </li>
                  <li
                    className="cursor-pointer whitespace-nowrap rounded bg-red-400 p-3 font-semibold text-white hover:bg-red-500"
                    onClick={() => {
                      void signOut();
                    }}
                  >
                    Sign out
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <main className="container mx-auto p-5">{children}</main>
    </>
  );
}

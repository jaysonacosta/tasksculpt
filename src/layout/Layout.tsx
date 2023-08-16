import { Routes } from "@/types/routes";
import {
  IconBell,
  IconCalendar,
  IconHome,
  IconSchool,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="bg-gradient-to-r from-blue-200 to-cyan-200 p-5">
        <div className="container mx-auto flex justify-between">
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
            <li>
              <IconUserCircle />
            </li>
          </ul>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
}

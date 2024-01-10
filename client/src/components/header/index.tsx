"use client";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "../mobileNav.tsx";
import { HeaderItem, headerNavLinks } from "@/services/header/headerHelper";
import { useState } from "react";

const Header = () => {
  const [selectedItem, setSelectedItem] = useState<string>(HeaderItem.HOME);
  return (
    <header className="flex items-center justify-between p-2 px-10 text-white bg-pink">
      <div>
        <Link href="/" onClick={() => setSelectedItem(HeaderItem.HOME)}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image
                src={"/logoWithBrandNameWhite.png"}
                width={300}
                height={200}
                alt="Logo"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== "/")
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`${
                link.id === selectedItem && "border-b border-white"
              } hidden text-xl sm:block`}
              onClick={() => setSelectedItem(link.id)}
            >
              {link.title}
            </Link>
          ))}
        <MobileNav />
      </div>
    </header>
  );
};
export default Header;

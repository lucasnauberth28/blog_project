"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {

      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`w-full flex fixed z-30 ${isScrolled ? 'transition bg-white shadow-md ' : 'transition bg-transparent'}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        <Link href="/" className="text-xl font-bold text-gray-800">
          MeuBlog
        </Link>

        <div className="flex gap-3 items-center">
            <nav className="hidden space-x-6 md:flex">
            <Link href="/" className="text-gray-800 hover:text-gray-900">
                Início
            </Link>
            <Link href="/posts" className="text-gray-800 hover:text-gray-900">
                Posts
            </Link>
            <Link href="/sobre" className="text-gray-800 hover:text-gray-900">
                Sobre
            </Link>
            </nav>

            <div className="hidden md:flex">
                <Link href='/login'>
                  <Button className="cursor-pointer">Sou #PhZeiro</Button>
                </Link>
            </div>
            
            <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menu"
            >
            <Menu className="h-6 w-6 text-gray-700" />
            </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t bg-white shadow">
          <nav className="flex flex-col space-y-2 p-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Início
            </Link>
            <Link href="/posts" className="text-gray-600 hover:text-gray-900">
              Posts
            </Link>
            <Link href="/sobre" className="text-gray-600 hover:text-gray-900">
              Sobre
            </Link>
            <Button className="mt-2">Entrar</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
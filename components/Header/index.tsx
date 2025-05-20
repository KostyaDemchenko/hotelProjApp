"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";

const MENU = [
  { href: "/", label: "Головна", icon: "ri-home-line" },
  { href: "/rooms", label: "Номери", icon: "ri-hotel-bed-line" },
  { href: "/restaurant", label: "Ресторан", icon: "ri-restaurant-2-line" },
  { href: "/about", label: "Про нас", icon: "ri-information-line" },
  { href: "/contacts", label: "Контакти", icon: "ri-contacts-book-line" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Фиксированный top-navbar */}
      <Navbar className="fixed inset-x-0 top-0 z-30 border-b bg-white/80 backdrop-blur-md">
        <NavbarBrand>
          <Link
            className="text-xl font-bold tracking-tight text-primary"
            href="/"
          >
            В.О.Л.Я.
          </Link>
        </NavbarBrand>

        <NavbarContent as="ul" className="hidden gap-6 md:flex">
          {MENU.map(({ href, label, icon }) => {
            const active = pathname === href;

            return (
              <NavbarItem key={href} as="li" className="relative list-none">
                <Link
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary"
                  href={href}
                >
                  <i className={`${icon} text-lg`} />
                  {label}
                </Link>

                <AnimatePresence>
                  {active && (
                    <motion.span
                      animate={{ opacity: 1, scaleX: 1 }}
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded bg-primary"
                      exit={{ opacity: 0, scaleX: 0 }}
                      initial={{ opacity: 0, scaleX: 0 }}
                      layoutId="underline"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        <Button
          isIconOnly
          aria-label="Відкрити меню"
          className="md:hidden"
          variant="light"
          onPress={() => setOpen(true)}
        >
          <i className="ri-menu-line text-2xl" />
        </Button>
      </Navbar>

      {/* Модальне меню */}
      <Modal isOpen={open} placement="center" onOpenChange={setOpen}>
        <ModalContent className="w-11/12 max-w-sm p-4">
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between gap-2 pb-2">
                <span className="text-lg font-semibold">Меню</span>
              </ModalHeader>
              <ModalBody className="space-y-4 py-2">
                {MENU.map(({ href, label, icon }) => (
                  <Link
                    key={href}
                    className="flex items-center gap-3 text-base font-medium text-gray-800 hover:text-primary"
                    href={href}
                    onClick={onClose}
                  >
                    <i className={`${icon} text-xl`} />
                    {label}
                  </Link>
                ))}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

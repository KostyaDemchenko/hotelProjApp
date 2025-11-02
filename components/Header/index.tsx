"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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

import imgObj from "@/public/images/utils";
import Container from "@/components/Container";

const MENU = [
  { href: "/", label: "Головна", icon: "ri-home-line" },
  { href: "/rooms", label: "Номери", icon: "ri-hotel-bed-line" },
  {
    href: "/restaurant",
    label: "Ресторан",
    icon: "ri-restaurant-2-line",
    submenu: [
      { href: "/restaurant/menu", label: "Меню", icon: "ri-book-2-line" },
      {
        href: "/restaurant/booking",
        label: "Забронювати ресторан",
        icon: "ri-calendar-check-line",
      },
      {
        href: "/restaurant/delivery",
        label: "Доставка до номера",
        icon: "ri-e-bike-2-line",
      },
    ],
  },
  { href: "/about", label: "Про нас", icon: "ri-information-line" },
  { href: "/contacts", label: "Бронюваня", icon: "ri-contacts-book-line" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закриваємо дропдаун при кліку поза ним
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openDropdown]);

  return (
    <Container>
      {/* Фиксированный top-navbar */}
      <Navbar className="fixed inset-x-0 top-0 z-30 border-b bg-white/80 backdrop-blur-md">
        <NavbarBrand>
          <Link
            className="text-xl font-bold tracking-tight text-primary"
            href="/"
          >
            <Image alt="logo" className="w-12" src={imgObj.logo} />
          </Link>
        </NavbarBrand>

        <NavbarContent as="ul" className="hidden gap-6 md:flex">
          {MENU.map(({ href, label, icon, submenu }) => {
            const active =
              pathname === href ||
              (submenu &&
                submenu.some((item) => pathname === item.href));

            return (
              <NavbarItem key={href} as="li" className="relative list-none">
                <div ref={submenu ? dropdownRef : null}>
                  {!submenu ? (
                    <Link
                      className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary"
                      href={href}
                    >
                      <i className={`${icon} text-lg`} />
                      {label}
                    </Link>
                  ) : (
                    <button
                      className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary"
                      onClick={() =>
                        setOpenDropdown(openDropdown === href ? null : href)
                      }
                    >
                      <i className={`${icon} text-lg`} />
                      {label}
                      <i
                        className={`ri-arrow-down-s-line text-base transition-transform ${
                          openDropdown === href ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}

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

                  {/* Dropdown menu */}
                  {submenu && openDropdown === href && (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full mt-2 z-50"
                      exit={{ opacity: 0, y: -10 }}
                      initial={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="min-w-[220px] rounded-lg border bg-white shadow-lg">
                        <Link
                          className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary first:rounded-t-lg border-b"
                          href={href}
                          onClick={() => setOpenDropdown(null)}
                        >
                          <i className={`${icon} text-base`} />
                          {label}
                        </Link>
                        {submenu.map((item) => (
                          <Link
                            key={item.href}
                            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary last:rounded-b-lg"
                            href={item.href}
                            onClick={() => setOpenDropdown(null)}
                          >
                            <i className={`${item.icon} text-base`} />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
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
              <ModalBody className="space-y-2 py-2">
                {MENU.map(({ href, label, icon, submenu }) => (
                  <div key={href}>
                    {!submenu ? (
                      <Link
                        className="flex items-center gap-3 text-base font-medium text-gray-800 hover:text-primary py-2"
                        href={href}
                        onClick={onClose}
                      >
                        <i className={`${icon} text-xl`} />
                        {label}
                      </Link>
                    ) : (
                      <div>
                        <button
                          className="flex w-full items-center justify-between gap-3 text-base font-medium text-gray-800 hover:text-primary py-2"
                          onClick={() =>
                            setMobileSubmenuOpen(
                              mobileSubmenuOpen === href ? null : href
                            )
                          }
                        >
                          <div className="flex items-center gap-3">
                            <i className={`${icon} text-xl`} />
                            {label}
                          </div>
                          <i
                            className={`ri-arrow-down-s-line text-xl transition-transform ${
                              mobileSubmenuOpen === href ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileSubmenuOpen === href && (
                            <motion.div
                              animate={{ height: "auto", opacity: 1 }}
                              className="ml-8 space-y-1 overflow-hidden"
                              exit={{ height: 0, opacity: 0 }}
                              initial={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {submenu.map((item) => (
                                <Link
                                  key={item.href}
                                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary py-2"
                                  href={item.href}
                                  onClick={onClose}
                                >
                                  <i className={`${item.icon} text-lg`} />
                                  {item.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ))}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
}

"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [navMenuIsOpen, setNavMenuIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleNav = () => {
    setNavMenuIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const body = document.body;
    if (!body) return;

    body.classList.toggle("navIsVisible", navMenuIsOpen);

    return () => {
      body.classList.remove("navIsVisible");
    };
  }, [navMenuIsOpen]);

  const isActive = (path) => pathname === path;
  // const whiteBurger = pathname === "/" || pathname === "/informations";

  return (
    <nav className="nav">
      <div className="navBar">
        {/* Nav toggle */}
        <button
          type="button"
          className={clsx("text-secondary navToggle", {
            active: navMenuIsOpen,
            // "text-secondary": whiteBurger,
            // "text-primary": !whiteBurger,
          })}
          onClick={toggleNav}
          aria-label="Toggle navigation"
        >
          <span className="navNavicon">
            <span className="navNaviconLine first"></span>
            <span className="navNaviconLine second"></span>
            <span className="navNaviconLine third"></span>
          </span>
        </button>
      </div>

      {/* Menu background */}
      <div
        className={clsx("navMenuBg", {
          active: navMenuIsOpen,
        })}
      ></div>

      {/* Menu */}
      <div
        className={clsx("navMenu", {
          active: navMenuIsOpen,
        })}
      >
        <div className="navMenuContainer">
          <ul>
            <li className={clsx({ active: isActive("/") })}>
              <Link href="/" onClick={() => setNavMenuIsOpen(false)}>
                Accueil
              </Link>
            </li>
            <li className={clsx({ active: isActive("/informations") })}>
              <Link
                href="/informations"
                onClick={() => setNavMenuIsOpen(false)}
              >
                Informations
              </Link>
            </li>
          </ul>
        </div>
        <p className="right-0 bottom-0 absolute opacity-80 mr-6 font-light text-[8px] text-secondary delay-700">
          &copy; 2025 La Boule Rouge
        </p>
      </div>
    </nav>
  );
}

/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  handleOpen: () => void;
  handleRemove: () => void;
  openClass: string;
}

const Header = ({ handleOpen, handleRemove, openClass }: HeaderProps) => {
  const [scroll, setScroll] = useState(false);
  const pathname = usePathname();
  const isTop = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const scrollCheck = window.scrollY > 100;
      setScroll(scrollCheck);
    };

    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={scroll && !isTop ? "header sticky-bar stick" : "header sticky-bar"}>
        <div className="container">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
                <Link href="/">
                  <span className="d-flex">
                    <img
                      alt="映像求人PROポータル"
                      src="https://pub-647b9765a3c242dcac081e185c116796.r2.dev/eizo-job-logo%20(2).png"
                      style={{
                        height: "clamp(40px, 8vw, 80px)",
                        width: "auto",
                        objectFit: "contain"
                      }}
                    />
                  </span>
                </Link>
              </div>
              <button
                type="button"
                className={`burger-icon burger-icon-white ${openClass ? "burger-close" : ""}`}
                onClick={() => {
                  handleOpen();
                  handleRemove();
                }}
                aria-label="Toggle mobile menu"
              >
                <span className="burger-icon-top" />
                <span className="burger-icon-mid" />
                <span className="burger-icon-bottom" />
              </button>
            </div>

            <div className="header-nav">
              <nav className="nav-main-menu">
                <ul className="main-menu">
                  <li>
                    <Link href="/jobs-list">
                      <span>求人検索</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/post">
                      <span>転職コラム</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.luvas.red/">
                      <span>運営会社</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header-right">
              <div className="block-signin">
                <Link href="/jobs-list">
                  <span className="btn btn-default btn-shadow hover-up">求人を探す</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
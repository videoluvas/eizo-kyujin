/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface HeaderProps {
  handleOpen: () => void;
  handleRemove: () => void;
  openClass: string;
}

const Header = ({ handleOpen, handleRemove, openClass }: HeaderProps) => {
  const [scroll, setScroll] = useState(false);

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
      <header className={scroll ? "header sticky-bar stick" : "header sticky-bar"}>
        <div className="container">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
                <Link href="/">
                  <span className="d-flex">
                    <img alt="jobBox" src="assets/imgs/template/jobhub-logo.svg" />
                  </span>
                </Link>
              </div>
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
                    <Link href="/page-about">
                      <span>このサイトについて</span>
                    </Link>
                  </li>
                </ul>
              </nav>

              <div
                className={`burger-icon burger-icon-white ${openClass ? "burger-close" : ""}`}
                onClick={() => {
                  handleOpen();
                  handleRemove();
                }}
              >
                <span className="burger-icon-top" />
                <span className="burger-icon-mid" />
                <span className="burger-icon-bottom" />
              </div>
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

      <div className="mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">
            <div className="perfect-scroll">
              <div className="mobile-search mobile-header-border mb-30">
                <form action="#">
                  <input type="text" placeholder="キーワード検索…" />
                  <i className="fi-rr-search" />
                </form>
              </div>

              <div className="mobile-menu-wrap mobile-header-border">
                <nav>
                  <ul className="mobile-menu font-heading">
                    <li>
                      <Link href="/jobs-list">
                        <span>求人検索</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-about">
                        <span>このサイトについて</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="site-copyright">
                Copyright 2022 © JobBox.
                <br />
                Designed by AliThemes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
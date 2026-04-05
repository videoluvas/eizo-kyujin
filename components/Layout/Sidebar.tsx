"use client";
import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  openClass: string;
}

const Sidebar = ({ openClass }: SidebarProps) => {
  const [isActive, setIsActive] = useState({
    status: false,
    key: 0,
  });

  const handleToggle = (key: number) => {
    if (isActive.key === key) {
      setIsActive({
        status: false,
        key: 0,
      });
    } else {
      setIsActive({
        status: true,
        key,
      });
    }
  };

  return (
    <>
      <div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar ${openClass}`}>
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">
            <div className="perfect-scroll">
<div className="mobile-menu-wrap mobile-header-border">
                {/* mobile menu start*/}
                <nav>
  <ul className="mobile-menu font-heading">
    <li>
      <Link href="/jobs-list">
        <span>求人一覧</span>
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
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer mt-50">
      <div className="container">
        <div className="row">

          {/* ロゴ説明 */}
          <div className="footer-col-1 col-md-4 col-sm-12">
            <Link href="/">
              <span>
                <img alt="logo" src="/assets/imgs/template/jobhub-logo.svg" />
              </span>
            </Link>

            <div className="mt-20 mb-20 font-xs color-text-paragraph-2">
              映像クリエイター向け求人スカウトサービス。  
              動画制作会社や企業から、あなたの作品に直接オファーが届きます。
            </div>
          </div>

          {/* サービス */}
          <div className="footer-col-2 col-md-3 col-xs-6">
            <h6 className="mb-20">サービス</h6>
            <ul className="menu-footer">
              <li>
                <Link href="/">ホーム</Link>
              </li>
              <li>
                <Link href="/jobs-list">求人一覧</Link>
              </li>
              <li>
                <Link href="/terms">利用規約 & プライバシー</Link>
              </li>
              <li>
                <a href="https://luvas.red" target="_blank">
                  運営会社
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* コピーライト */}
        <div className="footer-bottom mt-50">
          <div className="row">
            <div className="col-md-12 text-center">
              <span className="font-xs color-text-paragraph">
                Copyright © {new Date().getFullYear()} LUVAS. All rights reserved
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
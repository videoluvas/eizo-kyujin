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
                  <img alt="映像求人PROポータル" src="https://pub-647b9765a3c242dcac081e185c116796.r2.dev/eizo-job-logo%20(2).png" />
              </span>
            </Link>

            <div className="mt-20 mb-20 font-xs color-text-paragraph-2">
             映像業界・動画制作に特化した転職求人検索サービス。
プロの動画制作会社が運営し、現場目線で厳選した求人を掲載。
大手求人ポータルとの提携により、圧倒的な求人数から最適な転職先を見つけることができます。
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
                <Link href="/post">転職コラム</Link>
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
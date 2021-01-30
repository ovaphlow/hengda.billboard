import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faLaptop,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

export default function BottomNav() {
  return (
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <span>Copyright © 2020-2021 哈尔滨乔汉科技有限公司. All rights reserved.</span>
      <ul className="list-inline pt-2">
        <li className="list-inline-item">
          <a href="http://" className="text-reset text-decoration-none">
            <FontAwesomeIcon icon={faMobileAlt} fixedWidth size="lg" />
            求职微信小程序
          </a>
        </li>
        <li className="list-inline-item">
          <a href="http://www.longzhaopin.com" className="text-reset text-decoration-none">
            <FontAwesomeIcon icon={faLaptop} fixedWidth size="lg" />
            企业招聘网站
          </a>
        </li>
      </ul>
      <span>
        <a
          href="https://github.com/ovaphlow/hengda.billboard"
          className="text-muted text-decoration-none"
        >
          <FontAwesomeIcon icon={faCode} fixedWidth size="lg" />
          Source code by ovaphlow
        </a>
      </span>
    </div>
  );
}

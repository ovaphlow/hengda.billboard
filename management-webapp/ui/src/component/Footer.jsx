import React from 'react';

import IconCodeSlash from '../icon/CodeSlash';
import IconLaptop from '../icon/Laptop';
import IconSmartphone from '../icon/Smartphone';

export default function Footer() {
  return (
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <span>
        Copyright © 2020 恒达交通. All rights reserved.
      </span>
      <ul className="list-inline pt-2">
        <li className="list-inline-item">
          <a href="http://" className="text-reset text-decoration-none">
            <IconSmartphone />
            求职微信小程序
          </a>
        </li>
        <li className="list-inline-item">
          <a href="http://" className="text-reset text-decoration-none">
            <IconLaptop />
            企业招聘网站
          </a>
        </li>
      </ul>
      <span>
        <a href="https://github.com/ovaphlow/hengda.billboard" className="text-muted text-decoration-none">
          <IconCodeSlash />
          Source code by ovaphlow
        </a>
      </span>
    </div>
  );
}

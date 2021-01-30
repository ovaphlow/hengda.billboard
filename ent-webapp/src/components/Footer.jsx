import React from 'react';

const Footer = () => {
  return (
    <div className="row text-white x-0 px-6 bg-dark border-top pb-3 footer">
      <div className="col mt-4">
        <div className="row flex-center">
          <a className="footer-word" target="_blank" href="/agt/law.html">
            法律声明&nbsp;
          </a>
          |
          <a className="footer-word" target="_blank" href="/agt/privacy.html">
            &nbsp;隐私政策&nbsp;
          </a>
          |
          <span>&nbsp;Copyright © 2020-2021 哈尔滨乔汉科技有限公司.All Rights Reserved.&nbsp;</span>
          |
          <a
            className="footer-word"
            target="_blank"
            rel="noopener noreferrer"
            href="http://beian.miit.gov.cn/"
          >
            &nbsp;互联网ICP备案:黑ICP备20002542号
          </a>
        </div>
        <div className="row flex-center">
          <span>合作咨询热线：18944650800&nbsp;|&nbsp;举报邮箱:job51-hlj@foxmail.com</span>
        </div>
      </div>
    </div>
  );
};
export default Footer;

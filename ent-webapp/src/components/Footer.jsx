import React from 'react';

const Footer = () => (
  <div className="row footer px-6 text-white bg-dark border-top pb-3 m-0">
    <div className="col mt-4">
      <div className="row flex-center">
        <a className="footer-word" target="_blank" href="/agt/law.html">
          法律声明|
        </a>
        <a className="footer-word" target="_blank" href="/agt/privacy.html">
          隐私政策|
        </a>
        <span>版权声明: Copyright©哈尔滨乔汉科技有限公司|</span>
        <a className="footer-word" href="http://www.beian.miit.gov.cn/">
          互联网ICP备案:黑ICP备20002542号
        </a>
      </div>
      <div className="row flex-center">
        <span>
          合作咨询热线:0451-xxxxxxxx|客服热线:0451-xxxxxxxx|
          违法和不良信息举报电话:0451-xxxxxxxx|举报邮箱:
        </span>
      </div>
    </div>
  </div>
);

export default Footer;

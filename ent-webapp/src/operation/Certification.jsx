import React from 'react';
import { View } from './Components';

const Certification = () => {
  return (
    <View category="认证">
      <div className="card bg-white border-0 shadow">
        <div className="card-body">
          <div className="row">
            <div className="col-1 register-font text-primary">
              <h1>01</h1>
            </div>
            <div className="col-2 pt-3">
              <strong>登录系统后点击我的按钮进行企业认证操作</strong>
            </div>
            <div className="col-9 register-img">
              <img src="./lib/img/r-4.png" alt="" />
            </div>
          </div>
          <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
          <div className="row">
            <div className="col register-font text-primary">
              <h1>02</h1>
            </div>
            <div className="col-2 pt-3">
              <strong>点击编辑填写企业基本信息</strong>
            </div>
            <div className="col-9 register-img">
              <img src="./lib/img/r-6.png" alt="" />
            </div>
          </div>
          <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
          <div className="row">
            <div className="col register-font text-primary">
              <h1>03</h1>
            </div>
            <div className="col-2 pt-3">
              <strong>带有红色星号处为必填项，其中红色方框处企业号代表企业的统一社会信用代码</strong>
            </div>
            <div className="col-9 register-img">
              <img src="./lib/img/r-5.png" alt="" />
            </div>
          </div>
          <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
          <div className="row">
            <div className="col register-font text-primary">
              <h1>04</h1>
            </div>
            <div className="col-2 pt-3">
              <strong>公司简介处尽量控制在300字以内，填写完所有信息后点击保存并提交审核，等待审核</strong>
            </div>
            <div className="col-9 register-img">
              <img src="./lib/img/r-7.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </View>
  );
};

export default Certification;

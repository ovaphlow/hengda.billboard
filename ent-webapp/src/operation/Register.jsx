import React from 'react';
import { View } from './Components';
const Register = () => {
  return (
    <View category="注册">
      <div className="card bg-white border-0 shadow">
        <div className="card-body">
          <div className="row">
            <div className="col-1 register-font text-primary">
              <h1>01</h1>
            </div>
            <div className="col-2 pt-3">
              <strong>点击上方企业注册按钮即可进入注册界面</strong>
            </div>
            <div className="col-9 register-img">
              <img src="./lib/img/r-1.png" alt="" />
            </div>
          </div>
          <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
          <div className="row">
            <div className="col register-font text-primary">
              <h1>02</h1>
            </div>
            <div className="col-2 pt-3">
              <strong>进入注册界面后填写基本信息后即可完成注册</strong>
            </div>
            <div className="col-9 register-img">
              <img src="./lib/img/r-2.png" alt="" />
            </div>
          </div>
          <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
          <div className="row">
            <div className="col register-font text-primary">
              <h1>03</h1>
            </div>
            <div className="col-2 pt-3">
              <strong>用户注册后即可输入电子邮箱和密码进行登录，登录后进入企业端首页</strong>
            </div>
            <div className="col-9 register-img">
              <img src="./lib/img/r-3.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </View>
  );
};

export default Register;

import React, { useState } from 'react';

const Hover = () => {
  const [flag, setFlag] = useState('btn1');

  return (
    <div className="card mt-3 border-0 shadow">
      <div className="tab-title">
        <div className="tab-title-nav">
          <ul>
            <li>
              <div
                className={`tab-button ${flag === 'btn1' ? 'tab-btn1' : 'tab-btn'}`}
                onMouseOver={() => setFlag('btn1')}
                onFocus={() => setFlag('btn1')}
              >
                平台简介
              </div>
            </li>
            <li>
              <div
                className={`tab-button ${flag === 'btn2' ? 'tab-btn1' : 'tab-btn'}`}
                onMouseOver={() => setFlag('btn2')}
                onFocus={() => setFlag('btn2')}
              >
                人才招聘
              </div>
            </li>
            <li>
              {' '}
              <div
                className={`tab-button ${flag === 'btn3' ? 'tab-btn1' : 'tab-btn'}`}
                onMouseOver={() => setFlag('btn3')}
                onFocus={() => setFlag('btn3')}
              >
                商业活动
              </div>
            </li>
            <li>
              <div
                className={`tab-button ${flag === 'btn4' ? 'tab-btn1' : 'tab-btn'}`}
                onMouseOver={() => setFlag('btn4')}
                onFocus={() => setFlag('btn4')}
              >
                咨询培训
              </div>
            </li>
            <li>
              <div
                className={`tab-button ${flag === 'btn5' ? 'tab-btn1' : 'tab-btn'}`}
                onMouseOver={() => setFlag('btn5')}
                onFocus={() => setFlag('btn5')}
              >
                产教融合
              </div>
            </li>
          </ul>
        </div>
        <div className="tab-title-con ">
          <div className={`${flag === 'btn1' ? 'tab-con' : 'tab-con1'}`}>
            <h4 className="title-line">简要介绍</h4>
            <div className="hover-list-left">
              <ul>
                <li>
                  <div className="hover-list">运营满 6 年</div>
                </li>
                <li>
                  <div className="hover-list">线上服务 2020 天</div>
                </li>
                <li>
                  <div className="hover-list">平台活跃200,000优质求职者</div>
                </li>
                <li>
                  <div className="hover-list">累计发布85,000,000个职位需求</div>
                </li>
              </ul>
            </div>
            <div className="hover-list-right">
              <img src="./lib/img/goods_news1.png" alt="" />
            </div>
          </div>
          <div className={`${flag === 'btn2' ? 'tab-con' : 'tab-con1'}`}>
            <h4 className="title-line">主要服务</h4>
            <div className="hover-list-left">
              <ul>
                <li>
                  <div className="hover-list">校园招聘</div>
                </li>
                <li>
                  <div className="hover-list">社会招聘</div>
                </li>
                <li>
                  <div className="hover-list">RPO服务</div>
                </li>
                <li>
                  <div className="hover-list">猎头服务</div>
                </li>
              </ul>
            </div>
            <div className="hover-list-right">
              <img src="./lib/img/zhaopin.png" alt="" />
            </div>
          </div>
          <div className={`${flag === 'btn3' ? 'tab-con' : 'tab-con1'}`}>
            <h4 className="title-line">活动策划</h4>
            <div className="hover-list-left">
              <ul>
                <li>
                  <div className="hover-list">赛事策划</div>
                </li>
                <li>
                  <div className="hover-list">论坛会议</div>
                </li>
                <li>
                  <div className="hover-list">行业沙龙</div>
                </li>
                <li>
                  <div className="hover-list">展示展览</div>
                </li>
              </ul>
            </div>
            <div className="hover-list-right">
              <img src="./lib/img/business.png" alt="" />
            </div>
          </div>
          <div className={`${flag === 'btn4' ? 'tab-con' : 'tab-con1'}`}>
            <h4 className="title-line">规划指导</h4>
            <div className="hover-list-left">
              <ul>
                <li>
                  <div className="hover-list">学涯指导</div>
                </li>
                <li>
                  <div className="hover-list">职涯规划</div>
                </li>
                <li>
                  <div className="hover-list">素质提升</div>
                </li>
                <li>
                  <div className="hover-list">职业指导</div>
                </li>
              </ul>
            </div>
            <div className="hover-list-right">
              <img src="./lib/img/consultation.png" alt="" />
            </div>
          </div>
          <div className={`${flag === 'btn5' ? 'tab-con' : 'tab-con1'}`}>
            <h4 className="title-line">教学培养</h4>
            <div className="hover-list-left">
              <ul>
                <li>
                  <div className="hover-list">联合办学</div>
                </li>
                <li>
                  <div className="hover-list">订单培养</div>
                </li>
                <li>
                  <div className="hover-list">定制培养</div>
                </li>
                <li>
                  <div className="hover-list">产业学院</div>
                </li>
              </ul>
            </div>
            <div className="hover-list-right">
              <img src="./lib/img/education.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hover;

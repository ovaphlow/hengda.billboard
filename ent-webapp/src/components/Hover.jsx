import React, { useState } from 'react';

const Hover = () => {
  const [flag, setFlag] = useState('btn1');

  return (
    <div className="card mt-3 border-0 shadow">
      <div className="tab-title">
        <div className="tab-title-nav">
          <div
            className={`tab-button ${flag === 'btn1' ? 'tab-btn1' : 'tab-btn'}`}
            onMouseOver={() => setFlag('btn1')}
            onFocus={() => setFlag('btn1')}
          >
            平台简介
          </div>
          <div
            className={`tab-button ${flag === 'btn2' ? 'tab-btn1' : 'tab-btn'}`}
            onMouseOver={() => setFlag('btn2')}
            onFocus={() => setFlag('btn2')}
          >
            活动策划
          </div>
          <div
            className={`tab-button ${flag === 'btn3' ? 'tab-btn1' : 'tab-btn'}`}
            onMouseOver={() => setFlag('btn3')}
            onFocus={() => setFlag('btn3')}
          >
            引才基地
          </div>
          <div
            className={`tab-button ${flag === 'btn4' ? 'tab-btn1' : 'tab-btn'}`}
            onMouseOver={() => setFlag('btn4')}
            onFocus={() => setFlag('btn4')}
          >
            引才基地
          </div>
          <div
            className={`tab-button ${flag === 'btn5' ? 'tab-btn1' : 'tab-btn'}`}
            onMouseOver={() => setFlag('btn5')}
            onFocus={() => setFlag('btn5')}
          >
            引才基地
          </div>
          <div
            className={`tab-button ${flag === 'btn6' ? 'tab-btn1' : 'tab-btn'}`}
            onMouseOver={() => setFlag('btn6')}
            onFocus={() => setFlag('btn6')}
          >
            引才基地
          </div>
        </div>
        <div className="tab-title-con">
          <div className={`${flag === 'btn1' ? 'tab-con' : 'tab-con1'}`}>11111</div>
          <div className={`${flag === 'btn2' ? 'tab-con' : 'tab-con1'}`}>22222</div>
          <div className={`${flag === 'btn3' ? 'tab-con' : 'tab-con1'}`}>33333</div>
          <div className={`${flag === 'btn4' ? 'tab-con' : 'tab-con1'}`}>44444</div>
          <div className={`${flag === 'btn5' ? 'tab-con' : 'tab-con1'}`}>55555</div>
          <div className={`${flag === 'btn6' ? 'tab-con' : 'tab-con1'}`}>66666</div>
        </div>
      </div>
    </div>
  );
};
export default Hover;

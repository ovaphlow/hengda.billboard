import React, { useEffect, useState } from 'react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import AutoCards from '../components/AutoCards';

const TopicRow = (item) => {
  const reg = (str) => str && str.replace(/<[^<>]+>/g, '');

  const getTag = (tag) => {
    if (tag) {
      switch (tag) {
        case '职业发展':
          return <span className="text-primary">[{item.tag}]</span>;
        case '面试问题':
          return <span className="text-success">[{item.tag}]</span>;
        case '职业规划':
          return <span className="text-info">[{item.tag}]</span>;
        default:
          return <span className="text-dark">[{item.tag}]</span>;
      }
    } else {
      return <span className="text-white">[]</span>;
    }
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <strong>
            {getTag(item.tag)}
            {item.title}
          </strong>
        </div>
      </div>
      <div className="row">
        <div className="col-9">
          <span className="text-muted text-hidden">{reg(item.content)}</span>
        </div>
        <div className="col">
          {item.id ? (
            <a className="pull-right text-muted" href={`#首页/${item.id}?u_id=${item.uuid}`}>
              阅读全文
              {'>>>'}
            </a>
          ) : (
            <span className="pull-right text-white">x</span>
          )}
        </div>
      </div>
      {item.id && <hr />}
    </>
  );
};

const Home = () => {
  const [message, setMessage] = useState([]);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'));
    if (_auth === null) {
      window.location = '#登录';
    } else {
      fetch('./api/topic/ent/')
        .then((res) => res.json())
        .then((res) => {
          if (res.content) {
            const len = res.content.length;
            if (len < 4) {
              for (let inx = 0; inx < 4 - len; inx += 1) {
                res.content.push({});
              }
            }
            setMessage(res.content);
          } else {
            window.alert(res.message);
          }
        });
      fetch('./api/chart/ent-home/')
        .then((res) => res.json())
        .then((res) => {
          if (res.content) {
            setChartData(res.content);
          }
        });
    }
  }, []);

  return (
    <div className="mt-4" style={{ maxWidth: 1200, margin: 'auto', marginBottom: 100 }}>
      <div className="row">
        <div className="col card rounded-0 shadow">
          <AutoCards category="企业端-首页" />
        </div>
        &nbsp;&nbsp;&nbsp;
        <div className="col card rounded-0 shadow">
          <div className="mt-3">
            {message && message.map((item, index) => <TopicRow {...item} key={index} />)}
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col card rounded-0 shadow">
          <div className="mt-3">
            <BarChart
              width={1200}
              height={350}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="zhiwei" type="category" />
              <YAxis type="number" />
              <Bar dataKey="count" fill="#FCC802" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

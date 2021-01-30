import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import { RecruitmentRow1 } from '../components/DataRow';
import ToBack from '../components/ToBack';

const Enterprise = () => {
  const [data, setData] = useState({});

  const [list, setList] = useState([]);

  const { id } = useParams();

  const { search } = useLocation();

  const [flag, setFlag] = useState(true);

  useEffect(() => {
    fetch(`./api/enterprise/${id}${search}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          setData(res.content);
        }
      });
    fetch(`./api/recruitment/enterprise/${id}${search}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          setList(res.content);
        }
      });
  }, [id, search]);

  const divShow = () => {
    setFlag(false);
    document.getElementById('btnshow').style.display = 'block';
    document.getElementById('btnhref').innerHTML = '收起全文';
  };
  const divhidden = () => {
    setFlag(true);
    document.getElementById('btnshow').style.display = '-webkit-box';
    document.getElementById('btnhref').innerHTML = '展示全文';
  };

  return (
    <div className="container-fluid" style={{ fontSize: 14 }}>
      <div className="card border-0 shadow mt-2">
        <ToBack report dataType="企业" dataId={id} search={search} />
        <div className="card-body">
          <div className="row mt-2">
            <div className="col">
              <div className="row">
                <div className="col">
                  <h5 className="pull-left">{data.name}</h5>
                  <a
                    className="pull-right text-success"
                    href={`#消息/${data.name}/${data.ent_user_id}`}
                  >
                    <FontAwesomeIcon icon={faComments} fixedWidth />
                    咨询
                  </a>
                </div>
              </div>
              <span className="text-muted">
                {data.zhuziguimo} |{data.yuangongshuliang}
              </span>
              <br />
              <span className="text-muted">
                {data.address1}-{data.address2}-{data.address3}
              </span>
              <br />
              <span className="text-muted">
                详细地址:
                {data.address4}
              </span>
              <br />
              <span id="btnshow" className="text-muted intro-text">
                企业简介：
                {data.intro}
              </span>
              {flag === true ? (
                <p id="btnhref" className="pull-right text-danger" onClick={divShow}>
                  展开全文
                </p>
              ) : (
                <p id="btnhref" className="pull-right text-danger" onClick={divhidden}>
                  收起全文
                </p>
              )}
            </div>
          </div>
          <hr />
          <div className="row mt-2">
            <div className="col">
              <h6>在招职位</h6>
            </div>
          </div>
          {list && list.map((item) => <RecruitmentRow1 key={item.id} {...item} />)}
        </div>
      </div>
    </div>
  );
};

export default Enterprise;

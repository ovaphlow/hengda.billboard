import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { _BrowseJournal } from '../commonFetch';
import ToBack from '../components/ToBack';

const Details = () => {
  const { id } = useParams();

  const [item, setItem] = useState(0);

  const [entList, setEntList] = useState([]);

  const [recruitmentList, setRecruitmentList] = useState([]);

  useEffect(() => {
    fetch(`./api/job-fair/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          if (res.content.status === '停用') {
            window.alert('招聘会已结束');
            window.history.go(-1);
            return;
          }
          setItem(res.content);
          document.getElementById('content').innerHTML = res.content.content;
          _BrowseJournal(
            {
              data_id: id,
              data_uuid: '',
              category: '招聘会',
            },
            () => {},
          );
        } else {
          alert(res.message);
        }
      });
    fetch(`./api/enterprise/job-fair/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          setEntList(res.content);
        } else {
          alert(res.message);
        }
      });
    fetch(`./api/recruitment/job-fair/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          setRecruitmentList(res.content);
        } else {
          alert(res.message);
        }
      });
  }, [id]);

  return (
    <div className="container-fluid">
      <div className="card border-0 shadow my-2">
        <ToBack href="#招聘会" />
        <div className="card-header bg-transparent mx-auto">
          <h5>{item.title}</h5>
        </div>
        <div className="card-body">
          <div id="content"></div>
        </div>
      </div>
      <div className="card border-0 shadow my-2">
        <div className="row text-center py-2">
          <div className="col">
            参会企业
            <h5 className="text-danger">{entList.length}家</h5>
          </div>
          <div className="col">
            参会岗位
            <h5 className="text-success">{recruitmentList.length}个</h5>
          </div>
        </div>
      </div>
      {entList &&
        entList.map((item) => (
          <div className="card border-0 shadow my-2" key={item.id}>
            <div className="card-header py-2 bg-transparent ">
              <h6 className="m-0">{item.name}</h6>
            </div>
            <div className="card-body py-2" style={{ fontSize: 15 }}>
              {recruitmentList
                .filter((it) => it.enterprise_uuid === item.uuid && it.enterprise_id === item.id)
                .map((it) => (
                  <p key={it.id} className="my-2 pb-3">
                    <a href={`#/岗位/${it.id}?u_id=${it.uuid}`}>{it.name}</a>&nbsp;
                    {!it.salary1 && !it.salary1 ? (
                      <span className="text-danger float-right">面议</span>
                    ) : (
                      <span className="text-danger float-right">
                        ￥{it.salary1}-￥{it.salary2}
                      </span>
                    )}
                  </p>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Details;

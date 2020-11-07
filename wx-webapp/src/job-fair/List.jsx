import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';


const RecruitRow = ({ id, title, datime }) => (
  <>
    <div className="card border-0 mt-3 shadow">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <a href={`#/招聘会/${id}`} style={{ color: '#202529', textDecoration: 'none' }}>
              <div className="pull-left">
                <strong>{title}</strong>
              </div>
              <div className="pull-right">
                <span style={{ color: '#007dff' }}>
                  详情
                  <FontAwesomeIcon icon={faChevronCircleRight} size="lg" fixedWidth />
                </span>
              </div>
              <br />
              <span className="text-muted">
                开始时间:
                {datime}
              </span>
              <br />
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
);

RecruitRow.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  datime: PropTypes.string.isRequired,
};

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    document.title = '招聘会';
    fetch('./api/job-fair/', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          setList(res.content);
        } else {
          alert(res.message);
        }
      });
  }, []);

  return (
    <>
      <div className="container-fluid">
        {list.length === 0 ? (
          <div className="chat-login">
            <h6>近期还没有线上招聘会</h6>
          </div>
        ) : (
          <div>{list && list.map((item) => <RecruitRow key={item.id} {...item} />)}</div>
        )}
      </div>
      <Navbar category="校园招聘" />
    </>
  );
};

export default List;

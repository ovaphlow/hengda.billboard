import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
// import Title from '../components/Title'
import Navbar from '../components/Navbar';
import PlayImg from '../components/PlayImg';
import TextCheckbox from '../components/Button';
import CityDropdowns from '../components/CityDropdowns';

const RecruitRow = ({
  id,
  uuid,
  title,
  address_level2,
  address_level3,
  date,
  school,
  category,
}) => (
  <>
    <div className="row">
      <div className="col">
        <div className="pull-left">
          <strong>{title}</strong>
        </div>
        <div className="pull-right">
          <a href={`#/校园招聘/${id}?u_id=${uuid}`}>
            详情
            <FontAwesomeIcon icon={faChevronCircleRight} size="lg" fixedWidth />
          </a>
        </div>
        <br />
        <span className="text-muted">
          举办地点:
          {`${address_level2}-${address_level3}`}
        </span>
        <br />
        <span className="text-muted">
          开始时间:
          {date}
        </span>
        <br />
        <span>
          {school}({category})
        </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
  </>
);

RecruitRow.propTypes = {
  id: PropTypes.number.isRequired,
  uuid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  address_level2: PropTypes.string.isRequired,
  address_level3: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  school: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

const List = () => {
  const [types, setTypes] = useState({});

  const [list, setList] = useState([]);

  const [city, setCity] = useState('');

  useEffect(() => {
    document.title = '校园招聘';
    fetch('./api/campus/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
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

  const search = (param) => {
    fetch('./api/campus/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          setList(res.content);
        } else {
          alert(res.message);
        }
      });
  };

  const _onCheckboxChange = ({ name, checked }) => {
    search({
      city,
      ...types,
      [name]: checked,
    });
    setTypes((p) => ({
      ...p,
      [name]: checked,
    }));
  };

  const handleChange = (val) => {
    search({
      city: val,
      ...types,
    });
    setCity(val);
  };

  return (
    <>
      <div className="container-fluid">
        {/* <Title category="校园招聘" /> */}
        <PlayImg category="小程序-校园招聘" />
        <div className="card border-0 mt-2 shadow">
          <div className="card-body">
            <div className="row mb-3" style={{ fontSize: 14 }}>
              <div className="col">
                <CityDropdowns handleChange={handleChange} />
              </div>
              <div className="col">
                <div className="pull-right text-primary">
                  <TextCheckbox value="宣讲会" name="category1" onChange={_onCheckboxChange}>
                    宣讲会
                  </TextCheckbox>
                  <TextCheckbox value="双选会" name="category2" onChange={_onCheckboxChange}>
                    双选会
                  </TextCheckbox>
                </div>
              </div>
            </div>
            {list && list.map((item) => <RecruitRow key={item.id} {...item} />)}
          </div>
        </div>
      </div>
      <Navbar category="校园招聘" />
    </>
  );
};

export default List;
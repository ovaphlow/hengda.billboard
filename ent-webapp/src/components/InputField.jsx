import React, { useState, useEffect } from 'react';
import moment from 'moment';

import PropTypes from 'prop-types';

export const TextField = ({ required, category, id, name, value, handleChange, req }) => (
  <div className="form-group">
    <label>
      <span className="text-danger">{required ? '*' : ''}</span>
      {category}
    </label>
    <input
      type="text"
      id={id}
      name={name}
      value={value || ''}
      onChange={handleChange}
      className={`form-control form-control-sm rounded-0 ${req ? 'is-invalid' : ''}`}
    />
    <div className="invalid-feedback">{req || ''}</div>
  </div>
);

TextField.propTypes = {
  required: PropTypes.number,
  category: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  req: PropTypes.string,
};

TextField.defaultProps = {
  required: undefined,
  id: undefined,
  req: undefined,
  value: undefined,
};

export const SelectField = ({
  required,
  category,
  id,
  name,
  value,
  handleChange,
  req,
  children,
}) => (
  <div className="form-group">
    <label>
      <span className="text-danger">{required ? '*' : ''}</span>
      {category}
    </label>
    <select
      type="text"
      id={id}
      name={name}
      value={value || ''}
      onChange={handleChange}
      className={`form-control form-control-sm rounded-0 ${req ? 'is-invalid' : ''}`}
    >
      {children}
    </select>
    <div className="invalid-feedback">{req}</div>
  </div>
);

SelectField.propTypes = {
  required: PropTypes.number,
  category: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
  req: PropTypes.string,
};

SelectField.defaultProps = {
  required: undefined,
  id: undefined,
  req: undefined,
  value: undefined,
};

export const DateField = ({ category, id, name, value, handleChange }) => (
  <div className="form-group">
    <label>{category}</label>
    <input
      type="date"
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      className="form-control form-control-sm rounded-0"
    />
  </div>
);

DateField.propTypes = {
  category: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

DateField.defaultProps = {
  id: undefined,
};
export const IndustryField = (props) => {
  const [industry, setIndustry] = useState([]);

  const [position, setPosition] = useState([]);

  const { industry: industry1, position: position1, handleChange } = props;

  useEffect(() => {
    const _industry = JSON.parse(localStorage.getItem('industry'));
    const fun = () => {
      fetch('./api/common-data/hangye/')
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            localStorage.setItem(
              'industry',
              JSON.stringify({
                date: parseInt(moment().add(7, 'days').format('YYYYMMDD'), 10),
                data: res.content,
              }),
            );
            setIndustry(() => res.content);
          }
        });
    };

    if (_industry !== null) {
      if (_industry.date - moment().format('YYYYMMDD') < 1) {
        fun();
      } else {
        setIndustry(() => _industry.data);
      }
    } else {
      fun();
    }
  }, []);

  useEffect(() => {
    if (industry.length > 0) {
      if (props.industry && props.industry !== '') {
        let master = industry.find((item) => item.name === props.industry);
        if (!master) {
          [master] = industry;
          props.handleChange({
            target: {
              name: 'industry',
              value: industry[0].name,
            },
          });
        }
        const _position = industry.filter((item) => item.master_id === master.id);
        setPosition(_position);
      } else {
        const _position = industry.filter((item) => item.master_id === industry[0].id);
        setPosition(_position);
        props.handleChange({
          target: {
            name: 'industry',
            value: industry[0].name,
          },
        });
      }
    }
  }, [industry, props]);

  useEffect(() => {
    if (position.length > 0) {
      if (props.position && props.position !== '') {
        if (!position.find((item) => item.name === props.position)) {
          props.handleChange({
            target: {
              name: 'position',
              value: position[0].name,
            },
          });
        }
      } else {
        props.handleChange({
          target: {
            name: 'position',
            value: position[0].name,
          },
        });
      }
    }
  }, [position, props]);

  const handleIndustry = (e) => {
    const { value, name } = e.target;
    const _position = industry.filter(
      (item) => item.master_id === industry.find((it) => it.name === value).id,
    );
    setPosition(_position);
    props.handleChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <>
      <div className="col">
        <SelectField
          category="所属行业"
          name="industry"
          value={industry1}
          handleChange={handleIndustry}
        >
          {industry &&
            industry
              .filter((item) => item.master_id === 0)
              .map((item) => <option key={item.id}>{item.name}</option>)}
        </SelectField>
      </div>
      <div className="col">
        <SelectField
          category="所属职位"
          name="position"
          value={position1}
          handleChange={handleChange}
        >
          {position.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </SelectField>
      </div>
    </>
  );
};

IndustryField.propTypes = {
  industry: PropTypes.string.isRequired,
  position: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

IndustryField.defaultProps = {
  position: undefined,
};

export const IndustrySearchField = (props) => {
  const [industry, setIndustry] = useState([]);

  const [position, setPosition] = useState([]);
  const { industry: industry1, position: position1, handleChange } = props;

  useEffect(() => {
    const _industry = JSON.parse(localStorage.getItem('industry'));
    const fun = () => {
      fetch('./api/common-data/hangye/')
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            localStorage.setItem(
              'industry',
              JSON.stringify({
                date: parseInt(moment().add(7, 'days').format('YYYYMMDD'), 10),
                data: res.content,
              }),
            );
            setIndustry(() => res.content);
          }
        });
    };

    if (_industry !== null) {
      if (_industry.date - moment().format('YYYYMMDD') < 1) {
        fun();
      } else {
        setIndustry(() => _industry.data);
      }
    } else {
      fun();
    }
  }, []);

  const handleIndustry = (e) => {
    const { value, name } = e.target;
    if (value === '') {
      setPosition([]);
    } else {
      setPosition(
        industry.filter((item) => item.master_id === industry.find((it) => it.name === value).id),
      );
    }
    props.handleChange({
      target: {
        name,
        value,
      },
    });
    props.handleChange({
      target: {
        name: 'qiwangzhiwei',
        value: '',
      },
    });
  };

  return (
    <>
      <div className="col">
        <SelectField
          category="期望行业"
          name="qiwanghangye"
          value={industry1}
          handleChange={handleIndustry}
        >
          <option> </option>
          {industry &&
            industry
              .filter((item) => item.master_id === 0)
              .map((item) => <option key={item.id}>{item.name}</option>)}
        </SelectField>
      </div>
      <div className="col">
        <SelectField
          category="期望职位"
          name="qiwangzhiwei"
          value={position1}
          handleChange={handleChange}
        >
          <option> </option>
          {position.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </SelectField>
      </div>
    </>
  );
};

IndustrySearchField.propTypes = {
  industry: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

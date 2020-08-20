import React from 'react';
import PropTypes from 'prop-types';

export function InputField({ category, name, value, placeholder, handleChange }) {
  return (
    <div className="form-group row input-label">
      <label className="col-4 col-form-label text-right text-muted">{category}</label>
      <div className="col-8">
        <input
          type="text"
          name={name}
          value={value || ''}
          placeholder={placeholder}
          className="form-control-plaintext input-f"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

InputField.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
};

InputField.defaultProps = {
  name: '',
  value: undefined,
  placeholder: '',
  handleChange: () => {},
};

export function SelectField({ category, name, value, handleChange, children }) {
  return (
    <div className="form-group row input-label">
      <label className="col-4 col-form-label text-right text-muted">{category}</label>
      <div className="col-8">
        <select
          type="text"
          name={name}
          value={value || ''}
          className=" form-control-plaintext input-f"
          onChange={handleChange}
        >
          {children}
        </select>
      </div>
    </div>
  );
}

SelectField.propTypes = {
  category: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.any),
  handleChange: PropTypes.func,
};

SelectField.defaultProps = {
  name: '',
  value: undefined,
  category: undefined,
  children: [],
  handleChange: () => {},
};

export function JournalTabs({ category }) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          className={`nav-link pl-2 pr-2 ${category === '浏览' && 'active'} `}
          href="#我的/记录/浏览"
        >
          浏览
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link pl-2 pr-2 ${category === '登录' && 'active'} `}
          href="#我的/记录/登录"
        >
          登录
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link pl-2 pr-2 ${category === '编辑' && 'active'} `}
          href="#我的/记录/编辑"
        >
          编辑
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link pl-2 pr-2 ${category === '举报' && 'active'} `}
          href="#我的/记录/举报"
        >
          举报
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link pl-2 pr-2 ${category === '反馈/投诉' && 'active'} `}
          href="#我的/记录/投诉"
        >
          反馈/投诉
        </a>
      </li>
    </ul>
  );
}

JournalTabs.propTypes = {
  category: PropTypes.string.isRequired,
};

export function DateTitle({ text }) {
  return (
    <div style={{ borderLeft: '.25rem solid#007bff', fontSize: 13 }}>
      <span>{text}</span>
    </div>
  );
}

DateTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TextCheckbox = (props) => {
  const [checked, setChecked] = useState(false);

  const [children, setChildren] = useState('');

  const [textColor, setTextColor] = useState('text-secondary');

  useEffect(() => {
    if (props.checked) setChecked(props.checked);
    if (props.children) setChildren(props.children);
  }, [props]);

  useEffect(() => {
    setTextColor(`pl-1 pr-1 ${checked ? 'text-success bg-light' : 'text-secondary'}`);
  }, [checked]);

  const changeChecked = () => {
    if (props.onChange) {
      props.onChange({
        name: props.name,
        checked: !checked,
      });
    }
    setChecked(!checked);
  };

  return (
    <span onClick={changeChecked} className={textColor} aria-hidden="true">
      {children}
    </span>
  );
};

TextCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default TextCheckbox;

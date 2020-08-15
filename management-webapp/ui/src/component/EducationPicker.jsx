import React from "react";
import PropTypes from "prop-types";

import { EDUCATION } from "../constant";

export default function EducationPicker({ caption, value, onChange }) {
  return (
    <div className="mb-3">
      <label className="form-label">{caption || "学历"}</label>
      <select
        value={value}
        className="form-control input-underscore"
        onChange={onChange}
      >
        <option value="">未选择</option>
        {EDUCATION.map((it) => (
          <option key={EDUCATION.indexOf(it)} value={it}>
            {it}
          </option>
        ))}
      </select>
    </div>
  );
}

EducationPicker.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

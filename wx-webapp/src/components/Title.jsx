import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ category }) => (
  <div className="row">
    <span className="text-dark p-2" style={{ fontSize: 13 }}>
        &nbsp;
      {category}
    </span>
  </div>
);

Title.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Title;

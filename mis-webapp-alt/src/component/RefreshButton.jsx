import React from 'react';
import PropTypes from 'prop-types';

export default function RefreshButton({ caption }) {
  return (
    <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.reload(true)}>
      <i className="fa fa-fw fa-refresh" />
      {caption || '刷新'}
    </button>
  );
}

RefreshButton.propTypes = {
  caption: PropTypes.string.isRequired,
};

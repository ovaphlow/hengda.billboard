import React from 'react';

export default function RefreshButton(props) {
  const { caption } = props;

  return (
    <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.reload(true)}>
      <i className="fa fa-fw fa-refresh" />
      {caption || '刷新'}
    </button>
  );
}

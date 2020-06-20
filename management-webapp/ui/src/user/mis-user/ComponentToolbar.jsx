import React from 'react';

export default function ComponentToolbar() {
  return (
    <div className="mb-2">
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={() => { window.location = '#/平台用户/新增'; }}
        >
          <i className="fa fa-fw fa-plus" />
          新增
        </button>
      </div>

      <div className="btn-group pull-right">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => { window.location = '#/平台用户'; }}
        >
          <i className="fa fa-fw fa-list" />
          列表
        </button>
      </div>
    </div>
  );
}

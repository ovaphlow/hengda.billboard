import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import IconLink from '../icon/Link';

export default function ComponentEnterpriseUserFavoriteList({ user_id }) {
  const [list, setList] = useState([]);

  const handleRedirect2Resource = async (event) => {
    const cat = event.target.getAttribute('data-category');
    const id = event.target.getAttribute('data-id');
    const uuid = event.target.getAttribute('data-uuid');
    if (cat === '简历') {
      window.location = `resume.html#/${id}?uuid=${uuid}`;
    } else {
      window.alert('未知类型，解析失败。');
    }
  };

  useEffect(() => {
    (async () => {
      const response = await window.fetch(`/api/favorite/enterprise-user/?user_id=${user_id}`);
      const res = await response.json();
      setList(res.content);
    })();
  }, []);

  return (
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th className="text-right">序号</th>
          <th>类别</th>
          <th>时间</th>
          <th>内容</th>
        </tr>
      </thead>

      <tbody>
        {list.map((it) => (
          <tr key={it.id}>
            <td>
              <span className="float-right">{it.id}</span>
            </td>
            <td>{it.category2}</td>
            <td>
              {moment(it.datime).format('YYYY-MM-DD')}
              &nbsp;
              <span className="text-muted">{moment(it.datime).format('HH:mm:ss')}</span>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-info btn-sm"
                data-id={it.data_id}
                data-uuid={it.data_uuid}
                data-category={it.category2}
                onClick={handleRedirect2Resource}
              >
                <IconLink />
                查看
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ComponentEnterpriseUserFavoriteList.propTypes = {
  user_id: PropTypes.string.isRequired,
};

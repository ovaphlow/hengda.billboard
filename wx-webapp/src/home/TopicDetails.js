import React, { useState, useEffect } from 'react';

import { useLocation, useParams } from 'react-router-dom';
import ToBack from '../components/ToBack';
import { _BrowseJournal } from '../commonFetch';

const TopicDetails = () => {
  const { search } = useLocation();

  const { id } = useParams();

  const [item, setItem] = useState(0);

  useEffect(() => {
    fetch(`./api/topic/${id}${search}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          _BrowseJournal({
            data_id: id,
            data_uuid: res.content.uuid,
            category: '热门话题',
          }, (res) => {});
          setItem(res.content);
        }
      });
  }, [id, search]);

  return item === 0 ? (
    <div className="container-fluid">
      <ToBack />
    </div>
  ) : (
    <div className="container-fluid">
      <ToBack category={item.title} />
      <div className="row mt-2" style={{ fontSize: 14 }}>
        <div className="col editor-body" dangerouslySetInnerHTML={{ __html: item.content }} />
      </div>
    </div>
  );
};

export default TopicDetails;

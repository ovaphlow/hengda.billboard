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
          _BrowseJournal(
            {
              data_id: id,
              data_uuid: res.content.uuid,
              category: '热门话题',
            },
            () => {},
          );
          setItem(res.content);
          if (document.getElementById('content') !== null) {
            document.getElementById('content').innerHTML = res.content.content;
          }
        }
      });
    return () => {};
  }, [id, search]);

  return (
    <div className="container-fluid">
      <div className="card border-0 shadow interface-bottom">
        <div className="card-body">
          <ToBack category={item.title} />
          <h6 className="text-center">{item.title}</h6>
          <div className="row" style={{ fontSize: 14 }}>
            <div className="col editor-body" id="content" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetails;

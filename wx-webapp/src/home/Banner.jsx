import React, { useState, useEffect } from 'react';

import { useLocation, useParams } from 'react-router-dom';
import ToBack from '../components/ToBack';

const TopicDetails = () => {
  const { search } = useLocation();

  const { id } = useParams();

  const [item, setItem] = useState(0);

  useEffect(() => {
    fetch(`./api/banner/detail/${id}${search}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          setItem(res.content);
          if (document.getElementById('editor-body') !== null) {
            document.getElementById('editor-body').innerHTML = res.content.comment;
          }
        }
      });
  }, [id, search]);

  return item === 0 ? (
    <div className="container-fluid">
      <ToBack />
    </div>
  ) : (
    <div className="container-fluid">
      <div className="card border-0 shadow mt-2">
        <ToBack category={item.title} />
        <div className="card-body">
          <div className="row mt-2" style={{ fontSize: 14 }}>
            <div className="col editor-body" id="editor-body" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetails;

import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Topic = () => {
  const { id } = useParams();

  const { search } = useLocation();

  const [data, setData] = useState(0);

  useEffect(() => {
    fetch(`./api/topic/${id}${search}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          setData(res.content);
          document.getElementById('content').innerHTML = res.content.content;
        } else {
          window.alert(res.message);
        }
      });
  }, [id, search]);

  return (
    <div className="row px-5 mt-4">
      {data && (
        <div className="card col rounded-0 shadow px-4">
          <a href="#/">
            <h2 className="mt-4">
              <FontAwesomeIcon icon={faChevronLeft} size="lg" fixedWidth />
              {data.title}
            </h2>
          </a>
          <hr />
          <div id="content" className="px-5" />
        </div>
      )}
    </div>
  );
};

export default Topic;

import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Banner = () => {
  const { id } = useParams();

  const { search } = useLocation();

  const [data, setData] = useState(0);

  useEffect(() => {
    fetch(`./api/banner/detail/${id}${search}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          setData(res.content);
          document.getElementById('comment').innerHTML = res.content.comment;
        } else {
          window.alert(res.message);
        }
      });
  }, [id, search]);

  return (
    <div className="mt-4">
      <div className="row px-5">
        {data && (
          <div className="card col rounded-0 shadow px-4">
            <a href="#/">
              <h2 className="mt-4">
                <FontAwesomeIcon icon={faChevronLeft} size="lg" fixedWidth />
                {data.title}
              </h2>
            </a>
            <hr />
            <div className="px-5" id="comment" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;

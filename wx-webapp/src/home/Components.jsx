import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const RecommendRow = ({
  title, address_level1, address_level2, qty, id, uuid, publisher,
}) => (
  <>
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col text-hidden">
            <strong>{title}</strong>
          </div>
        </div>
        <span className="text-muted pull-left">
          工作地点:
          {address_level1}
          -
          {address_level2}
          {' '}
          | 人数:
          {qty}
        </span>
        <div className="pull-right ">
          <a href={`#主页/消息详情/${id}?u_id=${uuid}`} style={{ color: '#00a4ff' }}>
            <FontAwesomeIcon icon={faChevronCircleRight} size="lg" fixedWidth />
          </a>
        </div>
        <br />
        <span>
          {publisher}
        </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
  </>
);

RecommendRow.propTypes = {
  title: PropTypes.string.isRequired,
  address_level1: PropTypes.string.isRequired,
  address_level2: PropTypes.string.isRequired,
  qty: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export const TopicCards = (props) => {
  const [list, setList] = useState([]);

  const [index, setIndex] = useState(0);

  const toDetails = (it) => {
    window.location = `#主页/话题详情/${it.id}?u_id=${it.uuid}`;
  };

  useEffect(() => {
    if (props.list) {
      const data = [];
      const colors = [
        'bg-info',
        'bg-success',
        'bg-primary',
        'bg-warning',
        'bg-danger',
        'bg-secondary',
      ];
      let colorInx = 0;
      props.list.forEach((item, inx) => {
        item.color = colors[colorInx];
        if (colorInx < 5) {
          colorInx += 1;
        } else {
          colorInx = 0;
        }
        if (inx % 3 === 0) {
          data.push([item]);
        } else {
          const d = data[data.length - 1];
          d.push(item);
          data[data.length - 1] = d;
        }
      });
      setList(data);
    }
  }, [props]);

  return (
    <AutoPlaySwipeableViews index={index} onChangeIndex={setIndex}>
      {
        list.map((item) => (
          <div key={item[0].id} className="row mx-0 mt-2 text-center" style={{ fontSize: 11 }}>
            {item.map((it) => (
              <div
                key={it.id}
                aria-hidden="true"
                onClick={() => toDetails(it)}
                className={`col${item.length < 3 ? '-4' : ''} ${it.color} text-light mx-1 topic-card`}
              >
                <span>{it.title}</span>
              </div>
            ))}
          </div>
        ))
      }
    </AutoPlaySwipeableViews>
  );
};

TopicCards.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any),
};

TopicCards.defaultProps = {
  list: [],
};

import React, { useState, useEffect } from 'react';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Pagination = (props) => {
  const handleClick = (event, index) => {
    props.onChangeIndex(index);
  };

  const children = () => {
    const { index, dots } = props;

    const list = [];

    for (let i = 0; i < dots; i += 1) {
      list.push(<PaginationDot key={i} index={i} active={i === index} onClick={handleClick} />);
    }
    return list;
  };
  return <div className="pagination">{children()}</div>;
};

Pagination.propTypes = {
  dots: PropTypes.number.isRequired,
  index: PropTypes.number,
  onChangeIndex: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  index: undefined,
};

const PaginationDot = (props) => {
  const { active } = props;

  const styles = {
    root: {
      height: 18,
      width: 18,
      cursor: 'pointer',
      border: 0,
      background: 'none',
      padding: 0,
    },
    dot: {
      backgroundColor: '#e4e6e7',
      height: 12,
      width: 12,
      borderRadius: 6,
      margin: 3,
    },
    active: {
      backgroundColor: '#319fd6',
    },
  };

  const handleClick = (event) => {
    props.onClick(event, props.index);
  };

  return (
    <button type="button" style={styles.root} onClick={handleClick}>
      <div style={active ? { ...styles.dot, ...styles.active } : styles.dot} />
    </button>
  );
};

PaginationDot.propTypes = {
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

const AutoCards = (props) => {
  const { category } = props;
  const [index, setIndex] = useState(0);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (category) {
      fetch(`./api/banner/${category}/`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            setList(res.content);
          }
        });
    }
  }, [category]);

  const handleChangeIndex = () => {
    setIndex();
  };

  return (
    <div className="row img-box">
      {list && list.length > 0 && (
        <AutoPlaySwipeableViews
          style={{ objectFit: 'cover' }}
          index={index}
          onChangeIndex={handleChangeIndex}
        >
          {list.map((item) => (
            <div key={item.id}>
              <a
                href={
                  item.source_url ? item.source_url : `#首页/banner/${item.id}?uuid=${item.uuid}`
                }
              >
                <img className="img-fluid img-box-item" alt="" src={item.data_url} />
              </a>
            </div>
          ))}
        </AutoPlaySwipeableViews>
      )}
      <Pagination dots={list.length} index={index} onChangeIndex={handleChangeIndex} />
    </div>
  );
};

AutoCards.propTypes = {
  category: PropTypes.string.isRequired,
};

export default AutoCards;

import React, { useState } from 'react'

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)




const Pagination = props => {

  const handleClick = (event, index) => {
    props.onChangeIndex(index);
  }

  const children = () => {
    const { index, dots } = props

    const list = [];

    for (let i = 0; i < dots; i += 1) {
      list.push(
        <PaginationDot key={i} index={i} active={i === index} onClick={handleClick} />,
      )
    }
    return list
  }
  return (<div className="pagination">{children()}</div>)
}

Pagination.propTypes = {
  dots: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onChangeIndex: PropTypes.func.isRequired,
}


const PaginationDot = props => {


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
  }

  const handleClick = event => {
    props.onClick(event, props.index);
  };

  return (
    <button type="button" style={styles.root} onClick={handleClick}>
      <div style={props.active?Object.assign({}, styles.dot, styles.active):styles.dot } />
    </button>
  )

  
}

PaginationDot.propTypes = {
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}


const PlayImg = () => {

  const [index, setIndex] = useState(0)

  const handleChangeIndex = index => {
    setIndex(index)
  }


  return (
    <div className="row img-box" >
      <AutoPlaySwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        <div>
          <img className="img-fluid img-box-item" alt="" src="lib/img/u1.png">
          </img>
        </div>
        <div>
          <img className="img-fluid img-box-item" alt="" src="lib/img/u2.png">
          </img>
        </div>
        <div>
          <img className="img-fluid img-box-item" alt="" src="lib/img/u3.png">
          </img>
        </div>
      </AutoPlaySwipeableViews>
      <Pagination dots={3} index={index} onChangeIndex={handleChangeIndex} />
    </div>
  )
}

export default PlayImg
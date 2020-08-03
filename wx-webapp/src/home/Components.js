import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

export const RecommendRow = props => (
  <>
    <div className="row" >
      <div className="col">
        <div className="row">
          <div className="col text-hidden">
            <strong>{props.title}</strong>
          </div>
        </div>
        <span className="text-muted pull-left">
          工作地点:{props.address_level1}-{props.address_level2} | 人数:{props.qty}
        </span>
        <div className="pull-right ">
          <a href={`#主页/消息详情/${props.id}?u_id=${props.uuid}`} style={{ color: '#00a4ff' }}>
            <FontAwesomeIcon icon={faChevronCircleRight} size='lg' fixedWidth />
          </a>
        </div>
        <br></br>
        <span>
          {props.publisher}
        </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
  </>
)


export const TopicCards = props => {

  const [list, setList] = useState([])

  const [index, setIndex] = useState(0)

  const handleChangeIndex = index => {
    setIndex(index)
  }

  const toDetails = it => {
    window.location = `#主页/话题详情/${it.id}?u_id=${it.uuid}`
  }

  useEffect(() => {
    if (props.list) {
      const data = []
      const colors = [
        'bg-info',
        'bg-success',
        'bg-primary',
        'bg-warning',
        'bg-danger',
        'bg-secondary',
      ]
      let colorInx = 0
      props.list.forEach((item, inx) => {
        item.color = colors[colorInx]
        if (colorInx < 5) {
          colorInx += 1
        } else {
          colorInx = 0
        }
        if (inx % 3 === 0) {
          data.push([item])
        } else {
          const d = data[data.length - 1]
          d.push(item)
          data[data.length - 1] = d
        }
      })
      setList(data)
    }
  }, [props.list])

  return (
    <AutoPlaySwipeableViews index={index} onChangeIndex={handleChangeIndex} >
      {
        list.map((item, inx) => (
          <div key={inx} className="row mx-0 mt-2 text-center" style={{ fontSize: 11 }}>
            {item.map((it, i) => (
              <div key={i} onClick={() => toDetails(it)}
                className={`col${item.length < 3 ? '-4' : ''} ${it.color} text-light mx-1 topic-card`}>
                <span>{it.title}</span>
              </div>
            ))}
          </div>
        ))
      }
    </AutoPlaySwipeableViews>
  )
} 
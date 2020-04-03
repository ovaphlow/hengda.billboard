import React, { useEffect, useState } from 'react'


import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

export const RecommendRow = props => (
  <>
    <div className="row" style={{ fontSize: 11 }} >
      <div className="col">
        <div className="pull-left">
          <strong>{props.title}</strong>
        </div>
        <div className="pull-right">
          <a href={`#主页/消息详情/${props.id}?u_id=${props.uuid}`}>
            详情
          <i className="fa fa-fw fa-lg  fa-angle-right"></i>
          </a>
        </div>
        <br></br>
        <span className="text-muted">
          工作地点：{props.address_level1}-{props.address_level2} | 招聘人数: {props.qty}
        </span>
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
    window.location=`#主页/话题详情/${it.id}?u_id=${it.uuid}`
  }

  useEffect(() => {
    if (props.list) {
      const data = []
      const colors = [
        'bg-primary',
        'bg-secondary',
        'bg-success',
        'bg-danger',
        'bg-info',
        'bg-dark',
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
              <div key={i} onClick={() => toDetails(it)} className={`col${item.length < 3 ? '-4' : ''} ${it.color} text-light mx-1 flex-center rounded`}
                style={{ height: 50 }}>
                {it.title}
              </div>
            ))}
          </div>
        ))
      }
    </AutoPlaySwipeableViews>
  )
} 
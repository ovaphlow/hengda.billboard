import React, { useEffect, useState } from 'react'
import moment from 'moment'

const Title = () => {

  const [banner, setBanner] = useState(0)

  useEffect(() => {

    const file = JSON.parse(localStorage.getItem('title'))
    const fun = () => {
      fetch(`./api/banner/企业端-页头/`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            localStorage.setItem('title', JSON.stringify({
              date: parseInt(moment().add(7, 'days').format('YYYYMMDD')),
              banner: res.content
            }))
            if (res.content.length>0){
              setBanner(res.content[0])
            }
          }
        })
    }
    if (file === null) {
      fun()
    } else {
      if (file.date - moment().format('YYYYMMDD') < 1) {
        fun()
      } else {
        if (file.banner.length>0) {
          setBanner(file.banner[0])
        }
      }
    }
  }, [])

  return (
    <div className="row bg-white">
      <div className="col px-5 mt-2 mb-2">
        <img className="img-fluid pull-left logo" alt="" src={require('./img/logo.png')} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {
          banner!==0?(<img className="img-fluid ad" alt="" src={banner.data_url} />):(<></>)
        }
      </div>
    </div>
  )
}

export default Title

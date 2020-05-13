import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'

const Topic = () => {

  const { id } = useParams()

  const { search } = useLocation()

  const [data, setData] = useState(0)

  useEffect(() => {
    fetch(`./api/topic/${id}${search}`)
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setData(res.content)
        } else {
          window.alert(res.message)
        }
      })
  }, [id,search])


  return (
    <div className="mt-4" >
      <div className="row px-5">
        {data && (
          <div className="card col rounded-0 shadow px-4">
            <a href="#/">
              <h2 className="mt-4">
                <i className="fa fa-fw fa-chevron-left fa-lg"></i>
                {data.title}
              </h2>
            </a>
            <hr />
            <div className="px-5" dangerouslySetInnerHTML={{__html: data.content }}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default Topic
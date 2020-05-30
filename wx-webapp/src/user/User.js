import React, { useEffect, useState } from 'react'

// import Title from '../components/Title'
import Navbar from '../components/Navbar'

const User = () => {

  const [auth, setAuth] = useState(0)

  const [schedule, setSchedule] = useState(0)

  const [offer, setOffer] = useState(0)

  const [sys, setSys] = useState(0)

  useEffect(() => {
    document.title = '我的'
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth !== null) {
      setAuth(_auth)
      fetch(`./api/common-user-schedule/count/${_auth.id}`)
        .then(res => res.json())
        .then(res => {
          setSchedule(res.content)
        })

      fetch(`./api/offer/common/total/${_auth.id}`)
        .then(res => res.json())
        .then(res => {
          setOffer(res.content)
        })
    }
  }, [])

  return (
    <>
      <div className="container-fluid">
        {/* <Title category="我的" /> */}
        <div className="row ">
          {/* <div className="col-2">
            <img className="img-circle" style={{ height: 65 }} src="lib/img/u868.png" alt="" />
          </div> */}
          {
            auth === 0 ? (
              <div className="col mt-2">
                <h6>
                  <a href="#/登录" >
                    未登录
                  </a>
                </h6>
                <span className="text-muted">
                  你还没有创建简历,暂时无法投递
                </span>
              </div>
            ) : (
                <div className="col mt-2" >
                  <a href="#/我的/设置" >
                    <h6>{auth.name}</h6>
                  </a>
                  <span className="text-muted">
                    电话:{auth.phone}
                  </span><br />
                  <span className="text-muted">
                    邮箱:{auth.email}
                  </span>
                </div>
              )
          }
        </div>
        <hr />
        <div className="row pb-2 text-center" style={{ fontSize: 11 }}>
          <div className="col">
            <a href="#/我的/简历" className="text-muted">
              <i className="fa fa-fw fa-3x fa-file-text" aria-hidden="true"></i>
              <br />
              我的简历
            </a>
          </div>
          <div className="col">
            <a href="#/我的/投递" className="text-muted">
              <i className="fa fa-fw fa-3x fa-rss-square" aria-hidden="true"></i>
              <br />
              投递情况
            </a>
          </div>
          <div className="col">
            <a href="#/我的/记录/浏览" className="text-muted">
              <i className="fa fa-fw fa-3x fa-clock-o" aria-hidden="true"></i>
              <br />
              操作记录
            </a>
          </div>
          <div className="col">
            <a href="#/我的/收藏" className="text-muted">
              <i className="fa fa-fw fa-3x fa-star" aria-hidden="true"></i>
              <br />
              我的收藏
            </a>
          </div>
        </div>
        <div className="row" style={{ height: 7, backgroundColor: 'rgb(228, 238, 249)' }}>
        </div>
        {/* <div className="row p-2 mt-2" >
          <div className="col">
            <a className="text-dark" href="#/登录" >
              <h6 className="pull-left" >
                <strong>平台介绍</strong>
              </h6>
              <i className="fa fa-chevron-right fa-fw pull-right text-muted" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <hr style={{ marginTop: '0', marginBottom: '0' }} /> */}

        <div className="row p-2 mt-2" >
          <div className="col">
            <a className="text-dark" href="#/我的/日程" >
              <h6 className="pull-left" >
                <strong>日程</strong>
              </h6>
              <span className="pull-right text-muted">
                {
                  auth ? (schedule === 0 ? '' : `今天有${schedule}个日程`) : '提示即将进行的日程'
                }
                <i className="fa fa-chevron-right fa-fw " aria-hidden="true"></i>
              </span>
            </a>
          </div>
        </div>
        <hr style={{ marginTop: '0', marginBottom: '0' }} />
        <div className="row p-2 mt-2" >
          <div className="col">
            <a className="text-dark" href="#/我的/面试" >
              <h6 className="pull-left" >
                <strong>面试邀请</strong>
              </h6>
              <span className="pull-right text-muted">
                {
                  auth ? (offer === 0 ? '' : `您有${offer}个面试邀请未查看`) : ''
                }
                <i className="fa fa-chevron-right fa-fw " aria-hidden="true"></i>
              </span>
            </a>
          </div>
        </div>
        <hr style={{ marginTop: '0', marginBottom: '0' }} />
        <div className="row p-2 mt-2" >
          <div className="col">
            <a className="text-dark" href="#/我的/系统消息" >
              <h6 className="pull-left" >
                <strong>系统消息</strong>
              </h6>
              <span className="pull-right text-muted">
                {
                  auth ? (sys === 0 ? '' : `您有${sys}个系统消息未查看`) : ''
                }
                <i className="fa fa-chevron-right fa-fw " aria-hidden="true"></i>
              </span>
            </a>
          </div>
        </div>
        <hr style={{ marginTop: '0', marginBottom: '0' }} />
        <div className="row p-2 mt-2" >
          <div className="col">
            <a className="text-dark" href="#/我的/反馈" >
              <h6 className="pull-left" >
                <strong>反馈/投诉</strong>
              </h6>
              <i className="fa fa-chevron-right fa-fw pull-right text-muted" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <hr style={{ marginTop: '0', marginBottom: '0' }} />
        {
          auth === 0 || (
            <>
              <div className="row p-2 mt-2" >
                <div className="col">
                  <a className="text-dark" href="#/登录" >
                    <h6 className="pull-left text-danger" >
                      <strong>注销</strong>
                    </h6>
                    <i className="fa fa-chevron-right fa-fw pull-right text-muted" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
              <hr style={{ marginTop: '0', marginBottom: '0' }} />
            </>
          )
        }

      </div>
      <Navbar category="我的" />
    </>
  )
}

export default User
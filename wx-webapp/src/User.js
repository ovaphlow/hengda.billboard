import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Title from './components/Title'
import Navbar from './components/Navbar'

export default function UserRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path=""><Setting /></Route>
      </Switch>
    </Router>
  )
}

function Setting() {
  
  return (
    <>
      <div className="container-fluid">
        <Title category="我的" />
        <div className="row ">
          <div className="col-2 ">
            <img className="img-circle" style={{ height: 50 }} src="lib/img/u868.png" alt="" />
          </div>
          <div className="col">
            <h6>未登录</h6>
            <span className="text-muted">
              你还没有创建简历,暂时无法投递
            </span>

          </div>
        </div>
        <hr />
        <div className="row pb-2 text-center">
          <div className="col">
            <a href="#/" className="text-muted">
              <i className="fa fa-fw fa-3x fa-file-text" aria-hidden="true"></i>
              <br />
              我的简历
            </a>
          </div>
          <div className="col">
            <a href="#/" className="text-muted">
              <i className="fa fa-fw fa-3x fa-rss-square" aria-hidden="true"></i>
              <br />
              投递情况
            </a>
          </div>
          <div className="col">
            <a href="#/" className="text-muted">
              <i className="fa fa-fw fa-3x fa-clock-o" aria-hidden="true"></i>
              <br />
              历史记录
            </a>
          </div>
          <div className="col">
            <a href="#/" className="text-muted">
              <i className="fa fa-fw fa-3x fa-star" aria-hidden="true"></i>
              <br />
              我的收藏
            </a>
          </div>
        </div>
        <div className="row" style={{ height: 7, backgroundColor: 'rgb(228, 238, 249)' }}>
        </div>
        <div className="row p-2 mt-2" >
          <div className="col">
            <a className="text-dark" href="#/登录" >
              <h6 className="pull-left" >
                <strong>平台介绍</strong>
              </h6>
              <i className="fa fa-chevron-right fa-fw pull-right text-muted" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <hr style={{ marginTop: '0', marginBottom: '0' }} />
        <div className="row p-2 mt-2" >
          <div className="col">
            <a className="text-dark" href="#/登录" >
              <h6 className="pull-left" >
                <strong>日程</strong>
              </h6>
              <span className="pull-right text-muted">
                提示即将进行的日程
                <i className="fa fa-chevron-right fa-fw " aria-hidden="true"></i>     
              </span>
            </a>
          </div>
        </div>
        <hr style={{ marginTop: '0', marginBottom: '0' }} />
        <div className="row p-2 mt-2" >
          <div className="col">
            <a className="text-dark" href="#/登录" >
              <h6 className="pull-left" >
                <strong>意见反馈</strong>
              </h6>
              <i className="fa fa-chevron-right fa-fw pull-right text-muted" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <hr style={{ marginTop: '0', marginBottom: '0' }} />
      </div>
      <Navbar category="我的" />
    </>
  )
}
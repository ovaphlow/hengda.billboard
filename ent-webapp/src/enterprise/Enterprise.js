import React, { useEffect, useState } from 'react'

import { View } from './Components'

const Enterprise = () => {


  const [data, setData] = useState(0)

  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem('auth'))
    if (auth === null) {
      window.location = '#登录'
      return
    } else {
      fetch(`./api/enterprise/${auth.enterprise_id}?u_id=${auth.uuid}`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(window.message)
          } else {
            setData(res.content)
          }
        })
    }
  }, [])

  return (
    <View category="企业信息">
      <div className="row bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h3 className="pull-left">企业信息</h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col">
                    <h4 className="pull-left">
                      {data.name}({data.yingyezhizhao})&nbsp;
                      <span className="badge badge-secondary">
                      未认证
                      </span>
                    </h4>
                    <div className="pull-right">
                      <a href="#信息/编辑/">
                        <i className="fa fa-pencil-square-o"></i>
                        编辑
                      </a>
                    </div>
                  </div>
                </div>
                <span className="text-muted">
                  {data.faren && (<>法人:{data.faren}&nbsp;&nbsp;&nbsp;</>)}
                  {data.yuangongshuliang && (<>员工数量:{data.yuangongshuliang}&nbsp;&nbsp;&nbsp;</>)}
                  {data.zhuziguimo && (<>注资规模:{data.zhuziguimo}&nbsp;&nbsp;&nbsp;</>)}
                  {data.zhuceriqi && (<>注册日期:{data.zhuceriqi}</>)}
                </span><br />
                <span className="text-muted">
                  公司地址:
                  {data.address1 && (<>{data.address1}-</>)}
                  {data.address2 && (<>{data.address2}-</>)}
                  {data.address3 && (<>{data.address3}-</>)}
                  {data.address4 && (<>{data.address4}</>)}
                </span>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <h5>营业执照</h5>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <img className="w-50" alt=""  src={data.yingyezhizhao_tu} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </View>
  )
}

export default Enterprise


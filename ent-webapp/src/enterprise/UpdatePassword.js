import React, { useEffect, useState } from 'react'

import { View } from './Components'
import md5 from 'blueimp-md5'

const UpdatePassword = () => {

  const [data, setData] = useState({
    old_password: '',
    password1: '',
    password2: ''
  })


  const [err, setErr] = useState({
    old_password: '',
    password1: '',
    password2: ''
  })

  const [auth, setAuth] = useState(0)

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'))
    if (_auth != null) {
      setAuth(_auth)
    }
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async e => {
    const errData = {}

    Object.getOwnPropertyNames(data).forEach(key => {
      if (data[key].trim() === '') {
        errData[key] = '请填写内容'
      }
    })


    if (Object.getOwnPropertyNames(errData).length !== 0) {
      setErr(errData)
      console.info(errData)
      return
    }

    if (data.password1 !== data.password2) {
      setErr(p => ({
        password1: '请确认密码',
        password2: '请确认密码'
      }))

      return
    }
    const response = await fetch(`./api/ent-user/updatePassword/${auth.id}?u_id=${auth.uuid}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: auth.id,
        old_password: md5(data.old_password),
        password1: md5(data.password1)
      })
    })
    const res = await response.json()
    if (res.message) {
      let alertFlg = false
      if (typeof res.message === 'object') {
        Object.getOwnPropertyNames(res.message)
          .forEach(key => {
            switch (key) {
              case 'old_password':
                errData[key] = '密码错误!'
                break
              default:
                alertFlg = true
            }
          })
      } else {
        alertFlg = true
      }
      if (alertFlg) {
        window.alert(res.message)
      }
      setErr(errData)
      return
    } else {
      window.alert('操作成功,请重新登陆')
      window.location = "#登录"
    }
  }

  return (
    <View category="修改密码">
      <div className="row bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h3 className="pull-left">修改密码</h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col offset-3 col-lg-3 offset-lg-4">
                <form>
                  <div className="form-group">
                    <label>旧密码</label>
                    <input className="form-control rounded-0"
                      type="password"
                      placeholder="旧密码"
                      name="old_password"
                      autoComplete="off"
                      value={data.old_password}
                      onChange={handleChange} />
                    {err.old_password && <small className="form-text text-danger">{err.old_password}</small>}
                  </div>
                  <div className="form-group">
                    <label>新密码</label>
                    <input className="form-control rounded-0"
                      type="password"
                      placeholder="新密码"
                      name="password1"
                      autoComplete="off"
                      value={data.password1}
                      onChange={handleChange} />
                    {err.password1 && <small className="form-text text-danger">{err.password1}</small>}
                  </div>
                  <div className="form-group">
                    <label>确认密码</label>
                    <input className="form-control rounded-0"
                      type="password"
                      placeholder="确认密码"
                      name="password2"
                      autoComplete="off"
                      value={data.password2}
                      onChange={handleChange} />
                    {err.password2 && <small className="form-text text-danger">{err.password2}</small>}
                  </div>
                </form>
              </div>
              <div className="mt-2 offset-3 col-lg-3 offset-lg-4">
                <button className="w-100 btn btn-primary rounded-0"
                  type="button" onClick={handleUpdate}>
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </View>
  )


}

export default UpdatePassword
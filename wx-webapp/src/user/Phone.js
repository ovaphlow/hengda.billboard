import React, {useState,useEffect} from 'react'
import ToBack from '../components/ToBack'

const Phone = () => {

  const [auth, setAuth] = useState(0)

  const [phone, setPhone] = useState('')

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth !== null) {
      setAuth(_auth)
    } else {
      window.location = '#登录'
    }
  }, [])

  const checkPhone = () => {
    const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
    return reg.test(phone)
  }

  const handleSave = async e => {
    const response = await fetch(`/api/common-user/phone`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        auth:auth.id,
        phone: phone
      })
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    } else {
      const response2 = await fetch(`/api/common-user/${auth.id}`)
      const res2 = await response2.json()
      if (res.message) {
        window.alert(res.message)
        return
      } else {
        localStorage.setItem('auth', JSON.stringify(res2.content))
        window.location = '#/我的/简历'
      }
    }
  }


  return (
    <>
      <div className="container-fluid">
        <ToBack href='#我的' />
        <div className="row mt-3">
          <div className="col">
            
            <div className="form-group row">
              <div className="col">
                <input type="text"
                  name="phone"
                  value={phone}
                  className="input-control"
                  placeholder="电话号码"
                  onChange={(e)=>setPhone(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="form-group row">
              <div className="col">
                <input type="text" name="code" value={data.code}
                  className="input-control"
                  placeholder="验证码"
                  onChange={handleChange}
                />
              </div>
              <div className="col-4">
                <button className="btn rounded-0 btn-secondary btn-sm"
                  disabled={!checkEmail()} onClick={handleCode} >
                  发送验证码
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top">
        <div className="row text-center nav-row">
          <button disabled={!checkPhone()} className="btn btn-primary nav-btn" onClick={handleSave}>
            保存
        </button>
        </div>
      </ul>
    </>
  )
}

export default Phone
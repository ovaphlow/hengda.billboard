import React, {useEffect, useState} from 'react'
import moment from 'moment'
import { View } from './Components'
import { SelectField } from '../components/InputField'

const Feedback = () => {

  const [auth, setAuth] = useState(0)


  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'))
    if (_auth === null) {
      return
    }
    setAuth(_auth) 
  }, [])


  const handleSave = () => {
    const content = document.getElementById('content').value
    if (content === '') {
      window.alert('请填写内容')
      return
    }
    fetch(`./api/feedback/`,{
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        user_id: auth.id,
        user_category: '企业用户',
        content: content,
        datime: moment().format('YYYY-MM-DD HH:mm'),
        category:document.getElementById('category').value
      })
    })
    .then(res => res.json())
    .then(res =>{
      if (res.message) {
        window.alert(res.message)
      } else {
        window.alert('已提交到后台,我们将尽快处理')
      }
    })
  }


  return (
    <View category="投诉">
      <div className="row bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h3 className="pull-left">意见反馈/投诉</h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <SelectField
                  id="category"
                  className="form-control"
                  category="类别">
                  <option>意见反馈</option>
                  <option>内容投诉</option>
                </SelectField>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>说明</label>
                  <textarea
                    id="content"
                    cols={4}
                    className="form-control" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button className="btn btn-primary pull-right" onClick={handleSave}>
                  提交
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </View>
  )

}


export default Feedback
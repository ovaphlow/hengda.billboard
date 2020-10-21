import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { View } from './Components';
import { _EditJournal } from '../commonFetch';
//import { TextField, SelectField, DateField } from '../components/InputField';

const Update = () => {
  const [list, setList] = useState([]);

  const [auth, setAuth] = useState({});

  const [jobFair, setJobFair] = useState({});

  const [allFlg, setAllFlg] = useState(false)

  const { id } = useParams();

  //const [param, setParam] = useState({
  //  name: '',
  //  category: '',
  //  date: '',
  //  status: '',
  //  education: '',
  //});

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'));
    if (_auth !== null) {
      setAuth(_auth);
      fetch(`./api/job-fair/${id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            document.getElementById("content").innerHTML = res.content.content
            setJobFair(res.content);
          }
        });
      fetch(`./api/recruitment/enterprise/${_auth.enterprise_id}?u_id=${_auth.enterprise_uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          status:'在招'
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            let flg = res.content.length !== 0;
            res.content.forEach(item => {
              item.job_fair_id = item.job_fair_id ? JSON.parse(item.job_fair_id) : []
              if (!item.job_fair_id.find(it => id === it)) {
                flg = false;
              }
            })
            setAllFlg(flg);
            setList(res.content);
          }
        });
    }
  }, [id]);

  const handleSave = () => {
    const recruitment_id = [];
    document.getElementsByName('check').forEach((event) => {
      if (event.checked) {
        recruitment_id.push(event.value);
      }
    });
    fetch(`./api/job-fair/edit/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        job_fair_id:id,
        ent_id: auth.enterprise_id,
        ent_uuid: auth.enterprise_uuid,
        recruitment_id
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          _EditJournal(
            {
              category2: '招聘会',
              data_id: id,
              data_uuid: '',
              remark: `参加/编辑 招聘会<${jobFair.title}>`,
            },
            () => {},
          );
          window.alert('操作成功');
          window.location = '#招聘会/列表';
        }
      });
  }

  const handleChange = (e) => {
    let flg = true;
    document.getElementsByName('check').forEach((event) => {
      if (!event.checked) {
        flg = false;
      }
    })
    setAllFlg(flg);
  };

  //const search = () => {
  //  fetch(`./api/recruitment/enterprise/${auth.enterprise_id}?u_id=${auth.enterprise_uuid}`, {
  //    method: 'PUT',
  //    headers: { 'content-type': 'application/json' },
  //    body: JSON.stringify(param),
  //  })
  //    .then((res) => res.json())
  //    .then((res) => {
  //      if (res.message) {
  //        window.alert(res.message);
  //      } else {
  //        let flg = res.content.length !== 0;
  //        res.content.forEach(item => {
  //          item.job_fair_id = item.job_fair_id ? JSON.parse(item.job_fair_id) : []
  //          if (!item.job_fair_id.find(it => id === it)) {
  //            flg = false;
  //          }
  //        })
  //        setAllFlg(flg);
  //        setList(res.content);
  //      }
  //    });
  //};

  const allCheckChange = ({ target }) => {
    document.getElementsByName('check').forEach((event) => {
      event.checked = target.checked;
    })
    setAllFlg(target.checked)
  }

  return (
    <View category="校园招聘会场次">
      <div className="row p-3 pt-2 bg-white shadow">
        <div className="col">
          <h4>{jobFair.title}({jobFair.datime})</h4>
          <hr />
          <div id="content"></div>
        </div>
      </div>

      {/*<div className="row mt-3 px-5 pt-2 bg-white shadow">
        <div className="col">
          <TextField
            category="职位名称"
            name="name"
            value={param.name}
            handleChange={handleChange}
          />
        </div>
        <div className="col">
          <SelectField
            category="职位类型"
            name="category"
            value={param.category}
            handleChange={handleChange}
          >
            <option> </option>
            <option>全职</option>
            <option>兼职</option>
            <option>实习</option>
          </SelectField>
        </div>
        <div className="col">
          <DateField
            category="发布日期"
            name="date"
            value={param.date}
            handleChange={handleChange}
          />
        </div>
        <div className="col">
          <SelectField
            category="状态"
            name="status"
            value={param.status}
            handleChange={handleChange}
          >
            <option> </option>
            <option>在招</option>
            <option>停招</option>
          </SelectField>
        </div>
        <div className="col">
          <SelectField
            category="学历要求"
            name="education"
            value={param.education}
            handleChange={handleChange}
          >
            <option> </option>
            <option>不限</option>
            <option>高中以上</option>
            <option>专科以上</option>
            <option>本科以上</option>
          </SelectField>
        </div>
        <div className="col">
          <br />
          <button onClick={search} className="btn btn-primary rounded-0" type="button">
            查询
          </button>
        </div>
      </div>*/}

      <div className="row mt-3 bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <h3 className="pull-left">选择参会岗位</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">
                    <input type="checkbox" checked={allFlg} onChange={allCheckChange} />
                  </th>
                  <th scope="col">编号</th>
                  <th scope="col">岗位名称</th>
                  <th scope="col">岗位类型</th>
                  <th scope="col">所属行业</th>
                  <th scope="col">所属职位</th>
                  <th scope="col">学历要求</th>
                  <th scope="col">招聘人数</th>
                  <th scope="col">工作地点</th>
                  <th scope="col">状态</th>
                  <th scope="col">发布日期</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input name="check" type="checkbox"
                          onChange={handleChange}
                          value={item.id}
                          defaultChecked={item.job_fair_id.find(it => id === it)} />
                      </td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.industry}</td>
                      <td>{item.position}</td>
                      <td>{item.education}</td>
                      <td>{item.qty}</td>
                      <td>
                        {item.address1}-{item.address2}-{item.address3}
                      </td>
                      <td>{item.status}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="row">
              <div className="col">
                <a className="btn btn-primary" href="#招聘会/列表">
                  返回
                </a>
              </div>
              <div className="col">
                <div className="pull-right">
                  <button className="btn btn-success" type="button" onClick={handleSave}>
                    保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
};

export default Update;

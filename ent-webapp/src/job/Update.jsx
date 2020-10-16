import React, { useEffect, useState } from 'react';
import { View } from './Components';
import { TextField, SelectField, DateField } from '../components/InputField';

const Update = () => {
  const [list, setList] = useState([]);

  const [auth, setAuth] = useState({});

  const [param, setParam] = useState({
    name: '',
    category: '',
    date: '',
    status: '',
    education: '',
  });

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'));
    if (_auth !== null) {
      setAuth(_auth);
      fetch(`./api/recruitment/enterprise/${_auth.enterprise_id}?u_id=${_auth.enterprise_uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            setList(res.content);
          }
        });
    }
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setParam((prev) => ({ ...prev, [name]: value }));
  };

  const search = () => {
    fetch(`./api/recruitment/enterprise/${auth.enterprise_id}?u_id=${auth.enterprise_uuid}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          setList(res.content);
        }
      });
  };

  return (
    <View category="校园招聘会场次">
      <div className="row px-5 pt-2 bg-white shadow">
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
      </div>

      <div className="row mt-3 bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <h3 className="pull-left">选择参展的岗位</h3>
            <table className="table table-hover">
              <thead>
                <tr>
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
                  <button className="btn btn-success" type="button">
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

import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { TextField, SelectField, IndustryField } from '../components/InputField';
import { _EditJournal } from '../commonFetch';
import RichEditor from '../components/RichEditor';
import { View } from './Components';

const Update = () => {
  const [data, setData] = useState({
    name: '',
    category: '',
    industry: '',
    status: '',
    education: '',
    salary1: '',
    salary2: '',
    address1: '',
    address2: '',
    address3: '',
    description: '',
    requirement: '',
  });

  const [required, setRequired] = useState({
    name: false,
    salary1: false,
    salary2: false,
    address1: false,
    address2: false,
    address3: false,
  });

  const [city, setCity] = useState([]);

  const [area, setArea] = useState([]);

  const [auth, setAuth] = useState(0);

  const [name, setName] = useState('');

  const { id } = useParams();

  const { search } = useLocation();

  const [level, setLevel] = useState([]);

  const [address, setAddress] = useState([]);

  const [list, setList] = useState([]);

  const [number, setNumber] = useState(0);

  const [number1, setNumber1] = useState(0);

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'));
    if (_auth === null) {
      window.location = '#登录';
      return;
    }
    setAuth(_auth);
    fetch(`./api/recruitment/${id}${search}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          setName(res.content.name);
          setData(() => res.content);
          fetch(`./api/delivery/recruitment/${id}?recruitment_uuid=${res.content.uuid}`)
            .then((res1) => res1.json())
            .then((res1) => {
              if (res.content) {
                setList(res1.content);
              } else {
                alert(res.message);
              }
            });
        } else {
          alert(res.message);
        }
      });

    fetch('/lib/address.json')
      .then((res) => res.json())
      .then((res) => {
        setAddress(res);
        setLevel(
          Object.getOwnPropertyNames(res)
            .filter((item) => item.slice(2, 7) === '0000')
            .map((code) => ({
              code,
              name: res[code],
            })),
        );
      });
  }, [id, search]);

  useEffect(() => {
    if (level.length > 0) {
      const a1 = level.find((item) => item.name === data.address1);
      if (a1) {
        setCity(
          Object.getOwnPropertyNames(address)
            .filter(
              (it) =>
                a1.code.slice(0, 2) === it.slice(0, 2) && it.slice(4, 7) === '00' && it !== a1.code,
            )
            .map((code) => ({
              code,
              name: address[code],
            })),
        );
      }
    }
  }, [data, level, address]);

  useEffect(() => {
    if (city && city.length > 0) {
      const a2 = city.find((item) => item.name === data.address2);
      if (a2) {
        setArea(
          Object.getOwnPropertyNames(address)
            .filter((it) => a2.code.slice(0, 4) === it.slice(0, 4) && it !== a2.code)
            .map((code) => ({
              code,
              name: address[code],
            })),
        );
      }
    }
  }, [data, city, address]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIntroChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    let zw_value = value.replace(/<\/?.+?>/g, '');
    setNumber(zw_value.length);
    if (zw_value.length > 200) {
      document.getElementById('number').style.color = '#ff2121';
      document.getElementById('hide').style.display = 'block';
      document.getElementById('preservation').disabled = true;
    } else {
      document.getElementById('number').style.color = '#7a858c';
      document.getElementById('hide').style.display = 'none';
      document.getElementById('preservation').disabled = false;
    }
  };

  const handleIntroChange1 = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    let gz_value = value.replace(/<\/?.+?>/g, '');
    setNumber1(gz_value.length);
    if (gz_value.length > 200) {
      document.getElementById('number1').style.color = '#ff2121';
      document.getElementById('hide1').style.display = 'block';
    } else {
      document.getElementById('number1').style.color = '#7a858c';
      document.getElementById('hide1').style.display = 'none';
    }
  };

  useEffect(() => {
    if (number > 200 || number1 > 200) {
      document.getElementById('preservation').disabled = true;
    } else {
      document.getElementById('preservation').disabled = false;
    }
  }, [number, number1]);

  const handleSave = () => {
    let flg = false;
    const _req = {};
    Object.getOwnPropertyNames(required).forEach((key) => {
      if (!data[key] || data[key] === '') {
        _req[key] = '请填写内容!';
        flg = true;
      } else {
        _req[key] = false;
      }
    });

    if (flg) {
      window.console.info(_req);
      setRequired(_req);
      return;
    }

    fetch(`./api/recruitment/${id}${search}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...data,
        user_id: auth.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          _EditJournal(
            {
              category2: '岗位',
              data_id: data.id,
              data_uuid: data.uuid,
              remark: `修改岗位<${data.name}>`,
            },
            () => {},
          );
          window.alert('操作成功');
          window.location = '#岗位/列表';
        }
      });
  };

  const handleProvince = (e) => {
    const { value } = e.target;
    if (value !== '') {
      const a1 = level.find((item) => item.name === value);
      if (a1) {
        setCity(
          Object.getOwnPropertyNames(address)
            .filter(
              (it) =>
                a1.code.slice(0, 2) === it.slice(0, 2) && it.slice(4, 7) === '00' && it !== a1.code,
            )
            .map((code) => ({
              code,
              name: address[code],
            })),
        );
      }
      setData({
        ...data,
        address1: value,
        address2: '',
        address3: '',
      });
      setArea([]);
    } else {
      setData({
        ...data,
        address1: value,
        address2: value,
        address3: value,
      });
      setCity([]);
      setArea([]);
    }
  };

  const handleCity = (e) => {
    const { value } = e.target;
    if (value !== '') {
      setData({
        ...data,
        address2: value,
        address3: '',
      });
      const a2 = city.find((item) => item.name === value);
      if (a2) {
        setArea(
          Object.getOwnPropertyNames(address)
            .filter((it) => a2.code.slice(0, 4) === it.slice(0, 4) && it !== a2.code)
            .map((code) => ({
              code,
              name: address[code],
            })),
        );
      }
    } else {
      setData({
        ...data,
        address2: value,
        address3: value,
      });
      setArea([]);
    }
  };

  const handleDataStatus = (v) => {
    fetch(`./api/recruitment/status/${id}${search}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        status: v,
        user_id: auth.id,
        name,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          _EditJournal(
            {
              category2: '岗位',
              data_id: data.id,
              data_uuid: data.uuid,
              remark: `修改岗位状态为-<${data.status}>`,
            },
            () => {},
          );
          setData({
            ...data,
            status: v,
          });
        }
      });
  };

  return (
    <View category="我的职位">
      <div className="row bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h3 className="pull-left">编辑岗位</h3>
                <span className="text-danger">(带有*符号的选项为必填项)</span>
                {data.status === '在招' ? (
                  <button
                    className="pull-right btn btn-link btn-lg text-danger"
                    onClick={() => handleDataStatus('停招')}
                    type="button"
                  >
                    <FontAwesomeIcon icon={faBan} fixedWidth />
                    停招
                  </button>
                ) : (
                  <button
                    className="pull-right btn btn-link btn-lg text-success"
                    onClick={() => handleDataStatus('在招')}
                    type="button"
                  >
                    复招
                  </button>
                )}
              </div>
            </div>
            <hr style={{ marginTop: 0 }} />
            <div className="row">
              <div className="col">
                <TextField
                  category="职位名称"
                  name="name"
                  value={data.name}
                  req={required.name}
                  handleChange={handleChange}
                  required
                />
              </div>
              <IndustryField
                industry={data.industry}
                position={data.position}
                handleChange={handleChange}
              />
              <div className="col">
                <SelectField
                  category="职位类型"
                  name="category"
                  value={data.category || ''}
                  handleChange={handleChange}
                >
                  <option> </option>
                  <option>全职</option>
                  <option>兼职</option>
                  <option>实习</option>
                </SelectField>
              </div>
              <div className="col">
                <SelectField
                  category="学历要求"
                  name="education"
                  value={data.education}
                  handleChange={handleChange}
                >
                  <option> </option>
                  <option>不限</option>
                  <option>高中及以上</option>
                  <option>大专及以上</option>
                  <option>本科及以上</option>
                  <option>硕士及以上</option>
                  <option>硕士</option>
                </SelectField>
              </div>
              <div className="col">
                <TextField
                  category="招聘人数"
                  name="qty"
                  value={data.qty}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <SelectField
                  category="省/直辖市"
                  name="address1"
                  value={data.address1}
                  req={required.address1}
                  handleChange={handleProvince}
                  required
                >
                  <option> </option>
                  {level.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </SelectField>
              </div>
              <div className="col-2">
                <SelectField
                  category="市"
                  name="address2"
                  value={data.address2}
                  req={required.address2}
                  handleChange={handleCity}
                  required
                >
                  <option> </option>
                  {city && city.map((item) => <option key={item.name}>{item.name}</option>)}
                </SelectField>
              </div>
              <div className="col-2">
                <SelectField
                  category="区/县"
                  name="address3"
                  value={data.address3}
                  req={required.address3}
                  handleChange={handleChange}
                  required
                >
                  <option> </option>
                  {area.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </SelectField>
              </div>
              <div className="col-4">
                <label>
                  <span className="text-danger">*</span>
                  薪资要求
                  <span className="text-danger">(单位：/月)</span>
                </label>
                <div className="row pl-3 pr-3">
                  <input
                    type="text"
                    name="salary1"
                    value={data.salary1}
                    onChange={handleChange}
                    className={`col form-control form-control-sm rounded-0 ${
                      required.salary1 ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback col-3">{required.salary1}</div>
                  -
                  <input
                    type="text"
                    name="salary2"
                    value={data.salary2}
                    onChange={handleChange}
                    className={`col form-control form-control-sm rounded-0 ${
                      required.salary1 ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback col-3">{required.salary1}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>职位要求</label>
                  <RichEditor
                    value={data.requirement}
                    name="requirement"
                    handleChange={handleIntroChange}
                  />
                  <span id="number" className="pull-right" style={{ color: '#7a858c' }}>
                    {number}/200
                  </span>
                  <span
                    id="hide"
                    className="pull-left"
                    style={{ color: '#ff2121', display: 'none' }}
                  >
                    请输入1-200个字符
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>工作内容</label>
                  <RichEditor
                    value={data.description}
                    name="description"
                    handleChange={handleIntroChange1}
                  />
                  <span id="number1" className="pull-right" style={{ color: '#7a858c' }}>
                    {number1}/200
                  </span>
                  <span
                    id="hide1"
                    className="pull-left"
                    style={{ color: '#ff2121', display: 'none' }}
                  >
                    请输入1-200个字符
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <a className="btn btn-primary" href="#岗位/列表">
                  返回
                </a>
              </div>
              <div className="col">
                <div className="pull-right">
                  <button
                    id="preservation"
                    className="btn btn-success"
                    onClick={handleSave}
                    type="button"
                  >
                    保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row bg-white shadow mt-4">
        <div className="col card rounded-0">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h3 className="pull-left">已收到简历</h3>
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">求职者姓名</th>
                  <th scope="col">毕业院校</th>
                  <th scope="col">学历</th>
                  <th scope="col">投递时间</th>
                  <th scope="col">状态</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.school}</td>
                      <td>{item.education}</td>
                      <td>{item.datime}</td>
                      <td>{item.status}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <a
                            className="btn btn-primary"
                            href={`#简历/列表/详情/${item.id}?u_id=${item.uuid}`}
                          >
                            查看
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </View>
  );
};

export default Update;

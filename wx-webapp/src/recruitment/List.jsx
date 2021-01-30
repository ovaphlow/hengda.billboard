import React, { useState, useEffect } from 'react';

// import Title from '../components/Title'
import Navbar from '../components/Navbar';
import PlayImg from '../components/PlayImg';
import TextCheckbox from '../components/Button';
import { RecruitmentRow1 } from '../components/DataRow';
import CityDropdowns from '../components/CityDropdowns';

const List = () => {
  const [types, setTypes] = useState({});

  const [list, setList] = useState([]);

  const [city, setCity] = useState('');

  const [page, setPage] = useState(2);

  const [flag, setFlag] = useState(true);

  // const [index, setIndex] = useState(0);

  // const [list1, setList1] = useState([]);

  // const bottomDomRef = useRef(null);

  useEffect(() => {
    document.title = '岗位';
    fetch('./api/recruitment/filter?category=wx-default-list', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        category: '兼职,全职,实习',
        city: '',
        industry: '',
        keyword: '',
        page: 1,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setList(res);
        } else {
          alert(res);
        }
      });
  }, []);

  // const splitArray = (arr, num) => {
  //   const len = arr.length;
  //   let arr1 = [];
  //   for (let i = 0; i < len; i += num) {
  //     arr1.push(arr.slice(i, i + num));
  //   }
  //   return arr1;
  // };

  // const updateList = useCallback(() => {
  //   const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //   const scrollTop = document.documentElement.scrollTop;
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   const groups = splitArray(list, 20);
  //   const groupLen = groups.length;
  //   const { top } = bottomDomRef.current.getBoundingClientRect();
  //   if (top < clientHeight && index < groupLen) {
  //     setList1(list1.concat(groups[index]));
  //     setIndex(index + 1);
  //   }
  //   if (scrollHeight > clientHeight && scrollHeight === scrollTop + clientHeight) {
  //     document.getElementById('rotate').style.display = 'none';
  //   }
  // }, [list, list1, index]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     updateList();
  //   }, 300);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [updateList]);

  // useEffect(() => {
  //   window.addEventListener('scroll', updateList);
  //   return () => {
  //     window.removeEventListener('scroll', updateList);
  //   };
  // }, [updateList]);

  const search = (param) => {
    fetch('./api/recruitment/search/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setList(res);
        } else {
          alert(res);
        }
      });
  };

  const _onCheckboxChange = ({ name, checked }) => {
    search({
      city,
      [name]: checked,
      ...types,
    });
    setTypes((p) => ({
      ...p,
    }));
  };

  const handleChange = (val) => {
    search({
      city: val,
      category: '兼职,全职,实习',
      industry: '',
      keyword: '',
      page: 1,
      ...types,
    });
    setCity(val);
  };

  const load = () => {
    fetch('./api/recruitment/filter?category=wx-default-list', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        category: '兼职,全职,实习',
        city: city,
        industry: '',
        keyword: '',
        page: page,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length) {
          setList(list.concat(res));
          setFlag(true);
        } else {
          setFlag(true);
          alert('已经到底了');
          document.getElementById('load').innerHTML = '已经到底了';
          document.getElementById('load').disabled = true;
        }
      });
    setPage(page + 1);
    setFlag(false);
  };

  return (
    <>
      <div className="container-fluid">
        {/* <Title category="岗位" /> */}
        <PlayImg category="小程序-岗位" />
        <div className="row pb-2 pt-2" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="col">
            <input
              type="text"
              className="w-100 border-0 text-center rounded-pill"
              placeholder="按照企业/职位名称查询"
              onClick={() => {
                window.location = '#岗位/查询/';
              }}
              style={{ outline: 0, height: 35 }}
            />
          </div>
        </div>
        <div className="card border-0 mt-1 shadow">
          <div className="card-body">
            <div className="row mb-3" style={{ fontSize: 14 }}>
              <div className="col">
                <CityDropdowns handleChange={handleChange} />
              </div>
              <div className="col flex-end">
                <div className="pull-right text-primary">
                  <TextCheckbox name="category1" onChange={_onCheckboxChange}>
                    兼职
                  </TextCheckbox>
                  <TextCheckbox name="category2" onChange={_onCheckboxChange}>
                    全职
                  </TextCheckbox>
                  <TextCheckbox name="category3" onChange={_onCheckboxChange}>
                    实习
                  </TextCheckbox>
                </div>
              </div>
            </div>
            <div>
              {list &&
                list.map((item) => (
                  <div key={item.id}>
                    <RecruitmentRow1 {...item} />
                    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
                  </div>
                ))}
              {/* <div className="d-flex justify-content-center">
                <div
                  id="rotate"
                  className="spinner-border text-primary"
                  role="status"
                  ref={bottomDomRef}
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div> */}
            </div>
            {flag === true ? (
              <button id="load" className="btn btn-block mx-auto" onClick={load}>
                点击加载更多
              </button>
            ) : (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Navbar category="岗位" />
    </>
  );
};

export default List;

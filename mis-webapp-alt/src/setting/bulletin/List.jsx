import React, { useEffect, useState } from 'react';

import Navbar from '../../component/Navbar';
import SideNav from '../component/SideNav';
import ComponentToolbar from './ComponentToolbar';

export default function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    //
  }, []);

  return (
    <>
      <Navbar category="系统设置" />

      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>通知/公告</h3>
            <hr />

            <ComponentToolbar />

            <div className="card bg-dark shadow" />
          </div>
        </div>
      </div>
    </>
  );
}

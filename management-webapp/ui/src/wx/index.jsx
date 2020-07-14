import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  
  return (
    <Router>
      <Switch>
        <Route path="/"><Wx /></Route>
      </Switch>
    </Router>
  );
}


function Wx() {
  const auth = useAuth();
  const [data, setData] = useState([]);


  useEffect(() => {
    (async () => {
      const response = await window.fetch('https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=35_U1zE1a7EyETE705n2UZzUFJR0xXrxK55GTR6-Yj5VWqzLbHJCrE_-N5f1eKqF52mue_8USOvMv0eqmLHyMltVKs2d4xPDC_u-4xlbf_2wUcNi65cfg78VQvykfl10RFRaRoza30_nuTlWRy_MLReAEAHGM',
        {
          method: 'POST',
          mode: 'cors', 
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            "type": "news",
            "offset": 0,
            "count": 20
          })
        });
      const res = await response.json();
      setData(res.content);
    })();
  }, []);

  return (
    <div className="d-flex flex-column h-100 w-100">
      {/* <header>
        <TopNav component_option="" component_param_name={auth.name} />
      </header> */}

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              {/* <div className="card bg-dark h-100">
                <LeftNav component_option="投诉" />
              </div> */}
            </div>

            <div className="col">
              <div className="container-lg h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-end">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-link text-reset text-decoration-none"
                      onClick={() => { window.history.go(-1); }}
                    >
                      返回
                    </button>
                  </div>
                  <span className="h1">wx</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <caption>wx</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>标题</th>
                          <th>用户</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>

                      <tbody>
                        {/* {data.item.map(item => item.content.map(it =>(
                          <tr key={item.media_id}>
                            <td className="text-right">{item.media_id}</td>
                            <td>
                              {it.title}
                            </td>
                            <td>
                              {it.author}
                            </td>
                          </tr>
                        )))} */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-3 bg-dark">
        <BottomNav />
      </footer>
    </div>
  );
}
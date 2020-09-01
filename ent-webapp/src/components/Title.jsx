import React, { useEffect, useState } from 'react';

const Title = () => {
  const [banner, setBanner] = useState(0);

  useEffect(() => {
    fetch('./api/banner/企业端-页头/')
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          setBanner(res.content[0]);
        }
      });
  }, []);

  return (
    <div className="row bg-white">
      <div className="col px-5 mt-2 mb-2">
        <img className="img-fluid pull-left logo" alt="" src="./lib/img/logo3.png" />
        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
        {banner !== 0 ? <img className="img-fluid ad" alt="" src={banner.data_url} /> : <></>}
      </div>
    </div>
  );
};

export default Title;

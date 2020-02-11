import React from 'react'

const MessageDetails = props => {

  const toPrevious = () => {
    window.history.go(-1)
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <span className="text-dark p-2" style={{ fontSize: 13 }}>
            <i onClick={toPrevious}
              className="fa fa-fw fa-chevron-left fa-lg text-primary"></i>
          </span>
        </div>
        <div className="row mt-2">
          <div className="col">
            发布时间：2019-12-13
        </div>
        </div>
        <div className="row">
          <div className="col">
            截止日期：2019-12-21
        </div>
        </div>
        <div className="row">
          <div className="col">
            所属省份：黑龙江
        </div>
        </div>
        <div className="row">
          <div className="col">
            工作地点：哈尔滨
        </div>
        </div>
        <div className="row">
          <div className="col">
            栏目分类：黑龙江高校
        </div>
        </div>
        <div className="row">
          <div className="col">
            招聘人数：若干
        </div>
        </div>
        <div className="row">
          <div className="col">
            报名方式：网上系统需求学科(供参考):
        </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            按照《国家职业教育改革实施方案》（国发[2019]4号）、《黑龙江省事业单位公开招聘人员暂行办法》（黑办发[2006]32号）、《黑龙江省事业单位公开招聘工作人员实施细则》（黑人社发[2014]63号）、《关于进一步做好省直事业单位公开招聘工作的通知》(黑人社发[2015]32号)和《关于全面下放省直事业单位公开招聘管理权限的通知》（黑人社发[2015]66号）等相关规定，根据我校实际需要，经学校研究决定，拟面向社会公开招聘工作人员，现将有关事宜予以公告。<br />
            一、学校简介 <br />
            详见黑龙江职业学院官网（http://www.hljp.edu.cn/）<br />
            二、招聘原则<br />
            招聘工作坚持德才兼备的用人标准，贯彻“公开、公平、公正、平等竞争、择优录用”的原则。<br />
            三、基本条件<br />
            （一）具有中华人民共和国国籍，遵纪守法，具有良好的品行和职业道德，具有适应高职院校工作岗位需要的政治素养和文化素质。<br />
            （二）身体健康，仪表端庄、口齿清晰，具有良好的语言表达和沟通能力。<br />
            （三）热爱教育事业，服从单位安排，具有团结协作精神、创新精神和奉献精神，乐于为学校建设和发展做出贡献。<br />
            （四）应聘人员年龄须在35（含）周岁以下。具备博士研究生学历和专业技术中级职称人员可放宽至40（含）周岁以下。年龄计算截止时间为公告发布时间。<br />
            （五）应聘教师岗位人员，学历一般要求为全日制统招研究生并获硕士学位；第一学历须为全日制统招本科毕业并获学士学位（以下简称本科学历学位），专业教师岗位研究生与本科专业原则上要一致或相关；港澳台地区和国外院校毕业，须有国家教育部留学服务中心的学历学位认证书。<br />
            四、招聘计划<br />
            详见附件。辅导员B岗是指学生公寓辅导员岗位。学校第一校区在哈尔滨市南岗区学府路5号，第二校区在哈尔滨市双城区迎宾路162号（以下简称双城校区）。<br />
          </div>
        </div>
      </div>
      <ul className="nav bg-light nav-light  fixed-bottom border-top" style={{ height: '50px', fontSize: 11, flexWrap: 'inherit' }}>
        <div className="row text-center nav-row">
          <div className="col-2 nav-col">
            <button className="btn btn-light nav-btn text-muted text-small">
              日程
            </button>
          </div>
          <div className="col nav-col">
            <button className="btn btn-light nav-btn text-muted text-small">
              在线咨询
            </button>
          </div>
          <div className="col-2 nav-col" >
          <button className="btn btn-light nav-btn text-muted text-small">
            收藏
          </button>
          </div>
          <div className="col-5 nav-col">
            <button className="btn btn-primary nav-btn">
              投递职位
          </button>
          </div>
        </div>
      </ul>
    </>
  )
}

export default MessageDetails
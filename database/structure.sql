-- `hengda-billboard`.banner definition

CREATE TABLE `banner` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `status` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `category` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `title` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `comment` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `datime` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `data_url` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `source_url` varchar(250) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '来源网址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- `hengda-billboard`.browse_journal definition

CREATE TABLE `browse_journal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `common_user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `data_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '收藏数据id',
  `category` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '收藏数据类型',
  `datime` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '时间',
  PRIMARY KEY (`id`),
  KEY `browse_journal_common_user_id_IDX` (`common_user_id`) USING BTREE,
  KEY `browse_journal_data_id_IDX` (`data_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='普通用户浏览记录';


-- `hengda-billboard`.campus definition

CREATE TABLE `campus` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `mis_user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `category` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '校园招聘类型(宣讲会/双选会)',
  `title` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '标题',
  `date` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `time` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `address_level1` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `address_level2` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `address_level3` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `address_level4` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '详细地址',
  `school` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '院校',
  `content` mediumtext COLLATE utf8mb4_general_ci NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`),
  KEY `campus_date_IDX` (`date`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='校园招聘';


-- `hengda-billboard`.common_data definition

CREATE TABLE `common_data` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `master_id` int(10) unsigned NOT NULL DEFAULT '0',
  `category` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `comment` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- `hengda-billboard`.common_user definition

CREATE TABLE `common_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `password` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '电话',
  PRIMARY KEY (`id`),
  KEY `common_user_username_IDX` (`username`) USING BTREE,
  KEY `common_user_name_IDX` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- `hengda-billboard`.common_user_file definition

CREATE TABLE `common_user_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` mediumtext COLLATE utf8mb4_general_ci,
  `common_user_id` int(11) NOT NULL DEFAULT '0',
  `category` varchar(2) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '类型',
  PRIMARY KEY (`id`),
  KEY `common_user_file_index` (`common_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- `hengda-billboard`.common_user_schedule definition

CREATE TABLE `common_user_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `campus_id` int(11) NOT NULL DEFAULT '0' COMMENT '校园招聘id',
  `common_user_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='个人用户日程';


-- `hengda-billboard`.delivery definition

CREATE TABLE `delivery` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `resume_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '简历id',
  `recruitment_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '岗位id',
  `datime` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '投递时间',
  `status` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '已投递' COMMENT '投递状态',
  PRIMARY KEY (`id`),
  KEY `delivery_resume_id_IDX` (`resume_id`) USING BTREE,
  KEY `delivery_recruitment_id_IDX` (`recruitment_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='简历投递';


-- `hengda-billboard`.edit_journal definition

CREATE TABLE `edit_journal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `category1` varchar(4) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户类型',
  `category2` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '操作类型',
  `datime` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '操作时间',
  `data_id` int(11) NOT NULL DEFAULT '0',
  `remark` varchar(200) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `edit_journal_user_id_IDX` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='编辑记录表';


-- `hengda-billboard`.enterprise definition

CREATE TABLE `enterprise` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `status` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '未认证',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `yingyezhizhao` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '营业执照/企业号',
  `faren` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '法人',
  `zhuceriqi` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '注册日期',
  `zhuziguimo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '注资规模',
  `yuangongshuliang` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '员工数量',
  `yingyezhizhao_tu` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '营业执照图像',
  `address1` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `address2` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `address3` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `address4` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `enterprise_name_IDX` (`name`) USING BTREE,
  KEY `enterprise_address1_IDX` (`address1`,`address2`,`address3`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='企业';


-- `hengda-billboard`.enterprise_user definition

CREATE TABLE `enterprise_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `enterprise_id` int(10) unsigned NOT NULL DEFAULT '0',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `password` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `enterprise_user_enterprise_id_IDX` (`enterprise_id`) USING BTREE,
  KEY `enterprise_user_username_IDX` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='企业用户';


-- `hengda-billboard`.favorite definition

CREATE TABLE `favorite` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `data_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '收藏数据id',
  `category1` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户类型',
  `category2` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '收藏数据类型',
  `datime` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `favorite_common_user_id_IDX` (`user_id`) USING BTREE,
  KEY `favorite_data_id_IDX` (`data_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='普通用户收藏';


-- `hengda-billboard`.feedback definition

CREATE TABLE `feedback` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `user_category` varchar(4) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `status` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '未处理' COMMENT '状态：未处理/已处理',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '反馈内容',
  `datime` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '反馈时间',
  `category` varchar(4) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '类型',
  PRIMARY KEY (`id`),
  KEY `feedback_common_user_id_IDX` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='反馈/投诉';


-- `hengda-billboard`.login_journal definition

CREATE TABLE `login_journal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `ip` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0.0.0.0' COMMENT '登录ip地址',
  `address` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '登录物理位置',
  `category` varchar(4) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户类型',
  `datime` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0000-01-01 00:01' COMMENT '登录时间',
  PRIMARY KEY (`id`),
  KEY `login_journal_user_id_IDX` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- `hengda-billboard`.message definition

CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `common_user_id` int(11) NOT NULL DEFAULT '0' COMMENT '普通用户',
  `ent_user_id` int(11) NOT NULL DEFAULT '0' COMMENT '企业用户',
  `content` varchar(200) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '内容',
  `datime` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '消息时间',
  `category` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '消息类型',
  `status` varchar(2) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '未读',
  PRIMARY KEY (`id`),
  KEY `ent_user_id_index` (`ent_user_id`),
  KEY `common_user_id_index` (`common_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='消息';


-- `hengda-billboard`.mis_user definition

CREATE TABLE `mis_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `password` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `mis_user_username_IDX` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='管理端用户';


-- `hengda-billboard`.offer definition

CREATE TABLE `offer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `recruitment_id` int(11) NOT NULL DEFAULT '0' COMMENT '岗位id',
  `common_user_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `address` varchar(200) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '面试地点',
  `mianshishijian` varchar(20) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '面试时间',
  `luxian` varchar(200) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '交通路线',
  `remark` varchar(200) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `phone1` varchar(11) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '联系电话',
  `phone2` varchar(11) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '联系方式',
  `datime` varchar(20) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '发送时间',
  `status` varchar(2) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '未读',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- `hengda-billboard`.recommend definition

CREATE TABLE `recommend` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `category` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '栏目分类',
  `title` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '标题',
  `date1` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '发布时间',
  `date2` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '截止日期',
  `address_level1` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `address_level2` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `publisher` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '单位',
  `qty` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '招聘人数',
  `baomignfangshi` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '报名方式',
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='推荐信息';


-- `hengda-billboard`.recruitment definition

CREATE TABLE `recruitment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `enterprise_id` int(10) unsigned NOT NULL DEFAULT '0',
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '招聘职位',
  `qty` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '招聘人数',
  `description` text COLLATE utf8mb4_general_ci NOT NULL COMMENT '工作内容',
  `requirement` text COLLATE utf8mb4_general_ci NOT NULL COMMENT '岗位要求',
  `address1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '省',
  `address2` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '市',
  `address3` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '区',
  `date` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '发布日期',
  `salary1` int(11) NOT NULL DEFAULT '0' COMMENT '薪资',
  `salary2` int(11) NOT NULL DEFAULT '0' COMMENT '薪资',
  `education` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '学历',
  `category` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '类型',
  `status` varchar(2) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '在招',
  `industry` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `position` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '职位',
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `recruitment_enterprise_id_IDX` (`enterprise_id`) USING BTREE,
  KEY `recruitment_name_IDX` (`name`) USING BTREE,
  KEY `recruitment_address1_IDX` (`address1`,`address2`,`address3`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- `hengda-billboard`.report definition

CREATE TABLE `report` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `user_category` varchar(4) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户类型',
  `data_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '举报内容id',
  `category` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '举报类型',
  `content` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '举报原因',
  `datime` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '举报时间',
  PRIMARY KEY (`id`),
  KEY `report_common_user_id_IDX` (`user_id`) USING BTREE,
  KEY `report_data_id_IDX` (`data_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='举报';


-- `hengda-billboard`.resume definition

CREATE TABLE `resume` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `common_user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '保密' COMMENT '状态',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '姓名',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系电话',
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '邮箱地址',
  `gender` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '性别',
  `birthday` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `school` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '毕业院校',
  `education` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '学历',
  `date_begin` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '入学时间',
  `date_end` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '毕业时间',
  `major` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '专业',
  `qiwangzhiwei` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '期望职位',
  `qiwanghangye` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '期望行业',
  `address1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '省',
  `address2` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '市',
  `address3` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '区',
  `address4` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '详细',
  `yixiangchengshi` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '求职意向地址',
  `ziwopingjia` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '自我评价',
  PRIMARY KEY (`id`),
  KEY `resume_common_user_id_IDX` (`common_user_id`) USING BTREE,
  KEY `resume_education_IDX` (`education`,`yixiangchengshi`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- `hengda-billboard`.sys_message definition

CREATE TABLE `sys_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `user_category` varchar(4) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `category` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '接收方类型',
  `title` varchar(40) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '内容',
  `content` text COLLATE utf8mb4_general_ci COMMENT '内容',
  `datime` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '发送时间',
  `status` varchar(2) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '未读',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- `hengda-billboard`.topic definition

CREATE TABLE `topic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `mis_user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `tag` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `title` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `date` date NOT NULL DEFAULT '0000-01-01',
  `time` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `content` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recommend_date_IDX` (`date`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='热门话题';

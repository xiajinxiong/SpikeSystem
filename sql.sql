CREATE TABLE `web2020_student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentNo` varchar(50) NOT NULL COMMENT ' 学号',
  `studentName` varchar(100) NOT NULL COMMENT '姓名',
  `gender` int NOT NULL COMMENT '性别 0女，1男',
  `code` varchar(10) NOT NULL COMMENT '随机校验码',
  `year` int NOT NULL COMMENT '入学年月',
  `roomstatus` int NOT NULL DEFAULT '0' COMMENT '目前宿舍状态',
  `keystatus` int DEFAULT '0' COMMENT '钥匙状态',
  `onlinestatus` int DEFAULT '0' COMMENT '是否可以在线选，1可以，0不可以',
  `password` varchar(64) NOT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `participation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activity_id` int NOT NULL,
  `student_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `unqiue_key` (`activity_id`,`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32665 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `publisher_id` int NOT NULL,
  `text` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `count` int NOT NULL,
  `occupied` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  CONSTRAINT `activity_chk_1` CHECK ((`occupied` <= `count`))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `web2020`.`web2020_student`
(`studentNo`,
`studentName`,
`gender`,
`code`,
`year`,
`roomstatus`,
`password`,
`role`)
VALUES
("1000000101",
"管理员"
0,
"1234",
"2018",
0,
"a03ab19b866fc585b5cb1812a2f63ca861e7e7643ee5d43fd7106b623725fd67",
"admin");

INSERT INTO `web2020`.`web2020_student`
(`studentNo`,
`studentName`,
`gender`,
`code`,
`year`,
`roomstatus`,
`password`,
`role`)
VALUES
("002",
"管理员"
0,
"1234",
"2018",
0,
"a03ab19b866fc585b5cb1812a2f63ca861e7e7643ee5d43fd7106b623725fd67",
"student");




/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3307
 Source Schema         : vuets

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 30/09/2022 18:19:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for covidinfo
-- ----------------------------
DROP TABLE IF EXISTS `covidinfo`;
CREATE TABLE `covidinfo`  (
  `depallid` int(0) NULL DEFAULT NULL,
  `deptid` int(0) NOT NULL,
  `employid` int(0) NOT NULL,
  `firstInoculation` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'false' COMMENT '第一针接种情况',
  `secondInoculation` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'false' COMMENT '第二针',
  `threeInoculation` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'false' COMMENT '第三针',
  PRIMARY KEY (`employid`, `deptid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for depall
-- ----------------------------
DROP TABLE IF EXISTS `depall`;
CREATE TABLE `depall`  (
  `dno` int(0) NOT NULL AUTO_INCREMENT,
  `dname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `explain` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `count` int(0) NOT NULL DEFAULT 0,
  `groupCount` int(0) NOT NULL DEFAULT 0,
  `isAllCovid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'false',
  `noCovid` int(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`dno`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `deptno` int(0) NOT NULL,
  `deptname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `count` int(0) NOT NULL DEFAULT 0,
  `countCovid` int(0) NOT NULL DEFAULT 0 COMMENT '三针接种人数',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_dno`(`deptno`) USING BTREE,
  CONSTRAINT `fk_dno` FOREIGN KEY (`deptno`) REFERENCES `depall` (`dno`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 90 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for deptredo
-- ----------------------------
DROP TABLE IF EXISTS `deptredo`;
CREATE TABLE `deptredo`  (
  `id` int(0) NOT NULL,
  `deptno` int(0) NULL DEFAULT NULL,
  `deptname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `count` int(0) NULL DEFAULT NULL,
  `countCovid` int(0) NULL DEFAULT NULL,
  `confirmTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `whichDone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`  (
  `deptno` int(0) NOT NULL,
  `employno` int(0) NOT NULL AUTO_INCREMENT,
  `employname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employsex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employidcard` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employphone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `entryDate` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employemail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employaddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employsalary` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isuse` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否补贴',
  PRIMARY KEY (`employno`, `deptno`) USING BTREE,
  INDEX `deptno`(`deptno`) USING BTREE,
  INDEX `employname`(`employname`) USING BTREE,
  INDEX `employno`(`employno`) USING BTREE,
  CONSTRAINT `fk_deptno` FOREIGN KEY (`deptno`) REFERENCES `dept` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 242 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for employeredo
-- ----------------------------
DROP TABLE IF EXISTS `employeredo`;
CREATE TABLE `employeredo`  (
  `dno` int(0) NOT NULL,
  `deptno` int(0) NULL DEFAULT NULL,
  `employno` int(0) NULL DEFAULT NULL,
  `employname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `employage` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `employsex` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `employidcard` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `employphone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `entryDate` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `employemail` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `employaddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `employsalary` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isuse` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `confirmTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `whichDone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for employesalary
-- ----------------------------
DROP TABLE IF EXISTS `employesalary`;
CREATE TABLE `employesalary`  (
  `deptno` int(0) NOT NULL COMMENT '部门所属团队',
  `deptid` int(0) NOT NULL COMMENT '团队号',
  `socialSub` int(0) NOT NULL DEFAULT 150 COMMENT '社保钱',
  `houseSub` int(0) NOT NULL DEFAULT 800 COMMENT '房补金',
  `eatSub` int(0) NOT NULL DEFAULT 650 COMMENT '餐补',
  `transSub` int(0) NOT NULL DEFAULT 500 COMMENT '交通补贴',
  `hotSub` int(0) NOT NULL DEFAULT 300 COMMENT '高温补贴',
  `performance` int(0) NOT NULL DEFAULT 100 COMMENT '绩效',
  `isuse` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否把补贴计入',
  PRIMARY KEY (`deptid`) USING BTREE,
  INDEX `deptno`(`deptno`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for employesalarydetail
-- ----------------------------
DROP TABLE IF EXISTS `employesalarydetail`;
CREATE TABLE `employesalarydetail`  (
  `deptno` int(0) NOT NULL,
  `employno` int(0) NOT NULL COMMENT '员工号',
  `employname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名字',
  `usesocialSub` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否社保',
  `usehouseSub` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否有房补',
  `useeatSub` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否有餐补',
  `usetransSub` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否有交通补',
  `usehotSub` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否有高温补',
  `usePerformance` int(0) NOT NULL DEFAULT 100 COMMENT '是否有绩效',
  `salary` int(0) NOT NULL COMMENT '底薪',
  `isuse` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否拥有补贴 取决于团队整体',
  INDEX `detail_deptno`(`deptno`) USING BTREE,
  INDEX `detail_name`(`employname`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for employesub
-- ----------------------------
DROP TABLE IF EXISTS `employesub`;
CREATE TABLE `employesub`  (
  `socialSub` int(0) NOT NULL,
  `houseSub` int(0) NOT NULL,
  `eatSub` int(0) NOT NULL,
  `transSub` int(0) NOT NULL,
  `hotSub` int(0) NOT NULL,
  `performance` int(0) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `islock` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `level` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'token',
  PRIMARY KEY (`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Triggers structure for table covidinfo
-- ----------------------------
DROP TRIGGER IF EXISTS `add_count`;
delimiter ;;
CREATE TRIGGER `add_count` AFTER INSERT ON `covidinfo` FOR EACH ROW begin
-- 接种三针疫苗情况
DECLARE covidSuccessCount int(255);
-- 没有接种的人数
DECLARE noCovid int(255);
-- 获取三针都是true的人数更新到 小组表
set covidSuccessCount=(SELECT count(*) from covidinfo  WHERE (depallid=new.depallid AND firstInoculation='true' AND secondInoculation='true' AND threeInoculation='true'));
-- 更新
update dept set countCovid=covidSuccessCount where id=new.deptid;

set noCovid=(select DISTINCT count(*) as noCovid from covidinfo,
      depall WHERE covidinfo.threeInoculation='false' AND 
      depall.dno=covidinfo.depallid AND depallid=new.depallid );

UPDATE  depall set noCovid=noCovid WHERE dno =new.depallid;


end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table covidinfo
-- ----------------------------
DROP TRIGGER IF EXISTS `delete_count`;
delimiter ;;
CREATE TRIGGER `delete_count` AFTER DELETE ON `covidinfo` FOR EACH ROW begin
-- 没有接种的人数
DECLARE oldNoCovid int(255);


set oldNoCovid=(select DISTINCT count(*) as noCovid from covidinfo,
      depall WHERE covidinfo.threeInoculation='false' AND 
      depall.dno=covidinfo.depallid AND depallid=old.depallid );


UPDATE  depall set noCovid=oldNoCovid WHERE dno =OLD.depallid;

end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table covidinfo
-- ----------------------------
DROP TRIGGER IF EXISTS `update_count`;
delimiter ;;
CREATE TRIGGER `update_count` AFTER UPDATE ON `covidinfo` FOR EACH ROW begin
-- 接种三针疫苗情况
DECLARE covidSuccessCount int(255);
DECLARE covidSuccessCountOld int(255);
-- 没有接种的人数
DECLARE oldNoCovid int(255);

DECLARE newNoCovid int(255);

-- 获取三针都是true的人数更新到 小组表
set covidSuccessCount=(SELECT count(*) from covidinfo  WHERE (deptid=new.deptid AND firstInoculation='true' AND secondInoculation='true' AND threeInoculation='true'));
-- 获取三针都是true的人数更新到 小组表
set covidSuccessCountOld=(SELECT count(*) from covidinfo  WHERE (deptid=old.deptid AND firstInoculation='true' AND secondInoculation='true' AND threeInoculation='true'));


-- 更新
update dept set countCovid=covidSuccessCount where id=new.deptid;

update dept set countCovid=covidSuccessCountOld where id=old.deptid;

set oldNoCovid=(select DISTINCT count(*) as noCovid from covidinfo,
      depall WHERE covidinfo.threeInoculation='false' AND 
      depall.dno=covidinfo.depallid AND depallid=old.depallid );

set newNoCovid=(select DISTINCT count(*) as noCovid from covidinfo,
      depall WHERE covidinfo.threeInoculation='false' AND 
      depall.dno=covidinfo.depallid AND depallid=new.depallid );

UPDATE  depall set noCovid=oldNoCovid WHERE dno =OLD.depallid;

UPDATE  depall set noCovid=newNoCovid WHERE dno =new.depallid;




end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table dept
-- ----------------------------
DROP TRIGGER IF EXISTS `update`;
delimiter ;;
CREATE TRIGGER `update` AFTER UPDATE ON `dept` FOR EACH ROW BEGIN
-- 获取部门号
DECLARE dpno int(255);
-- 获取团队总人数
DECLARE allCount int(255);
-- 存放接种完毕的人数
DECLARE allCovid int(255);
-- 获取团队总人数和接种人数对比
DECLARE deptCount int(255);
-- 总人数修改时 修改部门人数
set dpno=(select deptno from dept WHERE dept.id=new.id);
set allCount=(select  sum(dept.count) from dept where dept.deptno=dpno);
UPDATE depall SET count=allCount WHERE dno=dpno;
-- 部门团队人数修改
update depall set groupCount=(select count(*) from dept where deptno=new.deptno) WHERE dno=new.deptno;
-- 判断是否全部疫苗接种完 如果接种完 部门就设置全部接种为true
set allCovid=(select countCovid from dept where id =new.id);
set deptCount=(select count from dept where id =new.id);
if(allCovid=deptCount) then 
update depall set isAllCovid ='true' where dno=dpno;
else update depall set isAllCovid ='false' where dno=dpno;
end if;

END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table dept
-- ----------------------------
DROP TRIGGER IF EXISTS `delSalary`;
delimiter ;;
CREATE TRIGGER `delSalary` AFTER DELETE ON `dept` FOR EACH ROW begin 
delete from employesalary WHERE deptno=old.deptno AND deptid=old.id;

delete from covidinfo WHERE  deptid=old.id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table dept
-- ----------------------------
DROP TRIGGER IF EXISTS `salary`;
delimiter ;;
CREATE TRIGGER `salary` AFTER INSERT ON `dept` FOR EACH ROW BEGIN
INSERT INTO `employesalary`(`deptno`, `deptid`) VALUES (new.deptno, new.id);
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table employee
-- ----------------------------
DROP TRIGGER IF EXISTS `triggercountdelete`;
delimiter ;;
CREATE TRIGGER `triggercountdelete` AFTER DELETE ON `employee` FOR EACH ROW begin
declare newcoun int(255);
-- 删除后更新总数
set newcoun=(select count(*) from employee,dept where employee.deptno=dept.id and employee.deptno=old.deptno);
update dept  set  count =newcoun where dept.id=old.deptno;
-- 删除员工明细
delete from employesalarydetail where employno=old.employno AND deptno=old.deptno;
-- 删除员工疫苗表
delete from covidinfo where employid=old.employno AND deptid=old.deptno;
end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table employee
-- ----------------------------
DROP TRIGGER IF EXISTS `triggercountupdate`;
delimiter ;;
CREATE TRIGGER `triggercountupdate` AFTER UPDATE ON `employee` FOR EACH ROW begin
declare newcoun int(255);
declare oldcoun int(255);
declare newDepallid int(255);

set newcoun=(select count(*) from employee,dept where employee.deptno=dept.id and employee.deptno=new.deptno);
update dept  set  count =newcoun where dept.id=new.deptno;

set oldcoun=(select count(*) from employee,dept where employee.deptno=dept.id and employee.deptno=old.deptno);
update dept  set  count =oldcoun where dept.id=old.deptno;

-- 删掉之前的薪资信息
DELETE from employesalarydetail WHERE employno=old.employno AND deptno=old.deptno;
-- 工资细节插入新的
INSERT INTO `employesalarydetail`(`deptno`, `employno`, `employname`,`salary`) VALUES (new.deptno, new.employno, new.employname,new.employsalary);
set newDepallid=(SELECT DISTINCT d.deptno from dept d,depall de WHERE d.id=new.deptno);
UPDATE `covidinfo` SET `depallid` = newDepallid,deptid=new.deptno  WHERE `deptid` =old.deptno AND `employid` = old.employno;

end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table employee
-- ----------------------------
DROP TRIGGER IF EXISTS `triggercountadd`;
delimiter ;;
CREATE TRIGGER `triggercountadd` AFTER INSERT ON `employee` FOR EACH ROW begin
declare newcoun int(255);
-- 查询新员工的部门号
declare depaid int (255);
-- 更新小组总数
set newcoun=(select count(*) from employee,dept where employee.deptno=dept.id and employee.deptno=new.deptno);
update dept  set  count =newcoun where dept.id=new.deptno;

-- 工资细节插入新的
INSERT INTO `employesalarydetail`(`deptno`, `employno`, `employname`,`salary`) VALUES (new.deptno, new.employno, new.employname,new.employsalary);


-- 查询新员工部门号用于插入到疫苗表
set depaid=(select DISTINCT dept.deptno from dept WHERE id=new.deptno);
-- 插入数据到疫苗表
INSERT INTO `covidinfo`(`depallid`, `deptid`, `employid`, `firstInoculation`, `secondInoculation`, `threeInoculation`) VALUES (depaid, new.deptno, new.employno, 'false', 'false', 'false');
end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table employesalary
-- ----------------------------
DROP TRIGGER IF EXISTS `changeUse`;
delimiter ;;
CREATE TRIGGER `changeUse` AFTER UPDATE ON `employesalary` FOR EACH ROW begin

DECLARE isusesub VARCHAR(10);

set isusesub=(select isuse from employesalary where deptid=new.deptid);

UPDATE employesalarydetail SET  usePerformance=new.performance WHERE deptno =new.deptid;
update  employee  set isuse=isusesub WHERE deptno=new.deptid;
update  employesalarydetail  set isuse=isusesub WHERE deptno=new.deptid;


END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table employesub
-- ----------------------------
DROP TRIGGER IF EXISTS `changeSub`;
delimiter ;;
CREATE TRIGGER `changeSub` AFTER UPDATE ON `employesub` FOR EACH ROW begin

update  employesalary SET socialSub=new.socialSub,houseSub=new.houseSub,eatSub=new.eatSub,transSub=new.transSub,hotSub=new.hotSub;

end
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;

SET NAMES UTF8;
DROP DATABASE IF EXISTS bookbase;
CREATE DATABASE bookbase CHARSET=UTF8;
USE bookbase;

CREATE TABLE b_user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uuid VARCHAR(12),
    u_name VARCHAR(32),
    u_pwd VARCHAR(32)
);

CREATE TABLE b_user_info(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uuid VARCHAR(12),
    sex INT,
    age INT
);

CREATE TABLE books(
    id INT PRIMARY KEY AUTO_INCREMENT,
    b_id VARCHAR(12),
    b_name VARCHAR(32),
    b_author VARCHAR(32),
    b_img VARCHAR(32),
    b_category VARCHAR(32),
    b_descript VARCHAR(300)
);

CREATE TABLE chapter(
    id INT PRIMARY KEY AUTO_INCREMENT,
    b_id VARCHAR(12),
    b_chapter INT,
    b_chapter_name VARCHAR(60),
    info text
);

INSERT INTO  b_user VALUES(
    NULL, '000000', 'tianzun', '993436'
);

INSERT INTO books VALUES(
    NULL, '0000', '凡人修仙传', '忘语', 'http://img/0000.png', '仙侠、武侠、玄幻', '《凡人修仙传》是网络作家忘语连载于起点中文网的一部玄幻修仙型小说。小说讲述了一个普通的山村穷小子，偶然之下，跨入到一个江湖小门派，成了一名记名弟子。虽然资质平庸，但依靠自身的坚持不懈和合理算计一步步渐成大道。'
);

INSERT INTO chapter VALUES(
    NULL, '0000', 1, '山边小村', '二愣子睁大着双眼，直直望着茅草和烂泥糊成的黑屋顶，身上盖着的旧棉被，已呈深黄色，看不出原来的本来面目，还若有若无的散发着淡淡的霉味。
在他身边紧挨着的另一人，是二哥韩铸，酣睡的十分香甜，从他身上不时传来轻重不一的阵阵打呼声。
离床大约半丈远的地方，是一堵黄泥糊成的土墙，因为时间过久，墙壁上裂开了几丝不起眼的细长口子，从这些裂纹中，隐隐约约的传来韩母唠唠叨叨的埋怨声，偶尔还掺杂着韩父，抽旱烟杆的“啪嗒”“啪嗒”吸允声。
二愣子缓缓的闭上已有些发涩的双目，迫使自己尽早进入深深的睡梦中。他心里非常清楚，再不老实入睡的话，明天就无法早起些了，也就无法和其他约好的同伴一起进山拣干柴。
二愣子姓韩名立，这么像模像样的名字,他父母可起不出来，这是他父亲用两个粗粮制成的窝头，求村里老张叔给起的名字。
老张叔年轻时，曾经跟城里的有钱人当过几年的伴读书童，是村里唯一认识几个字的读书人，村里小孩子的名字，倒有一多半是他给起的。
韩立被村里人叫作“二愣子”，可人并不是真愣真傻，反而是村中首屈一指的聪明孩子，但就像其他村中的孩子一样，除了家里人外，他就很少听到有人正式叫他名字“韩立”，倒是“二愣子”“二愣子”的称呼一直伴随至今。
而之所以被人起了个“二愣子”的绰号，也只不过是因为村里已有一个叫“愣子”的孩子了。
这也没啥，村里的其他孩子也是“狗娃”“二蛋”之类的被人一直称呼着，这些名字也不见得比“二愣子”好听了哪里去。
因此，韩立虽然并不喜欢这个称呼，但也只能这样一直的自我安慰着。'
);
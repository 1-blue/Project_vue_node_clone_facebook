/* DB생성 */
CREATE DATABASE cloneFacebook DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

/*  유저검색 */
use mysql;
SELECT user, host FROM user;

/*  유저생성 및 권한부여 */
CREATE user 'facebookUser'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON cloneFacebook.* TO 'facebookUser'@'localhost';
flush privileges;

/* 권한확인 */
SHOW GRANTS FOR 'facebookUser'@'localhost';
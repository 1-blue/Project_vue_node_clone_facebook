const Sequelize = require("sequelize");

module.exports = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        _id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          comment: "이미지의 아이디 ( 게시글를 식별할 값 )",
        },
        name: {
          type: Sequelize.STRING(30),
          allowNull: true,
          comment: "이미지 파일명"
        },
        kinds: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "어떤 이미지인지 ( 0:프로필, 1:커버, 2:게시글 )"
        }
      },
      {
        sequelize, // 요거안넣으면 오류남
        timestamps: true, // createdAt, updatedAt, deleteAt 자동으로 넣어줄지
        paranoid: false, // 삭제해도 데이터남겨둘지말지 deleteAt에 시간만 적어짐
        underscored: false, // 대문자 _  뭘로구분할지지정
        modelName: "Image", // sequelize에서 사용할 모델명
        tableName: "images", // 실제 DB에서 사용할 테이블명
        charset: "utf8", // 한글가능..           밑에꺼랑 둘다 mb4붙이면 특수문자도 입력가능
        collate: "utf8_general_ci", // charset과 같은의미인것같은데
      },
    );
  }

  static associate(db) {
    // 이미지와 유저  ( 1 : N )
    db.Image.belongsTo(db.User, { forginKey: "userId", targetKey: "_id", onDelete: "CASCADE" });

    // 이미지와 게시글 ( 1 : N )
    db.Image.belongsTo(db.Post, { forginKey: "postId", targetKey: "_id", onDelete: "CASCADE" });
  }
};

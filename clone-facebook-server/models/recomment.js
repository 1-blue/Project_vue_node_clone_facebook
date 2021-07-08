const Sequelize = require("sequelize");

module.exports = class Reomment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        _id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          comment: "대댓글의 아이디 ( 대댓글을 식별할 값 )",
        },
        contents: {
          type: Sequelize.STRING(100),
          allowNull: false,
          comment: "대댓글의 내용 ( 100자 이내 )"
        }
      },
      {
        sequelize, // 요거안넣으면 오류남
        timestamps: true, // createdAt, updatedAt, deleteAt 자동으로 넣어줄지
        paranoid: false, // 삭제해도 데이터남겨둘지말지 deleteAt에 시간만 적어짐
        underscored: false, // 대문자 _  뭘로구분할지지정
        modelName: "Recomment", // sequelize에서 사용할 모델명
        tableName: "recomments", // 실제 DB에서 사용할 테이블명
        charset: "utf8", // 한글가능..           밑에꺼랑 둘다 mb4붙이면 특수문자도 입력가능
        collate: "utf8_general_ci", // charset과 같은의미인것같은데
      },
    );
  }

  static associate(db) {
    // 대댓글과 유저 ( 1 : N )
    db.Recomment.belongsTo(db.User, { forginKey: "userId", targetKey: "_id", onDelete: "CASCADE" });
    
    // 대댓글과 댓글 ( 1 : N )
    db.Recomment.belongsTo(db.Comment, { forginKey: "commentId", targetKey: "_id", onDelete: "CASCADE" });
  }
};

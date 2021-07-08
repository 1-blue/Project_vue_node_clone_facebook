const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        _id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          comment: "댓글의 아이디 ( 댓글을 식별할 값 )",
        },
        contents: {
          type: Sequelize.STRING(100),
          allowNull: false,
          comment: "댓글의 내용 ( 100자 이내 )"
        }
      },
      {
        sequelize, // 요거안넣으면 오류남
        timestamps: true, // createdAt, updatedAt, deleteAt 자동으로 넣어줄지
        paranoid: false, // 삭제해도 데이터남겨둘지말지 deleteAt에 시간만 적어짐
        underscored: false, // 대문자 _  뭘로구분할지지정
        modelName: "Comment", // sequelize에서 사용할 모델명
        tableName: "comments", // 실제 DB에서 사용할 테이블명
        charset: "utf8", // 한글가능..           밑에꺼랑 둘다 mb4붙이면 특수문자도 입력가능
        collate: "utf8_general_ci", // charset과 같은의미인것같은데
      },
    );
  }

  static associate(db) {
    // 댓글과 유저 ( 1 : N )
    db.Comment.belongsTo(db.User, { forginKey: "userId", targetKey: "_id", onDelete: "CASCADE" });

    // 댓글과 포스트 ( 1 : N )
    db.Comment.belongsTo(db.Post, { forginKey: "postId", targetKey: "_id", onDelete: "CASCADE" });
    
    // 댓글과 대댓글 ( 1 : N )
    db.Comment.hasMany(db.Recomment, { forginKey: "commentId", targetKey: "_id", onDelete: "CASCADE" });
  }
};

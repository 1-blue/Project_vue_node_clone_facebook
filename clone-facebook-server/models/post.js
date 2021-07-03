const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        _id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          comment: "게시글의 아이디 ( 게시글를 식별할 값 )",
        },
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
          comment: "게시글의 제목 ( 20자 이내 )"
        },
        contents: {
          type: Sequelize.STRING(200),
          allowNull: false,
          comment: "게시글의 내용 ( 200자 이내 )"
        }
      },
      {
        sequelize, // 요거안넣으면 오류남
        timestamps: true, // createdAt, updatedAt, deleteAt 자동으로 넣어줄지
        paranoid: false, // 삭제해도 데이터남겨둘지말지 deleteAt에 시간만 적어짐
        underscored: false, // 대문자 _  뭘로구분할지지정
        modelName: "Post", // sequelize에서 사용할 모델명
        tableName: "posts", // 실제 DB에서 사용할 테이블명
        charset: "utf8", // 한글가능..           밑에꺼랑 둘다 mb4붙이면 특수문자도 입력가능
        collate: "utf8_general_ci", // charset과 같은의미인것같은데
      },
    );
  }

  static associate(db) {
    // 게시글과 이미지 ( 1 : N )
    db.Post.hasMany(db.Image, { forginKey: "postId", targetKey: "_id", onDelete: "CASCADE" });
    
    // 게시글과 유저
    db.Post.belongsTo(db.User, { forginKey: "postId", targetKey: "_id", onDelete: "CASCADE" });

    // 게시글과 좋아요 ( 1 : 1 )
    db.Post.hasMany(db.Like, { forginKey: "postId", targetKey: "_id", onDelete: "CASCADE" });

    // 포스트와 댓글 ( 1 : N )
    db.Post.hasMany(db.Comment, { forginKey: "postId", targetKey: "_id", onDelete: "CASCADE" });
  }
};

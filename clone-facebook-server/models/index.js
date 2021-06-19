const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const User = require("./user.js");
const Like = require("./like.js");
const Post = require("./post.js");
const Comment = require("./comment.js");
const Recomment = require("./recomment.js");
const Friend = require("./friend.js");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
); // db와 node.js연결

db.sequelize = sequelize;

db.User = User;
db.Like = Like;
db.Post = Post;
db.Comment = Comment;
db.Recomment = Recomment;
db.Friend = Friend;

db.User.init(db.sequelize);
db.Like.init(db.sequelize);
db.Post.init(db.sequelize);
db.Comment.init(db.sequelize);
db.Recomment.init(db.sequelize);
db.Friend.init(db.sequelize);

db.User.associate(db);
db.Like.associate(db);
db.Post.associate(db);
db.Comment.associate(db);
db.Recomment.associate(db);
db.Friend.associate(db);

module.exports = db; // db객체에 sequelize, model모두 넣어두고 db를 require해서 편하게 사용

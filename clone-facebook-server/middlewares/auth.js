function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ message: "로그인후에 접근해주세요" });
  }
}

function isNotLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ message: "이미 로그인한 상태입니다. 로그아웃후에 시도해주세요" });
  }
}

module.exports = {
  isLoggedIn,
  isNotLoggedIn
}
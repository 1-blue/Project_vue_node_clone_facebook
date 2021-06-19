require("dotenv").config();
const router = require("express").Router();
const createJWT = require("../middlewares/createJWT.js");

router.post("/", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ msg: "success", token: createJWT() });
  }
  return res.status(401).json({ msg: "fail" });
});

module.exports = router;

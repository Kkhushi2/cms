var express = require("express");
const pool = require("./pool");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  pool.query("select * from category", (err, result) => {
    console.log(req.query)
    if (err) {
      console.log(err)
      res.render("user/homepage", { data: [] });
    } else {
      res.render("user/homepage", { data: result });
    }
  });
});

module.exports = router;

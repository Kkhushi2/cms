var express = require('express');
var router = express.Router();
var pool = require("./pool")
var upload = require("./multer")

/* GET home page. */
router.get('/category', function (req, res, next) {
  res.render('Category/addcategory', { msg: "" });
});

router.post('/submit', upload.single("picture"), function (req, res, next) {
  console.log( req.file),
  pool.query("insert into category(categoryname,picture) values(?,?)", [req.body.categoryname, req.file.filename],
    function (err, result) {
      if (err) {
        res.render("category/addcategory", { msg: 'Record Not Submitted' })
      }
      else {
        res.render("category/addcategory", { msg: 'Record  Submitted' })
      }
    })
});
router.get('/display',  function (req, res, next) {
  pool.query("select * from category",function (err, result) {
      if (err) {
        res.render("category/dispaly", { data:[] })
      }
      else {
        res.render("category/display", { data:result })
      
      }
    })
});
router.get('/displaybyid',  function (req, res, next) {
  pool.query("select * from category where categoryid=?",[req.query.categoryid],function (err, result) {
      if (err) {
        res.render("category/edit", { data:[] })
      }
      else {
        res.render("category/edit", { data:result[0] })
      
      }
    })
});
router.post('/edit',  function (req, res, next) {
  pool.query("update category set categoryname=? where categoryid=?",[req.body.categoryname,req.body.categoryid],function (err, result) {
    console.log(req.body)
     res.redirect("/category/display")
    
     
    })
});
router.post('/updatepicture', upload.single("picture"), function (req, res, next) {
  pool.query("update category set picture=? where categoryid=?",[req.file.filename,req.body.categoryid],function (err, result)
   {
    console.log(req.query)
     res.redirect("/category/display")
    
     
    })
});
router.get('/displaypicture',  function (req, res, next) {
  pool.query("select * from category where categoryid=?",[req.query.categoryid],function (err, result) {
      if (err) {
        res.render("category/editpicture", { data:{} })
      }
      else {
        res.render("category/editpicture", { data:result[0] })
      
      }
    })
});
router.get('/delete',  function (req, res, next) {
  pool.query("delete from category where categoryid=?",[req.query.categoryid],function (err, result) {
    console.log(req.query)
    res.redirect("/category/display")
   
    
    })
});
router.get('/displayJSON',  function (req, res, next) {
  pool.query("select * from category",function (err, result) {
      if (err) {
        res.status(500).json({status:false})
      }
      else {
        res.status(200).json({status:true,data:result})
      
      }
    })
});
module.exports = router;



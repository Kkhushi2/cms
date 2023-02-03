var express = require('express');
var router = express.Router();
var pool = require("./pool")
var upload = require("./multer")

/* GET home page. */
router.get('/subcategory', function(req, res, next) {
  res.render('subcategory/subcategory', { msg: "" });
});
router.post('/submit', upload.single("picture"), function (req, res, next) {
  console.log( req.file),
  pool.query("insert into subcategory(subcategoryname,categoryid,description,status,picture) values(?,?,?,?,?)", [req.body.subcategoryname,req.body.categoryid,req.body.description,req.body.status, req.file.filename],
    function (err, result) {
      if (err) {
        res.render("subcategory/subcategory", { msg: 'Record Not Submitted' })
      }
      else {
        res.render("subcategory/subcategory", { msg: 'Record  Submitted' })
      }
    })
});
router.get('/display',  function (req, res, next) {
  pool.query("select * from subcategory",function (err, result) {
      if (err) {
        res.render("subcategory/dispaly", { data:[] })
      }
      else {
        res.render("subcategory/display", { data:result })
      
      }
    })
});
router.get('/displaybyid',  function (req, res, next) {
  pool.query("select * from subcategory where subcategoryid=?",[req.query.subcategoryid],function (err, result) {
      if (err) {
        res.render("subcategory/edit", { data:[] })
      }
      else {
        res.render("subcategory/edit", { data:result[0] })
      
      }
    })
});
router.post('/edit',  function (req, res, next) {
  pool.query("update subcategory set subcategoryname=?, categoryid=?, description=?,status=?,picture=? where subcategoryid=?",[req.body.subcategoryname,req.body.categoryid,req.body.description,req.body.status,req.body.picture,req.body.subcategoryid],function (err, result) {
    console.log(req.body)
     res.redirect("/subcategory/display")
    
     
    })
});
router.post('/updatepicture', upload.single("picture"), function (req, res, next) {
  pool.query("update subcategory set picture=? where subcategoryid=?",[req.file.filename,req.body.subcategoryid],function (err, result)
   {
    console.log(req.query)
     res.redirect("/subcategory/display")
    
     
    })
});
router.get('/displaypicture',  function (req, res, next) {
  pool.query("select * from subcategory where subcategoryid=?",[req.query.subcategoryid],function (err, result) {
      if (err) {
        res.render("subcategory/editpicture", { data:{} })
      }
      else {
        res.render("subcategory/editpicture", { data:result[0] })
      
      }
    })
});
router.get('/delete',  function (req, res, next) {
  pool.query("delete from subcategory where subcategoryid=?",[req.query.subcategoryid],function (err, result) {
    console.log(req.query)
    res.redirect("/subcategory/display")
   
    
    })
});
router.get('/displayJSON',  function (req, res, next) {
  pool.query("select * from subcategory where categoryid=?",[req.query.categoryid],function (err, result)
   {console.log(err)
      if (err) {
        res.status(500).json({status:false})
      }
      else {
        console.log(result)
        res.status(200).json({status:true,data:result})
      
      }
    })
});
router.get('/displayJSONbyproductid',  function (req, res, next) {
  pool.query("select * from subcategory where categoryid in(select categoryid from products where productid=?)",[req.query.productid],function (err, result)
   {console.log(err)
      if (err) {
        res.status(500).json({status:false})
      }
      else {
        console.log(result)
        res.status(200).json({status:true,data:result})
      
      }
    })
});

module.exports = router;

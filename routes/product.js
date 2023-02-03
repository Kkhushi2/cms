var express = require('express');
var router = express.Router();
var pool = require("./pool")
var upload = require("./multer")

/* GET home page. */
router.get('/product', function (req, res, next) {
  res.render('product/addproduct', { msg: "" });
});

router.post('/submit', upload.single("picture"), function (req, res, next) {
  console.log( req.file),
  pool.query("insert into products(categoryid,subcategoryid,productname,description,price,offerprice,color,size,stock,picture,status) values(?,?,?,?,?,?,?,?,?,?,?)", [req.body.categoryid,req.body.subcategoryid,req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.color,req.body.size,req.body.stock, req.file.filename,req.body.status],
    function (err, result) {
     
      if (err) {
        console.log(err)
        res.render("product/addproduct", { msg: 'Record Not Submitted' })
      }
      else {
        res.render("product/addproduct", { msg: 'Record  Submitted' })
      }
    })
});
router.get('/display',  function (req, res, next) {
  pool.query("select * from products",function (err, result) {
      if (err) {
        res.render("product/dispaly", { data:[] })
      }
      else {
        res.render("product/display", { data:result })
      
      }
    })
});
router.get('/displaybyid',  function (req, res, next) {
  pool.query("select * from products where productid=?",[req.query.productid],function (err, result) {
      if (err) {
        res.render("product/edit", { data:[] })
      }
      else {
        res.render("product/edit", { data:result[0] })
      
      }
    })
});
router.post('/edit',  function (req, res, next) {
  pool.query("update products set productname=?,categoryid=?,subcategoryid,description=?,price=?,offerprice=?,color=?,size=?,stock=?,picture=?,status=? where productid=?",[req.body.productname,req.body.categoryid,req.body.subcategoryid,req.body.description,req.body.price,req.body.offerprice,req.body.color,req.body.size,req.body.stock,req.body.picture,req.body.status,req.body.productid],function (err, result) {
    console.log(req.body)
     res.redirect("/product/display")
    
     
    })
});
router.post('/updatepicture', upload.single("picture"), function (req, res, next) {
  pool.query("update products set picture=? where productid=?",[req.file.filename,req.body.productid],function (err, result)
   {
    console.log(req.query)
     res.redirect("/product/display")
    
     
    })
});
router.get('/displaypicture',  function (req, res, next) {
  pool.query("select * from products where productid=?",[req.query.productid],function (err, result) {
      if (err) {
        res.render("product/editpicture", { data:{} })
      }
      else {
        res.render("product/editpicture", { data:result[0] })
      
      }
    })
});
router.get('/displaypicture',  function (req, res, next) {
  pool.query("select * from products where productid=?",[req.query.productid],function (err, result) {
      if (err) {
        res.render("product/editpicture", { data:{} })
      }
      else {
        res.render("product/editpicture", { data:result[0] })
      
      }
    })
});
router.get('/delete',  function (req, res, next) {
  pool.query("delete from products where productid=?",[req.query.productid],function (err, result) {
    console.log(req.query)
    res.redirect("/product/display")
   
    
    })
});

module.exports = router;



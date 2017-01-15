var express = require('express');
var router = express.Router();
var getProductsFeed = require('../getProductsFeed');
var url = "http://affiliate-feeds.snapdeal.com/feed/133091.json";
var categories = [];

getProductsFeed(url,function(data){
  var jData = JSON.parse(data);
  var categoriesList = Object.keys(jData.apiGroups.Affiliate.listingsAvailable);
  for(var i=0;i<categoriesList.length;i++)
  {
    var a = {
      title:categoriesList[i],
      get:jData.apiGroups.Affiliate.listingsAvailable[categoriesList[i]].listingVersions.v1.get,
    };
    categories.push(a);
  }
});

/* GET home page. */
router.get('/', function(req, res) {
    res.render('categories',{categories:categories});
});

router.get('/products/:id',function(req,res){
  var products = [];
  for(var i=0;i<categories.length;i++)
  {
    if(req.params.id == categories[i].title)
    {
    getProductsFeed(categories[i].get,function(data){
      var jData = JSON.parse(data);
      var productsList = jData.products;
      for(var i=0;i<productsList.length;i++)
      {
        var a = {
          pTitle:productsList[i].title,
          pLink:productsList[i].link,
          pBrand:productsList[i].brand,
          pImageLink:productsList[i].imageLink,
          pMRP:productsList[i].mrp,
          pInStock:productsList[i].availability,
          pCategoryName:productsList[i].categoryName
        };
        products.push(a);
      }
      res.render('products',{products:products,title:req.params.id});
    });
   
   }//if loop
  }//for loop
});

router.get('*',function(req,res){
  res.render('error');
});

module.exports = router;

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.connect(' mongodb://127.0.0.1:27017/shoppingcart',{ useNewUrlParser: true });

var productSchema = new mongoose.Schema({
    product_name:String,
    descriptin:String,
    price:Number
});

var Product = mongoose.model('product',productSchema);



module.exports.productRoute=function(app){

    app.get("/admin",(req,res)=>{
        Product.find({},function(err,data){
            res.render('admin.ejs',{products:data});
        });
       
    });

    app.post("/admin",urlencodedParser,(req,res)=>{
        var product = new Product();
        product.product_name = req.body.product_name;
        product.descriptin = req.body.description;
        product.price = req.body.price;
        product.save(function(err,data){
            if(err) throw err;
            res.send({msg:"Successfully created"});
        });
    });

    app.delete("/admin/:product",(req,res)=>{
        
        Product.deleteOne({product_name:req.params.product},function(err,data){
            if (err) throw err;
           
            res.send({msg:"Sucessfully deleted"});
        });
       
    });

}
module.exports.productModel=Product;
var express = require('express');

var productController = require('./controllers/productController');




var app = express();
app.set('view engine','ejs');
app.use(express.static('./public'));

// product crud by admin
var Product = productController.productModel;
productController.productRoute(app);

// var c =[];
var carts =[];

// index page
app.get("/",(req,res)=>{
    
    
    Product.find({}).lean().exec(function(err,data){
        if(err) throw err;
       
        data.forEach(function(product){
            product.qty=1;
            product.total=product.price*product.qty;
            if(product.product_name==req.query.product_name){
                
                var check =carts.filter(function(cart){
                        return cart.product_name == req.query.product_name;
                });
                if(carts.length==0 || check.length==0){
                    
                    carts.push(product);
                }
                else{
                    carts.forEach(function(cart){

                        if(cart.product_name==req.query.product_name){
                            cart.qty+=1;
                            cart.total=cart.qty*cart.price;
                            
                        }
                          
                    });  
                }              
            }  
        });
    res.render('index.ejs',{products:data,cart:carts});

    });

});

app.get('/cart',function(req,res){
    
    if(req.query.action=="increase"){
        carts.forEach(function(cart){
            if(req.query.product_name==cart.product_name){
                cart.qty++;
                cart.total= cart.qty*cart.price;
            }
        });
       
    }
    else if(req.query.action=="decrease"){
        carts.forEach(function(cart){
            if(req.query.product_name==cart.product_name){

                if(cart.qty>0){
                    cart.qty--;
                
                }
                else{
                    cart.qty=0;
                }
                cart.total= cart.qty*cart.price;
                
            }
        });
    }
    else if(req.query.action=="remove"){
        carts =carts.filter(function(cart){
            return cart.product_name != req.query.product_name;
        });
    }
    res.redirect('/');
    
}); 




app.listen(3001);
console.log("Server is linstening 3001 port");
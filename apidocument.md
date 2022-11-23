//page 1

>List of category  
  http://localhost:5500/category
         


//page 2

>products wrt category 
http://localhost:5500/products/1

>product wrt to brand  
http://localhost:5500/product?category=1&brand=apple      

>product wrt to ram       
 http://localhost:5500/product?category=1&ram=6    

>product wrt to storage    
 http://localhost:5500/product?category=1&storage=256   

>product wrt to processor  
 http://localhost:5500/product?category=2&processor=intel%20i5   

>product wrt color   
 http://localhost:5500/product?category=3&colour=black         

>product wrt to type    
 http://localhost:5500/product?category=3&type=shirt      

>book wrt to author      
 http://localhost:5500/product?category=5&author=J.K.Rowling  

>product wrt to cost
 http://localhost:5500/filter/2?lcost=20000&hcost=40000


>Sort on basis of cost
 http://localhost:5500/filter/1?lcost=5000&hcost=10000&sort


//page 3

>detail of product   
 http://localhost:5500/productdetail/5   



//page 4

>checkout details(POST) 
http://localhost:5500/checkout

>place order(POST)       
 http://localhost:5500/placeorder     


//page 5

>list of orders  
 http://localhost:5500/orders      

>list of orders wrt to email  
 http://localhost:5500/order?email=gogul@gmail.com

>update payment details(PUT)
 http://localhost:5500/updateorder/2

>delete order(Delete)
 http://localhost:5500/deleteorder/637d7417e39ec1a908180472


 LIVE API URL FOR AMAZON PROJECT:

 https://amazonapi.onrender.com


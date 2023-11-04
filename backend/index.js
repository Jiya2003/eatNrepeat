const express= require('express');
const app=express();
const port= 5000;
//const cors= require('cors')
const mongoDB= require("./db")

mongoDB();

//app.use(cors);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)

})
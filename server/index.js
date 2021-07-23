const express=require('express');
const app=express();
const mysql=require('mysql');
const cors=require('cors');
app.use(cors());
app.use(express.json());

const{encrypt,decrypt}= require("./EncryptionHandler");

const db=mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'password',
    database:'passwordmanager'

});

app.post("/addpassword",function(req,res)
{
const{password,title}=req.body;
const hashedPassword=encrypt(password);

db.query(
    "INSERT INTO passwords (password, title,iv) VALUES (?,?,?)",
[hashedPassword.password,title,hashedPassword.iv],
(err,result)=>
{
    if(err)
    {
        console.log(err);
    }
    else{
        res.send("Success");
    }
}
);
});

app.get("/showpasswords",(req,res)=>
{
    db.query("SELECT * FROM passwords;",(err,result)=>
    {
       if(err)
       {
           console.log(err);
       }
       else{
          res.send(result);
       }
    });

});

app.post("/decryptpassword",function(req,res)
{
 res.send(decrypt(req.body));
});




app.listen(3001,function()
{
    console.log("server started");
});

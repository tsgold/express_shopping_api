const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'project_purwadhika'
})

db.connect();

app.post('/customer', (req, res) => {
    let sql = 'INSERT INTO data_customer SET ?';
    db.query( sql, req.body, (err, result)=> {
        if(err){
            console.log(error);
            res.send({
                message: "error",
                result: "data salah !"
            });
        }
        res.send({
            message: "Success",
            result: result
        })
    })
} )

app.get('/customer', (req, res)=> {
    let sql = 'SELECT * FROM data_customer';
    db.query(sql, (err, result)=> {
        if(err){
            console.log(error);
            res.send({
                message: "Error",
                result: "data salah !"
            })
        }
        res.send({
            message: "Success",
            result: result
        })
    }) 
})

// app.post('/cart', (req, res)=> {
//     let sql = 'INSERT INTO data_cart SET ?';
//     let body = req.body;
//     try{
//         body.cart.map((v,i)=>{
//             db.query(sql,v,(err, result)=>{
//                 console.log(err);
//                 res.send({
//                     message:"Success Insert",
//                     result: result
//                 })
//             })
//         })
//     }catch(err){
//         res.send({
//             message: "Failed Insert",
//             result: "Error Insert"
//         })
//     }
// })

//cara pertama
// app.post('/cart', (req, res)=>{
//     let body = req.body.cart
//     try {
//         body.map((v,i)=>{
//             let sql = "INSERT INTO `data_cart`(`email`,`product_id`,`product_name`,`qty`,`harga`) VALUES "
//             sql += "('"+v.email+"','"+v.product_id+"', '"+v.product_name+"',"+v.qty+", "+v.harga+")";
//             db.query(sql, (err, result)=> {
//                 console.log(err);
//             }
//             )}
//         )   
//         res.send({
//             message: "Berhasil Insert",
//         })
//     } catch (error) {
//         console.log(error);
//         res.send({
//             message: "Gagal",
//             result:"Gagal Insert"
//         })
        
//     }
// })

//cara kedua
app.post('/cart', (req, res)=>{
    let sql = "INSERT INTO data_cart(email, product_id, product_name,qty,harga) VALUES ?";
    let body = req.body.cart;
    let values = [];
    body.map((v,i)=>{
        let values2 = [];
        for(let[key,value]of Object.entries(v)){
            values2.push(value)
        }
        values.push(values2);
    })

    db.query(sql,[values],(err, result)=>{
        if(err){
            res.send({
                message:"Gagal Insert",
                result:[]
            })
        }else{
            res.send({
                message:"Success Insert",
                result:result.affectedRows
            })
        }
    })
})


app.listen(3000, () => {
    console.log('server @port 3000')
})
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database: 'project_purwadhika'
})

db.connect((err)=> {
    if(err) throw err
});

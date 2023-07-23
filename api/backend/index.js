const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}));

const connection = mysql.createConnection({
  host: 'db',
  user: 'username',
  password: 'password',
  database: 'appname'
});

app.post("/api", (req, res) => {
  const name = "%"+req.body.title+"%"
  const sql = "SELECT * FROM users where name like ?";
  console.log(req)
  connection.query(
    sql,
    name,
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({message: results});
    }
  );
});

app.post("/api/new", (req, res) => {
  const sql = "INSERT INTO users (name,  password, mailAdress, updateDate) VALUES (?, ?, ?, ?)";
  const nowdate = new Date();
  console.log(req)
  connection.query(
    sql,
    [req.body.name, req.body.password, req.body.email,nowdate],
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({message: results});
    }
  );
});

app.post("/api/update", (req, res) => {
  const sql = "UPDATE users SET name = ?, password = ?, mailAdress = ?, updateDate = ? WHERE id = ?";
  const nowdate = new Date();
  console.log(req)
  connection.query(
    sql,
    [req.body.name, req.body.password, req.body.email,nowdate, Number(req.body.id)],
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({message: results});
    }
  );
});

app.post("/api/delete", (req, res) => {
  const sql = "DELETE FROM  users WHERE id = ?";
  console.log(req)
  connection.query(
    sql,
    Number(req.body.id),
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({message: results});
    }
  );
});


app.listen(port, () => {
  console.log(`listening on *:${port}`);
})
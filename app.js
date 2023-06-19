const express = require("express");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const mysql = require("mysql2");

// require("dotenv").config();
const app = express();




//parsing middleware
/*parse application--Body parser is an npm module used to process data sent in an HTTP request body.
 It provides four middleware for parsing JSON, Text, URL-encoded, and raw data sets over an HTTP request body.*/
app.use(bodyparser.urlencoded({
  extended : true
}));








//parse application/json
//  app.use(bodyparser.json());
app.use(express.static(__dirname+"/public"));




//connection to the database//
var db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"company"
})

db.connect(function(err){
    if(err){
      console.log("Not connected");
    }
    else{
      console.log("Heelo I m connected to database");
    }
})





//render front page//
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})



app.post("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html")
})

//add student details//
app.get("/add",(req,res)=>{
    res.sendFile(__dirname+"/add.html")
})

app.get('/addstudent', (req, res) => {

	db.query(`insert into user values('${req.query.id}', '${req.query.name}', '${req.query.course}')`,

		(err, result) => {

			if(err){
				res.send(err)
			}
      

			else{
				res.sendFile(__dirname + '/index.html')
			}
		})
})

  




 

  //search student//
  app.get("/search",(req,res)=>{
        res.sendFile(__dirname + "/search.html");
  })

  app.get("/searchstudent", (req, res) => {
    db.query(`SELECT name,course FROM user WHERE id = '${req.query.id}'`, (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error occurred while searching the record.");
      } 
      else {
        console.log("Record searched successfully.");
  
        // Generate HTML table dynamically based on result
        let table = '<table border="2px" height="30%" width="30%">';
        table += '<tr><td>Name</td><td>Course</td></tr>';
        
        for (let i = 0; i < result.length; i++) {
          table += `<tr><td>${result[i].name}</td><td>${result[i].course}</td></tr>`;
          
        }
        table += '</table>';
  
        res.send(table);
      }
    });
  });
  






//update student//
 
app.get("/update",(req,res)=>{
  res.sendFile(__dirname + "/update.html");
})

app.get("/updatestudent", (req, res) => {
db.query(`update user set course = '${req.query.new_course}' WHERE id = '${req.query.id}'`, (err, result) => {
    if(err){
      res.send(err)
    }

    else{
      res.sendFile(__dirname + '/index.html')
    }
});
});







//delete student//
app.get("/delete",(req,res)=>{
    res.sendFile(__dirname + "/delete.html");
})
app.get("/deletestudent", (req, res) => {
  db.query(`DELETE FROM user WHERE id = '${req.query.id}'`, (err, result) => {

    if(err){
      res.send(err)
    }

    else{
      res.sendFile(__dirname + '/index.html')
    }
  })
})

app.get('/getData', (req, res) => {

    db.query('select * from user', (err, result) => {

      res.json(result)
      // console.log(result)
    })
})








/*nodemon -->>Nodemon is a tool that helps developers build
 Node.js-based applications by automatically restarting the node application when file changes in the directory are detected.*/
app.listen(8080,()=>{
    console.log("listening on port sever 8080");
})

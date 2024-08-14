const express = require("express");
const app = express();
const path = require("path");
const users = require("./Routes/user.js");
const posts = require("./Routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
  secret: "Mysupersecretthing",
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.message = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.get("/reqcount", (req, res) => {
  if(req.session.count){
    req.session.count++;
  }else{
    req.session.count = 1;
  }
  res.send(`You sent a ${req.session.count} requests`);
});

app.get("/register", (req, res) => {
  let {name = "anonymous"} = req.query;
  req.session.name = name;
  
  if(name === 'anonymous'){
    req.flash('error', 'user not registered');
  }
  else{
    req.flash('success', 'user registered successfully');
  }

  res.redirect("/hello"); 
});

app.get("/hello", (req, res) => {
 
  res.render("page.ejs", { name: req.session.name });

});

// app.get("/test", (req, res) => {
//   res.send("test successful!");
// });




// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res) => {
//   res.cookie("made-in", "India", {signed: true});
//   res.send("signed cookie sent");
// });

// app.get("/verify" , (req, res) => {
//   console.log(req.cookies, req.signedCookies);
//   res.send("verified");
// });


// app.get("/greet", (req, res) => {
//   let {name = "Anonymous"} = req.cookies;
//   res.send("Hi, "+name);
// });

// app.get("/getcookie", (req, res) => {
//   res.cookie("Iam", "Harshil");
//   res.send("This is cookie route");
// });

// app.get("/" , (req, res) => {
//   console.dir(req.cookies);
//   res.send("This is root route");
// });

// app.use("/users", users);
// app.use("/posts", posts);


app.listen("3000", (req, res) => {
  console.log("Server is listening to 3000");
});
const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "mysecret",
    name: "my site",
    resave: false,
    saveUninitialized: true,
  })
);

const users = [
  { email: "akhil@gmail.com", password: "akhil123" },
  { email: "kumar@gmail.com", password: "kumar123" },
  { email: "rahul@gmail.com", password: "rahul123" },
  { email: "john@gmail.com", password: "john123" },
  { email: "ashiq@gmail.com", password: "ashiq123" },
  { email: "arun@gmail.com", password: "arun123" },
];

app.get("/", (req, res) => {
  if (req.session.isAuth) {
    res.redirect("/profile");
  }
  res.sendFile(__dirname + "/signin.html")
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (data) => data.username === username && data.password === password);
  if (!user) {
    res.redirect("/");
  } else {
    req.session.userID = username;
    req.session.isAuth = true;
    console.log();
    res.sendFile(__dirname + "/profile.html");
  }
});

app.get("/profile", (req, res) => {
  if (!req.session.isAuth) {
    res.redirect("/");
  }
  res.sendFile(__dirname + "/profile.html");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
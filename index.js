require("dotenv").config();
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const express = require("express");
const filepload = require("express-fileupload");
const cookiepar = require("cookie-parser");
const session = require("express-session");
const mysqlstore = require("express-mysql-session")(session);

const util = require("util");
const fs = require("fs");
const {Attachment} = require("@sendgrid/helpers/classes");
const app = express();
/*const store= new session.MemoryStore()*/
app.use(cookiepar());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "https://enkaare.onrender.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});
const options = {
  connectionLimit: 10,
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  createDatabaseTable: true,
};

let cockieage = 1000 * 60 * 60 * 1;
const sessionStore = new mysqlstore(options);

app.use(
  session({
    secret: process.env.SENDGRID_API_KEY,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 30,
      /*secure:true,*/

      /* sameSite:"none",*/
    },
    store: sessionStore,
  })
);

app.use(
  cors({
    credentials: true,
    origin: "https://enkaare.onrender.com",
  })
);
/*origin:'https://calm-gingersnap-fdb8ce.netlify.app'*/

app.use(filepload());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.enable("trust proxy");

const PORT = process.env.PORT || 3890;

app.listen(PORT, () => console.log(`Server Listeaning at ${PORT} ....`));

// a pool to connect to every database request

const {createPool} = require("mysql2");
const {error} = require("console");
const {request} = require("http");
const {resolve} = require("path");
const {Z_ERRNO} = require("zlib");
const e = require("express");
const {arrayToJSON} = require("@sendgrid/helpers/helpers");
const {setTimeout} = require("timers/promises");

const pool = createPool({
  connectionLimit: 30000,
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// a variable to save a session

// a variable to save a session

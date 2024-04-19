const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const adsRoutes = require("./routes/ads.routes");
const authRoutes = require("./routes/auth.routes");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.static(path.join(__dirname, "/public")));

mongoose.connect("mongodb://0.0.0.0:27017/ads", { useNewUrlParser: true });
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to the database");
});
db.on("error", (err) => console.log("Error" + err));
app.use(
  session({
    secret: "xyz567",
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
  })
);
/*app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ filename: req.file.filename });
});

app.use("/api", adsRoutes);
app.use("/auth", authRoutes);

app.use((req, res) => {
  res.status(404).send({ message: "Not Found..." });
});
const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running...");
});

let mongoose = require("mongoose");
let express = require("express");
let multer = require("multer");
let path = require("node:path");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

let upload = multer({ storage: storage });

let cors = require("cors");

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "./client/build")));

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobile: String,
  profilePic: String,
});

let user = new mongoose.model("user", userSchema);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build"));
});

app.post("/register", upload.single("profilePic"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);

  try {
    let newUser = await new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile,
      profilePic: req.file.path,
    });
    await user.insertMany([newUser]);
    res.json({ status: "Success", msg: "User Created Successfully" });
  } catch (err) {
    res.json({ status: "failure", msg: "Unable to create user", err: err });
  }

  console.log("recieved request from client");

  console.log(req.body);

  // res.json(["user created successfully"]);
});

app.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);

  let userDetialsArr = await user.find().and({ email: req.body.email });

  if (userDetialsArr.length > 0) {
    if (userDetialsArr[0].password == req.body.password) {
      let loggedInUserDetails = {
        firstName: userDetialsArr[0].firstName,
        lastName: userDetialsArr[0].lastName,
        email: userDetialsArr[0].email,
        mobile: userDetialsArr[0].mobile,
        profilePic: userDetialsArr[0].profilePic,
      };

      res.json({ status: "success", data: loggedInUserDetails });
    } else {
      res.json({ status: "failure", msg: "Invalid Password" });
    }
  } else {
    res.json({ status: "failure", msg: "user is not available" });
  }
});

app.listen(9441, () => {
  console.log("Port Number Is Ready");
});

let connectToMDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ramganta778:balaji@cluster0.vhgpcgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Connected to MDB Successfully");
  } catch (err) {
    console.log("Unable to connect to MDB");
  }
};

connectToMDB();

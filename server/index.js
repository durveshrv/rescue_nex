const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const User = require('./models/user');
const Disaster = require('./models/disasters');
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const multer = require("multer");
const auth = require('./middleware/auth');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST","PATCH"],
  allowedHeaders: ["Content-Type", "x-auth-token", "token"],
}));

require('dotenv').config();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
const mongoDBURL = process.env.mongoDBURL;

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
  console.error("Could not connect to MongoDB:", err.message);
  process.exit(1);
});

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("request successfully sent!");
});

app.post('/register', async (req, res) => {
  const { name, email, disaster, licence, password, resrc,address } = req.body;
  if (!name || !email || !disaster || !licence || !password || !address) {
    return res.status(400).send('All fields are required.');
  }

  if (disaster.length < 5 || disaster.length > 100) {
    return res.status(400).send('Disaster field must be between 5 and 100 characters.');
  }

  if (password.length < 5 || password.length > 1024) {
    return res.status(400).send('Password must be between 5 and 1024 characters.');
  }

  try {
    let user = new User({
      name,
      email,
      disaster,
      licence,
      password,
      resrc,
      address,
    });

    user = await user.save();
    const token = user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (ex) {
    console.log(ex);
    res.status(500).send('Something went wrong.');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send('Invalid email or password.');
    }

    const token = user.generateAuthToken();
    res.status(200).send({ user, token });
    console.log(token);
  } catch (ex) {
    res.status(500).send('Something went wrong.');
  }
});
// Get unverified users
app.get('/admin/unverified-users', async (req, res) => {
  try {
    const unverifiedUsers = await User.find({ verified: false });
    res.send(unverifiedUsers);
  } catch (ex) {
    res.status(500).send('Something went wrong.');
  }
});

// Verify a user
app.patch('/admin/verify-user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found.');

    user.verified = true;
    await user.save();
    res.send(user);
  } catch (ex) {
    res.status(500).send('Something went wrong.');
  }
});
app.get('/about', auth, async (req, res) => {
  try {
    const userId = req.userId;
    console.log("User ID:", userId);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    console.error("Error in /about route:", error.message);
    res.status(500).send("Internal Server Error");
  }
});
app.get('/getallusers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/disasters', async (req, res) => {
  try {
    const disasters = await Disaster.find();
    res.json(disasters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log("SERVER RUNNING");
});

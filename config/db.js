// Export mongoose
const mongoose = require("mongoose");

//Assign MongoDB connection string to Uri and declare options settings
var uri = "mongodb+srv://api:ZXCzxc123!!!@cluster0.hw5r8.mongodb.net/the_crypt?retryWrites=true&w=majority";

// Declare a variable named option and assign optional settings
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(uri, options);
const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", uri);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

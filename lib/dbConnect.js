// Export mongoose
const mongoose = require("mongoose");

//Assign MongoDB connection string to Uri and declare options settings
const URI = "mongodb+srv://api:ZXCzxc123!!!@cluster0.hw5r8.mongodb.net/the_crypt?retryWrites=true&w=majority";

// Declare a variable named option and assign optional settings
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// Connect MongoDB Atlas using mongoose connect method
// mongoose.connect(uri, options);
// const db = mongoose.connection;
// db.once("open", (_) => {
//   console.log("Database connected:", uri);
// });

// db.on("error", (err) => {
//   console.error("connection error:", err);
// });

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

if (!URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: true,
      // useCreateIndex: true,
    };

    cached.promise = mongoose
      .connect(URI, opts)
      .then((mongoose) => {
        console.log("1st DB Connection");
        return mongoose;
      })
      .catch((err) => {
        console.log("Cannot connect to DB! Error: ", err);
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

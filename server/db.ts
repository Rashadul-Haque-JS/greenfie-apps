import mongoose  from "mongoose";

const dbURI = "mongodb://127.0.0.1:27017/greenfie";

mongoose.connect(dbURI);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});


process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});

export default connection;

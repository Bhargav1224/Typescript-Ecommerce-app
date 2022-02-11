// require("newrelic");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/route.js");
const cors = require("cors");
// require("dotenv").config();
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const app = express();

const PORT = process.env.PORT || 8001;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("Connected to the Database successfully");
  })
  .catch(() => {
    console.log("Something went wrong while connecting to mongo Database");
  });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth/user", authRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on Port:", PORT);
});

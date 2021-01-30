require("dotenv/config");
const express = require("express");
// const helmet = require("helmet");
const morgan = require("morgan");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const home = require("./routes/home");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/user");
const auth = require("./routes/auth");
const dbConenct = require("./database/connect");

const startupDebugger = require("debug")("app:startup");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route middlewares
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan is loaded...");
}

app.set("view engine", "pug");

// database connection
dbConenct(process.env.DB_URL);

const port = process.env.NODE_ENV_PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));

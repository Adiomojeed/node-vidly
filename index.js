require("dotenv/config");
const express = require("express");
// const helmet = require("helmet");
const morgan = require("morgan");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const home = require("./routes/home");
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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan is loaded...");
}

app.set("view engine", "pug");

// database connection
dbConenct(process.env.DB_URL);

const port = process.env.NODE_ENV_PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));

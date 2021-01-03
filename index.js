const logger = require("./middleware/logger");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const genres = require("./routes/genres");
const home = require("./routes/home");
require("dotenv/config");

const startupDebugger = require("debug")("app:startup");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/", home); 
app.use("/api/genres", genres);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan is loaded...");
}

app.set("view engine", "pug");

// app.use(logger("Logging..."));
// app.use(logger("Authenticating..."));

const port = process.env.NODE_ENV_PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));

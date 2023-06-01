// dependencies
const express = require("express");

// route files
const apiRoutes = require("./routes/apiRoutes.js");
const htmlRoutes = require("./routes/htmlRoutes.js");

// sets the port
const PORT = process.env.PORT || 3001;

// sets express app
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// listener
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
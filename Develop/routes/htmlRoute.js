const html = require("express").Router();
const path = require("path");

html.get("/notes", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

html.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

html.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = html;
const notes = require("express").Router();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

// get request for db.json
notes.get("/notes", (_req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
    }
);

// post request for db.json
notes.post("/notes", (req, res) => {
    console.log(req.body);

// destructure title and text from req.body
    const { title, text } = req.body;

// if title and text are present, create a new note object
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

// read the db.json file
fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const parsedNotes = JSON.parse(data);
      parsedNotes.push(newNote);

// write the new note to db.json  
fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(parsedNotes, null, 4), (writeErr) =>
writeErr ? console.error(writeErr) : console.log("Successfully added note!")
);
res.json(parsedNotes);
    }   
}); 
    } else {
        res.error("Error in adding note");
    }
});

// delete request for db.json
notes.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const parsedNotes = JSON.parse(data);
        const newNotes = parsedNotes.filter((note) => note.id !== id);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newNotes), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Note deleted!");
            res.json(newNotes);
          }
        });
      }
    });
  });
  
  module.exports = notes;
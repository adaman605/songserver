const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/songs", express.static(path.join(__dirname, "songs")));


const songs = fs.readdirSync(path.join(__dirname, "songs"));


let savedDate = null;
let songIndex = null;

function getSongOfTheDay() {
  const today = new Date().toDateString();

  if (savedDate !== today || songIndex === null) {
    songIndex = Math.floor(Math.random() * songs.length);
    savedDate = today;
  }

  return songs[songIndex];
}


app.get("/song-of-the-day", (req, res) => {
  const song = getSongOfTheDay();
  const url = `${req.protocol}://${req.get("host")}/songs/${song}`;
  res.json({ 
    date: new Date().toISOString().split("T")[0],
    url: url
  });
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
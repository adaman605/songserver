const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve MP3 files
app.use("/songs", express.static(path.join(__dirname, "songs")));

// Read all songs from the folder
const songs = fs.readdirSync(path.join(__dirname, "songs"));

// In-memory cache for song of the day
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

// API endpoint
app.get("/song-of-the-day", (req, res) => {
  const song = getSongOfTheDay();
  const url = `${req.protocol}://${req.get("host")}/songs/${song}`;
  res.json({ 
    date: new Date().toISOString().split("T")[0],
    url: url
  });
});

// Start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
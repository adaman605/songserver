const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { pathToFileURL } = require("url");
const app = express();
const PORT = process.env.PORT || 3000;
const songsFolder = path.join(__dirname, "songs")
app.use(cors());

app.use("/songs", express.static(songsFolder));

let cachedFile = path.join(__dirname, "songsCache.json")


function getToday(){
  return new Date().toDateString()
}

function getSongOfTheDay() {
  const today = getToday();
  const songs = fs.readdirSync(songsFolder)

  let cache = null;

  if(fs.existsSync(cachedFile)){
    cache = JSON.parse(fs.readFileSync(cachedFile, "utf-8"))
  }

  if(!cache || cache.date !== today){
    const randomSong = songs[Math.floor(Math.random() * songs.length)]

    cache = {
      date: today,
      song: randomSong
    }

    fs.writeFileSync(cachedFile, JSON.stringify(cache, null, 2))
  }

  return cache.song;
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
const express = require("express");
const cors = require("cors");
const { default: supabase } = require("./supabase");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());





async function getData() {
  const { data, error } = await supabase
    .from("todaysong")
    .select("song (*)");

  if (error) throw error;
  return data?.[0]?.song || null;
}

app.get("/song-of-the-day", async (req, res) => {
  try {
    const song = await getData();
    if (!song) return res.status(404).json({ error: "No song found" });
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
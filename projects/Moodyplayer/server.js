const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const songs = [
  // Happy
  {
    title: "Happy song",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    img: "https://img.icons8.com/fluency/48/happy.png",
    mood: "happy"
  },
  {
    title: "Joyride",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    img: "https://img.icons8.com/fluency/48/happy.png",
    mood: "happy"
  },

  // Sad
  {
    title: "Lonely Rain",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    img: "https://source.unsplash.com/60x60/?sad",
    mood: "sad"
  },
  {
    title: "Tears & Piano",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    img: "https://source.unsplash.com/60x60/?tears",
    mood: "sad"
  },

  // Angry
  {
    title: "Rock the Rage",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    img: "https://source.unsplash.com/60x60/?rage",
    mood: "angry"
  },
  {
    title: "Firestorm",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    img: "https://source.unsplash.com/60x60/?fire",
    mood: "angry"
  },

  // Neutral
  {
    title: "Calm Mind",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    img: "https://source.unsplash.com/60x60/?calm",
    mood: "neutral"
  },
  {
    title: "Lo-fi Flow",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    img: "https://source.unsplash.com/60x60/?lofi",
    mood: "neutral"
  },

  // Surprised
  {
    title: "Whoa Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    img: "https://source.unsplash.com/60x60/?surprised",
    mood: "surprised"
  },
  {
    title: "Unexpected Drop",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    img: "https://source.unsplash.com/60x60/?wow",
    mood: "surprised"
  },

  // Fearful
  {
    title: "Chills",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    img: "https://source.unsplash.com/60x60/?fear",
    mood: "fearful"
  },
  {
    title: "Dark Steps",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    img: "https://source.unsplash.com/60x60/?dark",
    mood: "fearful"
  },

  // Disgusted
  {
    title: "Break Free",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    img: "https://source.unsplash.com/60x60/?disgusted",
    mood: "disgusted"
  },
  {
    title: "Outcast",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    img: "https://source.unsplash.com/60x60/?rejected",
    mood: "disgusted"
  }
];


app.post("/suggest", (req, res) => {
  const mood = req.body.mood || "neutral";
  const filtered = songs.filter((s) => s.mood === mood);
  res.json({ songs: filtered });
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});

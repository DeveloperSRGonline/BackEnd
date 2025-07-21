const video = document.getElementById("video");
const moodLabel = document.getElementById("mood-label");
const songsList = document.getElementById("songs-list");
const detectBtn = document.getElementById("detect-btn");

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
]).then(startVideo);

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      console.error("Camera error:", err);
      alert("❌ Please allow camera access in browser");
    });
}

detectBtn.addEventListener("click", async () => {
  const detection = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions();

  if (!detection || !detection.expressions) {
    moodLabel.innerText = "No face / mood detected";
    return;
  }

  const bestMatch = Object.entries(detection.expressions).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const mood = bestMatch[0];
  moodLabel.innerText = mood;

  fetch("/suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood }),
  })
    .then((res) => res.json())
    .then((data) => {
      songsList.innerHTML = "<h3>🎶 Suggested Songs:</h3>";
      data.songs.forEach((song) => {
        const card = document.createElement("div");
        card.className = "song-card";

        const img = document.createElement("img");
        img.src = song.img || "https://via.placeholder.com/60";
        img.alt = song.title;

        const details = document.createElement("div");
        details.className = "song-details";

        const title = document.createElement("h4");
        title.textContent = song.title;

        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = song.url;

        details.appendChild(title);
        details.appendChild(audio);

        card.appendChild(img);
        card.appendChild(details);

        songsList.appendChild(card);
      });
    });
});

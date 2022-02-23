const express = require("express"),
  app = express(),
  { Readable } = require("stream"),
  { createReadStream } = require("fs"),
  polly = require("./polly");

app.use(express.json());
app.get("/", (req, res) => {
  polly.synthesizeSpeech(
    {
      Text:
        req.query.text ||
        "Três tigres tristes para três pratos de trigo. Três pratos de trigo para três tigres tristes.",
      LanguageCode: "pt-BR",
      VoiceId: "Vitoria",
      OutputFormat: "mp3",
    },
    (err, data) => {
      if (err) return res.status(500).json({});
      if (!data.AudioStream instanceof Buffer) return res.status(500).json({});

      res.set("Content-Type", "audio/mpeg");
      res.set("Content-Disposition", 'filename="music.mp3"');
      return res.status(200).send(data.AudioStream);
    }
  );
});
app.listen(8000, () => {
  console.log("listening on port 8000");
});
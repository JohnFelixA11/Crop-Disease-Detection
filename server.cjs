// server.cjs
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

let clients = [];
let latestData = null;

app.use(cors());
app.use(bodyParser.json());

// SSE endpoint
app.get("/uploaddata", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send existing data if any
  if (latestData) {
    res.write(`data: ${JSON.stringify(latestData)}\n\n`);
  }

  clients.push(res);

  req.on("close", () => {
    clients = clients.filter((client) => client !== res);
  });
});

// Receive POST data from Raspberry Pi or Bruno
app.post("/uploaddata", (req, res) => {
  const { image, time, severity, classification } = req.body;

  if (!image || !time || !severity || !classification) {
    return res.status(400).json({ message: "Missing fields in request" });
  }

  latestData = { image, time, severity, classification };

  // Notify all connected clients
  clients.forEach((client) =>
    client.write(`data: ${JSON.stringify(latestData)}\n\n`)
  );

  res.status(200).json({ message: "Data received and broadcasted!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

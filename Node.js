const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/script/:uid", async (req, res) => {
  const { uid } = req.params;
  const firebaseUrl = `https://ta-bin-2-default-rtdb.firebaseio.com/data/${uid}.json`;

  const response = await fetch(firebaseUrl);
  const data = await response.json();

  if (!data || !data.script) return res.status(404).send("Script not found");

  // Set as plain text for Roblox Executor
  res.set("Content-Type", "text/plain");
  res.send(data.script);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

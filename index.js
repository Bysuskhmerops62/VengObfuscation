const express = require("express");
const axios = require("axios");
const app = express();

app.get("/veng", async (req, res) => {
  const uid = req.query.uid;
  const pass = req.query.key;

  try {
    const response = await axios.get(`https://ta-bin-2-default-rtdb.firebaseio.com/data/${uid}.json`);
    const data = response.data;

    if (data.password === pass) {
      res.setHeader("Content-Type", "text/plain");
      res.send(data.script);
    } else {
      res.status(403).send("-- Wrong Password or UID");
    }
  } catch (err) {
    res.status(500).send("-- Internal Error");
  }
});

app.listen(3000, () => console.log("Server running!"));

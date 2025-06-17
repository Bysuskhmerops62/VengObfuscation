app.get("/script/:id", async (req, res) => {
  const { id } = req.params;
  const ref = db.ref("data").child(id);
  const snapshot = await ref.once("value");
  const data = snapshot.val();

  if (!data) return res.status(404).send("Script not found");

  // Don't let browser guess it's HTML
  res.set("Content-Type", "text/plain");
  res.send(data.script);
});

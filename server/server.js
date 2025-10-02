const app = require("./app");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("🚀 Secure File Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

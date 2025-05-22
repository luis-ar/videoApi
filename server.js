const app = require("./app");
const { PORT } = require("./config/paths");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

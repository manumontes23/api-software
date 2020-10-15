const app = require("./app");
require("./config/dotenv.config");

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

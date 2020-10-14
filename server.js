
const app = require("./app");
const http = require("http").createServer(app);
require("./config/dotenv.config");
http.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});  
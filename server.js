
const app = require("./app");
const http = require("http").createServer(app);
const PORT = process.env.PORT || 3120;

require("./config/dotenv.config");
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  

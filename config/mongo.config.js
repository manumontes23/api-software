const MongoClient = require("mongodb").MongoClient;
require("./dotenv.config");
module.exports = {
  client: MongoClient(process.env.DB_CONECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }),
  DBName: process.env.DB_NAME
};

const app = require("./index");
const config = require("./src/app/config");
const mongoose = require("mongoose");



async function startServer() {
  try {
    // connect database
    const DB = config.db.uri;
    await mongoose.connect(DB);
    // start server
    const PORT = config.app.port;
    app.listen(PORT, (req, res) => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.log("Cannot connect to the database", error);
    process.exit();
  }
}

startServer();
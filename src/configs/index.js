require("dotenv").config();

module.exports = {
  port: process.env.PORT ?? 5000,
  modelUrl: process.env.MODEL_URL
};

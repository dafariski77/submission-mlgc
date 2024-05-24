const { Firestore } = require("@google-cloud/firestore");
const configs = require("../configs");

const db = new Firestore({ projectId: configs.projectId });

module.exports = db;

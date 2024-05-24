const tf = require("@tensorflow/tfjs-node");
const configs = require("../configs");

const loadModel = async () => {
  return tf.loadGraphModel(configs.modelUrl);
};

module.exports = loadModel;

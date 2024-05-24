const Hapi = require("@hapi/hapi");

const loadModel = require("./src/services/loadModel");
const routes = require("./src/api/routes");
const InputError = require("./src/errors/InputError");
const configs = require("./src/configs");

const init = async () => {
  const server = Hapi.server({
    port: configs.port,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  const model = await loadModel();

  server.app.model = model;

  server.route(routes);

  server.ext("onPreResponse", (request, h) => {
    const response = request.response;

    if (response instanceof InputError) {
      const newResponse = h.response({
        status: "fail",
        message: `Terjadi kesalahan dalam melakukan prediksi`,
      });

      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });

      newResponse.code(response.output.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();

  console.log(`Server is running at : ${server.info.uri}`);
};

init();

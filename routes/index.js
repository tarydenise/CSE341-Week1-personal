const routes = require("express").Router();
const lesson1Controller = require("../controllers/lesson1");

routes.get("/", lesson1Controller.helloRoute);
routes.get("/again", lesson1Controller.againRoute);

module.exports = routes;

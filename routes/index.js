const routes = require("express").Router();
const lesson1Controller = require("../controllers/lesson1");

routes.get("/", lesson1Controller.taryRoute);
routes.get("/lisiate", lesson1Controller.lisiateRoute);

module.exports = routes;

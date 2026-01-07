const routes = require("express").Router();
const lesson1Controller = require("../controllers/lesson1");

routes.get("/", lesson1Controller.taryRoute);
routes.get("/lisiate", lesson1Controller.lisiateRoute);
routes.get("/kristyn", lesson1Controller.kristynRoute);
routes.get("/mark", lesson1Controller.markRoute);
routes.get("/richie", lesson1Controller.richieRoute);


module.exports = routes;

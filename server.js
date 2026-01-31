const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connection");

const port = process.env.PORT || 8080;
const app = express();

const { swaggerUi, swaggerSpec } = require('./swagger');

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    })
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    .use('/contacts', require('./routes/contactsRoute'))
    .use("/", require("./routes"));

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on port ${port}`);
    }
});
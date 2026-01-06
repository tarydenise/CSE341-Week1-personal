const helloRoute = (req, res) => {
  res.send("Hello World");
};

const againRoute = (req, res) => {
  res.send("Hello World Again");
};

module.exports = {
  helloRoute,
  againRoute,
};

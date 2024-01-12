helloWorld = (req, res) => {
  const data = 'Hello World';
  res.status(200).send(data);
};

module.exports = {
  helloWorld,
};

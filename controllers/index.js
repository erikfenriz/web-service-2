async function helloWorld(req, res) {
  const data = 'Hello World';
  //#swagger.tags=['Hello World']
  res.status(200).send(data);
}

module.exports = {
  helloWorld,
};

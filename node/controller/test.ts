export function testApi(req, res) {
  const { name, age } = req.body;
  res.send({ description: `super hero ${name}, now age years old` });
}

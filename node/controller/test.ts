export function testApi(req, res) {
  const test = req.body;
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.send({ data: req.data });
}

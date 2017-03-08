module.exports = (req, res, next) => {
  if (!req.body || !req.body.birthDate) {
    return res.status(400).send({
      error: 'missing.birthDate'
    });
  }

  return next();
}

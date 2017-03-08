module.exports = (req, res, next) => {
  if (!req.body || !req.body.username) {
    return res.status(400).send('missing username');
  }
  
  return next();
}

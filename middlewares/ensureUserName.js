module.exports = (req, res, next) => {
  console.log('ensuring username is in the request body.')
  if (!req.body || !req.body.username) {
    console.log('it isn\'t');
    return res.status(400).send()
  }
  
  console.log('it is, authorazing the next middleware');
  return next();
}

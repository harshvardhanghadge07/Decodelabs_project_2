function notFoundHandler(req, res) {
  res
    .status(404)
    .json({ error: `Route ${req.method} ${req.originalUrl} not found.` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // express.json() throws this when the request body is malformed JSON
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body.' });
  }

  res.status(500).json({ error: 'Internal server error.' });
}

module.exports = { notFoundHandler, errorHandler };

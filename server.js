const express = require('express');
const pollRoutes = require('./routes/polls');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Poll Voting API is running.' });
});

app.use('/polls', pollRoutes);

// Keep these last: unmatched routes, then errors
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Poll Voting API listening on port ${PORT}`);
});

module.exports = app;

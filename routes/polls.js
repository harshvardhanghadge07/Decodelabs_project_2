const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

router.post('/', pollController.createPoll);
router.get('/', pollController.listPolls);
router.get('/:id', pollController.getPoll);
router.delete('/:id', pollController.removePoll);
router.post('/:id/vote', pollController.vote);
router.get('/:id/results', pollController.results);

module.exports = router;

const pollStore = require('../models/pollStore');

function createPoll(req, res) {
  const { question, options } = req.body;

  if (typeof question !== 'string' || question.trim().length === 0) {
    return res
      .status(400)
      .json({ error: 'Question is required and must be a non-empty string.' });
  }

  if (!Array.isArray(options) || options.length < 2) {
    return res
      .status(400)
      .json({ error: 'At least 2 options are required.' });
  }

  const cleanOptions = options.map((o) =>
    typeof o === 'string' ? o.trim() : ''
  );

  if (cleanOptions.some((o) => o.length === 0)) {
    return res
      .status(400)
      .json({ error: 'All options must be non-empty strings.' });
  }

  const poll = pollStore.createPoll(question.trim(), cleanOptions);
  return res.status(201).json(poll);
}

function listPolls(req, res) {
  return res.status(200).json(pollStore.getAllPolls());
}

function getPoll(req, res) {
  const poll = pollStore.getPollById(req.params.id);

  if (!poll) {
    return res.status(404).json({ error: 'Poll not found.' });
  }

  return res.status(200).json(poll);
}

function removePoll(req, res) {
  const deleted = pollStore.deletePoll(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: 'Poll not found.' });
  }

  return res.status(204).send();
}

function vote(req, res) {
  const { optionId } = req.body;

  if (typeof optionId !== 'string' || optionId.trim().length === 0) {
    return res.status(400).json({ error: 'optionId is required.' });
  }

  const result = pollStore.castVote(req.params.id, optionId);

  if (result.error === 'POLL_NOT_FOUND') {
    return res.status(404).json({ error: 'Poll not found.' });
  }

  if (result.error === 'OPTION_NOT_FOUND') {
    return res
      .status(400)
      .json({ error: 'That option does not belong to this poll.' });
  }

  return res.status(200).json(result.poll);
}

function results(req, res) {
  const pollResults = pollStore.getResults(req.params.id);

  if (!pollResults) {
    return res.status(404).json({ error: 'Poll not found.' });
  }

  return res.status(200).json(pollResults);
}

module.exports = {
  createPoll,
  listPolls,
  getPoll,
  removePoll,
  vote,
  results,
};

const crypto = require('crypto');

// In-memory "database". Resets whenever the server restarts.
let polls = [];

function createPoll(question, optionTexts) {
  const poll = {
    id: crypto.randomUUID(),
    question,
    options: optionTexts.map((text) => ({
      id: crypto.randomUUID(),
      text,
      votes: 0,
    })),
    createdAt: new Date().toISOString(),
  };

  polls.push(poll);
  return poll;
}

function getAllPolls() {
  return polls;
}

function getPollById(id) {
  return polls.find((p) => p.id === id);
}

function deletePoll(id) {
  const index = polls.findIndex((p) => p.id === id);
  if (index === -1) return false;

  polls.splice(index, 1);
  return true;
}

function castVote(pollId, optionId) {
  const poll = getPollById(pollId);
  if (!poll) return { error: 'POLL_NOT_FOUND' };

  const option = poll.options.find((o) => o.id === optionId);
  if (!option) return { error: 'OPTION_NOT_FOUND' };

  option.votes += 1;
  return { poll };
}

function getResults(pollId) {
  const poll = getPollById(pollId);
  if (!poll) return null;

  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  return {
    id: poll.id,
    question: poll.question,
    totalVotes,
    options: poll.options.map((o) => ({
      id: o.id,
      text: o.text,
      votes: o.votes,
      percentage:
        totalVotes === 0 ? 0 : Math.round((o.votes / totalVotes) * 1000) / 10,
    })),
  };
}

module.exports = {
  createPoll,
  getAllPolls,
  getPollById,
  deletePoll,
  castVote,
  getResults,
};

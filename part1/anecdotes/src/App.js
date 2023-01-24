import { useState } from 'react';

const App = () => {
  const [selected, setSelected] = useState(null);
  const [votes, setVotes] = useState(Array(8).fill(0));
  const isAllZero = votes.every((item) => item === 0);

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const getRandomAnecdote = () => {
    const random_index = Math.floor(Math.random() * (anecdotes.length - 1));
    setSelected(random_index);
  };

  const voteForAnecdote = (index) => {
    const vote_copy = [...votes];
    vote_copy[index] += 1;
    setVotes([...vote_copy]);
  };

  const getMostPopular = () => {
    const max_value_index = votes.indexOf(Math.max(...votes));
    return anecdotes[max_value_index];
  };

  return (
    <div>
      <div>
        <h1>Anecdote of the day:</h1>
        <p>{anecdotes[selected]}</p>
        <p>
          has <strong>{votes[selected]}</strong> votes
        </p>
        <button onClick={getRandomAnecdote}>next anecdote</button>
        <button onClick={() => voteForAnecdote(selected)}>vote</button>
      </div>
      <div>
        <h1>Anecdote with the most votes:</h1>
        <p>{isAllZero ? null : getMostPopular()}</p>
      </div>
    </div>
  );
};

export default App;

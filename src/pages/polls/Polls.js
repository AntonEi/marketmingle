import React, { useState, useEffect } from "react";
import axios from "axios";

const PollResultsPage = () => {
  const [pollData, setPollData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        // Fetch poll data from the backend API
        const response = await axios.get("/questions/");
        setPollData(response.data);
      } catch (error) {
        // Handle error
        setError(error.message);
      }
    };

    fetchPollData();

    // Cleanup function
    return () => {
      // Cleanup code (if needed)
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pollData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Poll Results</h2>
      <ul>
        {pollData.map((poll) => (
          <li key={poll.id}>
            <h3>{poll.question_text}</h3>
            <ul>
              {poll.choices.map((choice) => (
                <li key={choice.id}>
                  {choice.choice_text}: {choice.votes} votes
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollResultsPage;

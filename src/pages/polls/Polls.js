import React, { useState, useEffect } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import PollsCreateForm from "./PollsCreateForm"; // Assuming the path is correct

const Polls = () => {
  const [question, setQuestion] = useState("hey");
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    // Fetch the poll question and choices from the API
    const fetchPollData = async () => {
      try {
        // Fetch the list of questions (assuming it's available at /questions/)
        const response = await axios.get("/questions/");
        const data = response.data;
        // For simplicity, assuming only one question is returned
        if (data.length > 0) {
          const { question_text, choices } = data[0];
          setQuestion(question_text);
          setChoices(choices);
        }
      } catch (error) {
        console.error("Error fetching poll data:", error);
      }
    };

    fetchPollData();
  }, []);

  const handleVote = async (choiceId) => {
    try {
      // Vote for the choice by making a POST request to the vote endpoint
      await axios.post(`/questions/${choiceId}/vote/`);
      // Optionally, update the UI to reflect the user's vote
      // For example, by disabling the vote buttons
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <Container>
      <h1>{question}</h1>
      <PollsCreateForm /> {/* Render the PollsCreateForm component here */}
      <ListGroup>
        {choices.map((choice) => (
          <ListGroup.Item key={choice.id}>
            <Button onClick={() => handleVote(choice.id)}>
              {choice.choice_text}
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Polls;

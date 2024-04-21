import React, { useState, useEffect } from "react";
import axios from "axios";

const PollsCreateForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [choiceText, setChoiceText] = useState("");
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    // Add an interceptor to include the authentication token with each request
    const interceptor = axios.interceptors.request.use((config) => {
      // Retrieve token from localStorage or wherever it's stored
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
      return config;
    });

    // Cleanup the interceptor when component unmounts
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  const handleAddChoice = () => {
    if (choiceText.trim() !== "") {
      setChoices([...choices, choiceText]);
      setChoiceText("");
    }
  };

  const handleRemoveChoice = (index) => {
    const updatedChoices = choices.filter((_, i) => i !== index);
    setChoices(updatedChoices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/questions/`, {
        choice_text: choiceText
      });
      // Handle success
      console.log("Choice created:", response.data);
      // Clear choice text field
      setChoiceText("");
      // You may also want to update the choices list after successful creation
      // fetchChoices();
    } catch (error) {
      // Handle error
      console.error("Error creating choice:", error);
    }
  };
  

  return (
    <div>
      <h2>Create a Poll</h2>
      <form onSubmit={handleSubmit}>
        <label>Question:</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <label>Choices:</label>
        <ul>
          {choices.map((choice, index) => (
            <li key={index}>
              {choice}
              <button type="button" onClick={() => handleRemoveChoice(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={choiceText}
          onChange={(e) => setChoiceText(e.target.value)}
        />
        <button type="button" onClick={handleAddChoice}>
          Add Choice
        </button>
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
};

export default PollsCreateForm;

import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Polls from "./Polls"; // Import the Polls component

const PollsPage = ({ mobile }) => {
  // Assuming useProfileData is imported from the appropriate location
  // const { useProfileData } = useProfileData();

  return (
    <Container
      style={{ marginTop: "20px" }}
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {/* Display the spinner before content loads */}
      
      <>
        <h5 style={{ textAlign: 'center' }}>This weeks Poll:</h5>
        <Polls /> {/* Display the Polls component */}
      </>
    </Container>
  );
};

export default PollsPage;

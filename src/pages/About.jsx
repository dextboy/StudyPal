import React from "react";
import { Card, Button } from "react-bootstrap";
import jestLogo from "../images/jest-logo.png";
import gaLogo from "../images/google-analytics-logo.png";
import reactLogo from "../images/react-logo.png";
import bootstrapLogo from "../images/bootstrap-logo.png";
import muiLogo from "../images/mui-logo.png";

const About = () => {
  return (
    <Card className="p-4 text-center bg-light">
      {" "}
      <Card.Title className="mb-4" style={{ fontSize: "24px" }}>
        This website is a study companion web application by Tan Dexter and Joy
        Liu.
      </Card.Title>
      <div className="mt-5 mt-auto mb-4">
        <h4>Acknowledgements and Technologies Used:</h4>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <img
            src={jestLogo}
            alt="Jest"
            className="m-2"
            style={{ width: "80px" }}
          />
          <img
            src={gaLogo}
            alt="Google Analytics"
            className="m-2"
            style={{ width: "80px" }}
          />
          <img
            src={reactLogo}
            alt="React"
            className="m-2"
            style={{ width: "80px" }}
          />
          <img
            src={bootstrapLogo}
            alt="Bootstrap"
            className="m-2"
            style={{ width: "80px" }}
          />
          <img
            src={muiLogo}
            alt="MUI"
            className="m-2"
            style={{ width: "80px" }}
          />
          {/* Add other libraries and images here */}
        </div>
      </div>
      <Button
        href="mailto:tandexter98@gmail.com?cc=jlzh03@gmail.com&subject=Issue(s)%20with%20StudyPal"
        variant="primary"
        className="mb-5"
      >
        Send email for issues
      </Button>
    </Card>
  );
};

export default About;

import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  const getAdditionalAttributes = () => {
    switch (part.name) {
      case "Fundamentals":
        return <p>Description: {part.description}</p>;
      case "Using props to pass data":
        return <p>Group Projects: {part.groupProjectCount}</p>;
      case "Deeper type usage":
        return (
          <>
            <p>Description: {part.description}</p>
            <p>Submission Link: {part.exerciseSubmissionLink}</p>
          </>
        );
      case "React types":
        return <p>Description: {part.description}</p>;
      default:
        assertNever(part);
    }
  };

  return (
    <div>
      <h4>{part.name}</h4>
      <p>Exercises: {part.exerciseCount}</p>
      {getAdditionalAttributes()}
    </div>
  );
};

export default Part;

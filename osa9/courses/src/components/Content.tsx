import React from "react";
import Part from "./Part";
import { CoursePart } from "../types";

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
};

export default Content;

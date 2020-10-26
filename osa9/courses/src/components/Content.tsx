import React from "react";

interface ContentProps {
  parts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Content: React.FC<ContentProps> = ({ parts }) => (
  <>
    {parts.map((part) => (
      <p key={part.name}>
        {part.name} {part.exerciseCount}
      </p>
    ))}
  </>
);

export default Content;

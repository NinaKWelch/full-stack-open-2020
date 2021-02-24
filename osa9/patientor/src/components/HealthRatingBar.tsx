import React from "react";

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HEALTHBAR_SHORT_TEXTS = [
  "Healthy",
  "Low risk",
  "High risk",
  "Critical risk",
];

type BarProps = {
  rating: number;
  showText: boolean;
};

const HealthRatingBar: React.FC<BarProps> = ({ rating, showText }) => {
  const index = rating - 1;
  return (
    <>{showText ? HEALTHBAR_TEXTS[index] : HEALTHBAR_SHORT_TEXTS[index]}</>
  );
};

export default HealthRatingBar;

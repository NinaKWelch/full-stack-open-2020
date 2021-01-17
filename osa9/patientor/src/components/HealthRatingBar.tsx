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

const HealthRatingBar: React.FC<BarProps> = ({ rating, showText }) => (
  <>{showText ? HEALTHBAR_TEXTS[rating] : HEALTHBAR_SHORT_TEXTS[rating]}</>
);

export default HealthRatingBar;

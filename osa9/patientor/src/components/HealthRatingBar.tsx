import React from "react";

type BarProps = {
  rating: number;
  showText: boolean;
};

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar: React.FC<BarProps> = ({ rating, showText }) => (
  <div>
    <p>{rating}</p>
    {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
  </div>
);

export default HealthRatingBar;

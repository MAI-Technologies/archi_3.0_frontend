// CharacterButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CharacterButton = ({ name, imageSrc, pageUrl }) => {
  return (
    <Link to={pageUrl}>
      <button className="character-button">
        <img src={imageSrc} alt={name} />
        {name}
      </button>
    </Link>
  );
};

export default CharacterButton;

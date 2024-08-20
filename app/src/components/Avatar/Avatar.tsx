import React from 'react';

interface AvatarProps {
  name?: string;
  image?: string;
  className?: string;
}

const getFirstLetter = (str?: string) => {
  if (!str) return '';
  return str[0];
};

const Avatar: React.FC<AvatarProps> = ({ name, image, className = '' }) => {
  return (
    <div
      className={`text-black font-bold text-xl flex justify-center items-center  bg-ex-text-1 cursor-pointer rounded-md uppercase ${className}`}
    >
      {image ? <img src={image} /> : getFirstLetter(name)}
    </div>
  );
};

export default Avatar;

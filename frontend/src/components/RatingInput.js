import React from "react";

const RatingInput = ({ topic, value, onChange }) => {
  return (
    <div className="flex items-center space-x-2 mb-2">
      <label className="w-48">{topic}:</label>
      <input
        type="number"
        min="1"
        max="5"
        className="w-16 p-1 border rounded"
        value={value}
        onChange={(e) => onChange(topic, e.target.value)}
      />
    </div>
  );
};

export default RatingInput;

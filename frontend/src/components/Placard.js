import React from "react";

const Placard = ({ day, topics }) => {
  return (
    <div className="bg-orange-100 p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Day {day}</h2>
      <ul className="list-disc list-inside">
        {topics.map((topic, i) => (
          <li key={i}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default Placard;

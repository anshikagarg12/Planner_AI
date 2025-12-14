import React, { useState } from "react";

const SyllabusForm = ({ onSubmit }) => {
  const [syllabus, setSyllabus] = useState("");
  const [days, setDays] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(syllabus, days);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded shadow">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Enter your syllabus"
        value={syllabus}
        onChange={(e) => setSyllabus(e.target.value)}
        rows={5}
      />
      <input
        type="number"
        min="1"
        className="w-full p-2 border rounded"
        placeholder="Number of days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate Plan
      </button>
    </form>
  );
};

export default SyllabusForm;

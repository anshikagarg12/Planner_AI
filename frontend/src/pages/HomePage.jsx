import React, { useState } from "react";
import {
  extractTopics,
  generatePlan,
  downloadPDF,
  savePlan,
} from "../services/api";

export default function HomePage() {
  const [syllabus, setSyllabus] = useState("");
  const [topics, setTopics] = useState([]);
  const [ratings, setRatings] = useState({});
  const [days, setDays] = useState("");
  const [finalPlan, setFinalPlan] = useState("");
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);

  const handleExtract = async () => {
    if (!syllabus.trim()) {
      alert("Enter syllabus first!");
      return;
    }

    try {
      setLoadingExtract(true);

      const res = await extractTopics(syllabus);
      console.log("Extract response:", res);

      if (!res || !res.topics) {
        alert("No topics returned from AI");
        setLoadingExtract(false);
        return;
      }

      const extracted = res.topics
        .split("\n")
        .map(t =>
          t
            .replace(/^[-•\d.)\s]+/, "") // remove bullets/numbers
            .trim()
        )
        .filter(Boolean);

      if (extracted.length === 0) {
        alert("AI returned empty topic list");
        return;
      }

      setTopics(extracted);
    } catch (err) {
      console.error("Extract error:", err);
      alert("Failed to extract topics");
    } finally {
      setLoadingExtract(false);
    }
  };

  const handleRatingChange = (topic, rating) => {
    setRatings(prev => ({ ...prev, [topic]: rating }));
  };

  const handleGenerate = async () => {
    if (!days) {
      alert("Enter number of days");
      return;
    }

    try {
      setLoadingGenerate(true);

      const topicList = topics
        .map(t => `${t} — Rating: ${ratings[t] || 3}/5`)
        .join("\n");

      const res = await generatePlan(topicList, days);
      console.log("Generate response:", res);

      if (!res || !res.plan) {
        alert("AI did not return a plan");
        return;
      }

      setFinalPlan(res.plan);
    } catch (err) {
      console.error("Generate error:", err);
      alert("Failed to generate plan");
    } finally {
      setLoadingGenerate(false);
    }
  };

  const handleSave = async () => {
    try {
      await savePlan({ syllabus, topics, days, finalPlan });
      alert("Plan Saved!");
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save plan");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
        Planner AI
      </h1>

      {/* Syllabus */}
      <div className="bg-white p-6 shadow-md rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Enter Syllabus</h2>

        <textarea
          value={syllabus}
          onChange={(e) => setSyllabus(e.target.value)}
          className="w-full border p-3 h-40 rounded-lg outline-purple-600"
          placeholder="Paste your syllabus here..."
        />

        <button
          type="button"
          onClick={handleExtract}
          className="mt-4 px-5 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
        >
          {loadingExtract ? "Extracting..." : "Extract Topics"}
        </button>
      </div>

      {/* Topics */}
      {topics.length > 0 && (
        <div className="bg-white p-6 shadow-md rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-4">Rate Your Understanding</h2>

          {topics.map((topic, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-4 border-b pb-2"
            >
              <p className="font-medium">{topic}</p>

              <input
                type="range"
                min="1"
                max="5"
                value={ratings[topic] || 3}
                onChange={(e) => handleRatingChange(topic, e.target.value)}
                className="w-40"
              />
            </div>
          ))}
        </div>
      )}

      {/* Generate */}
      {topics.length > 0 && (
        <div className="bg-white p-6 shadow-md rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-4">Plan Duration</h2>

          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="border p-2 rounded-lg w-32 outline-purple-600"
            placeholder="Days"
          />

          <button
            type="button"
            onClick={handleGenerate}
            className="ml-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {loadingGenerate ? "Generating..." : "Generate Plan"}
          </button>
        </div>
      )}

      {/* Plan */}
      {finalPlan && (
        <div className="bg-white p-6 shadow-lg rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-3">Your Study Plan</h2>

          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">
            {finalPlan}
          </pre>

          <div className="mt-4 flex space-x-3">
            <button
              type="button"
              onClick={() => downloadPDF(finalPlan)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Download PDF
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
            >
              Save Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

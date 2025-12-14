import React, { useEffect, useState } from "react";
import { getSavedPlans, downloadPDF } from "../services/api";

export default function SavedPlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    const res = await getSavedPlans();
    setPlans(res.plans || []);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
        Saved Plans
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : plans.length === 0 ? (
        <p className="text-center text-gray-500">No saved plans yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between"
            >
              <h2 className="text-xl font-semibold text-purple-700 mb-2">
                {plan.syllabus.substring(0, 30) || plan.name || `Plan ${idx + 1}`}
              </h2>

              <p className="text-gray-600 mb-2">
                Days: {plan.days || plan.days?.length || "N/A"}
              </p>

              <p className="text-gray-600 mb-4">
                Topics: {plan.topics?.length || plan.days?.reduce((acc, d) => acc + d.topics.length, 0)}
              </p>

              <div className="mt-auto flex space-x-3">
                <button
                  onClick={() => downloadPDF(plan.finalPlan)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

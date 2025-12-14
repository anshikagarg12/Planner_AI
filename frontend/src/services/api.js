const API_BASE = "http://127.0.0.1:5000";

export async function extractTopics(syllabus) {
  const res = await fetch(`${API_BASE}/extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ syllabus }),
  });
  return res.json();
}

export async function generatePlan(topics, days) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topics, days }),
  });
  return res.json();
}

export async function downloadPDF(plan) {
  const res = await fetch(`${API_BASE}/pdf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "study_plan.pdf";
  a.click();
}

export async function savePlan(plan) {
  await fetch(`${API_BASE}/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plan),
  });
}

export async function getSavedPlans() {
  const res = await fetch(`${API_BASE}/saved`);
  return res.json();
}

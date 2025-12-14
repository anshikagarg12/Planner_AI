import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api"; // Flask backend URL

export const generatePlan = async (syllabus, days, ratings) => {
  const response = await axios.post(`${API_URL}/generate_plan`, {
    syllabus,
    days,
    ratings
  });
  return response.data;
};

export const getSavedPlans = async () => {
  const response = await axios.get(`${API_URL}/plans`);
  return response.data;
};

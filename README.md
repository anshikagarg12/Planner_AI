# 📚 Planner AI – Personalized Study Schedule Generator

Planner AI is a personal AI-powered study planner built to help me efficiently prepare for my upcoming examinations.  
This project was created **solely for personal use** to simplify the process of converting a syllabus into a structured, time-balanced daily study plan.

---

## 🎯 Purpose of This Project

Preparing for exams often involves:
- Breaking down a long syllabus
- Deciding what to study each day
- Allocating the right amount of time per topic
- Avoiding burnout by over-studying

To make this process easier and more organized, I built **Planner AI** to automatically:
- Extract topics from a syllabus
- Take my self-assessed understanding level
- Generate a realistic daily study schedule within fixed time limits

⚠️ **Note:** This project is not intended for commercial use.  
It was developed purely to solve my personal exam preparation needs.

---

## ✨ Features

- 📄 **Syllabus Topic Extraction** using Google Gemini AI  
- ⭐ **Understanding Rating System** (1–5 scale per topic)  
- 🗓 **AI-Generated Daily Study Plan**
  - Max 2 hours per topic per day
  - Total study time capped at 6–7 hours/day
  - Topics distributed across days (not repeated daily)
- 📥 **Download Study Plan as PDF**
- 💾 **Save & View Previous Plans**
- 🌐 Clean frontend with real-time feedback

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- JavaScript

### Backend
- Python
- Flask
- Flask-CORS

### AI
- Google Gemini 2.5 Flash API

### Utilities
- ReportLab (PDF generation)
- dotenv (environment variables)

---

## ⚙️ How It Works

1. Paste your syllabus into the app
2. AI extracts individual topics
3. Rate your understanding for each topic
4. Enter number of days available
5. Gemini generates a personalized daily plan
6. Download or save the plan for later use

---

## 🚀 Running the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/anshikagarg12/Planner_AI
cd Planner_AI
 ```
### 2️⃣ Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```
Run the backend:
```bash
python app.py
```
### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
---

## 🙋‍♀️ Author

Anshika Garg
AI Student | Exam-Oriented Projects | Learning by Building

---

## 📜 Disclaimer

This project was developed only for personal academic use.
It is not a commercial product and is not intended to replace professional academic planning tools.

---

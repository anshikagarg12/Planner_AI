import os
from dotenv import load_dotenv
import google.generativeai as genai

# ---------------- ENV SETUP ----------------
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("❌ GEMINI_API_KEY not found in .env")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")

# ---------------- EXTRACT TOPICS ----------------
def extract_topics(syllabus: str) -> str:
    print("\n📘 Extracting topics")

    prompt = f"""
Extract ONLY a clean list of study topics from the syllabus.

Rules:
- One topic per line
- No numbering
- No bullets
- No explanations
- No extra text

SYLLABUS:
{syllabus}
"""

    response = model.generate_content(prompt)
    return response.text.strip()


# ---------------- GEMINI STUDY PLAN ----------------
def generate_study_plan(topics_with_ratings: str, days: int) -> str:
    print("\n🧠 Gemini is planning daily schedule")

    prompt = f"""
You are an expert exam study planner.

YOU MUST FOLLOW ALL RULES BELOW.
If you break any rule, the plan is INVALID.

STUDY CONSTRAINTS:
- Total study days: {days}
- Max study time per day: 6–7 hours
- Max time per topic per day: 2 hours
- Minimum time per topic per day: 1 hour
- Do NOT study all topics every day
- Topics can repeat across days ONLY if weak
- Weak topics must get MORE total time
- Strong topics must get LESS total time
- Plan must maximize exam score

INPUT TOPICS WITH UNDERSTANDING LEVEL:
{topics_with_ratings}

STRICT OUTPUT FORMAT (NO EXTRA TEXT):

Day 1:
- Topic name (X hours)
- Topic name (Y hours)

Day 2:
- Topic name (X hours)
- Topic name (Y hours)

Continue until Day {days}.
"""

    response = model.generate_content(prompt)
    return response.text.strip()

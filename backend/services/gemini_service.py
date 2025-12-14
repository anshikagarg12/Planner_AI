import os
import time
from dotenv import load_dotenv
import google.generativeai as genai

# 1. Load environment variables
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

# Simple check to ensure key is loaded
if not api_key:
    print("❌ Error: GEMINI_API_KEY not found in .env file.")
    exit()

genai.configure(api_key=api_key)

# 2. Setup the model: Using Gemini 2.5 Flash
# This model is faster and more capable than 1.5 Flash.
model = genai.GenerativeModel('gemini-2.5-flash')

# ---------------- Extract Topics -----------------
def extract_topics(syllabus):
    print(f"\n... Analyzing syllabus with Gemini 2.5 Flash ...")
    try:
        prompt = f"""
        Extract a clean bullet-point list of study topics from the syllabus below.
        Return ONLY the topics, one per line. No introductory text.

        SYLLABUS:
        {syllabus}
        """
        
        response = model.generate_content(prompt)
        print("✅ Topics Extracted:\n", response.text)
        return response.text.strip()

    except Exception as e:
        print(f"❌ Error extracting topics: {e}")
        return ""

# ---------------- Generate Study Plan -----------------
def generate_study_plan(topics, days):
    print(f"\n... Generating {days}-Day Plan ...")
    try:
        prompt = f"""
You are a strict study planner.

RULES (must follow all):
1. Divide the topics ACROSS the given number of days.
2. Do NOT list all topics every day.
3. Each topic should appear on only ONE day unless its rating is very low.
4. Topics with lower ratings must be given MORE hours.
5. Minimum study time per topic = 1 hour.
6. Maximum study time per topic = 3 hours.
7. Each day should have 4–6 total study hours.

INPUT TOPICS (with ratings):
{topics}

TOTAL DAYS: {days}

OUTPUT FORMAT (STRICT – follow exactly):
Day 1:
- Topic name (X hours)
- Topic name (Y hours)

Day 2:
- Topic name (X hours)
- Topic name (Y hours)
"""

        response = model.generate_content(prompt)
        print("\n✅ Study Plan:\n", response.text)
        return response.text.strip()

    except Exception as e:
        print(f"❌ Error generating plan: {e}")
        return ""



# ---------------- RUN IT -----------------
if __name__ == "_main_":
    # Example Syllabus (Replace this with your real text)
    syllabus_text = """
    Unit 1: Introduction to Data Science, Python Basics, Variables, Data Types.
    Unit 2: Control Structures, Loops (For, While), Functions, Lambda expressions.
    Unit 3: Pandas Library, DataFrames, Data Cleaning, Matplotlib for visualization.
    """
    
    extracted_topics = extract_topics(syllabus_text)
    
    if extracted_topics:
        # small pause to avoid hitting rate limits instantly
        time.sleep(1) 
        generate_study_plan(extracted_topics, days=5)
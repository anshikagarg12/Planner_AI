import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

print("API KEY FOUND:", bool(os.getenv("GEMINI_API_KEY")))

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("models/gemini-1.5-flash")

response = model.generate_content("Say hello in one word")

print("RAW RESPONSE:", response)


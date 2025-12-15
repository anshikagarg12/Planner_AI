import os
import json
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

from services.gemini_service import extract_topics, generate_study_plan
from services.pdf_service import generate_plan_pdf

# 🔥 LOAD ENV FIRST
load_dotenv()

print("✅ GEMINI KEY FOUND:", bool(os.getenv("GEMINI_API_KEY")))

app = Flask(__name__)
CORS(app)

DATA_FILE = "data/saved_plans.json"

# ----------------- Utility -----------------

def load_saved_plans():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_plans(plans):
    with open(DATA_FILE, "w") as f:
        json.dump(plans, f, indent=4)

# ----------------- ROUTES -----------------

@app.route("/extract", methods=["POST"])
def extract():
    print("🔥 /extract ROUTE HIT")

    data = request.get_json()
    if not data or "syllabus" not in data:
        print("❌ No syllabus received")
        return jsonify({"topics": ""})

    syllabus = data["syllabus"]
    print("📘 SYLLABUS RECEIVED")

    topics = extract_topics(syllabus)

    print("📌 TOPICS RETURNED:", topics)

    return jsonify({"topics": topics or ""})


@app.route("/generate", methods=["POST"])
def generate():
    print("🔥 /generate HIT")

    data = request.json
    topics = data.get("topics")
    days = data.get("days")

    print("Days:", days)
    print("Topics:", topics)

    plan = generate_study_plan(topics, days)

    print("📅 PLAN GENERATED:\n", plan)

    return jsonify({
        "plan": plan
    })


@app.route("/pdf", methods=["POST"])
def pdf():
    plan_text = request.json.get("plan", "")
    output_path = "study_plan.pdf"
    generate_plan_pdf(plan_text, output_path)
    return send_file(output_path, as_attachment=True)


@app.route("/save", methods=["POST"])
def save():
    data = request.json
    plans = load_saved_plans()
    plans.append(data)
    save_plans(plans)
    return jsonify({"status": "saved"})


@app.route("/saved", methods=["GET"])
def saved():
    plans = load_saved_plans()
    return jsonify({"plans": plans})


# ----------------- RUN -----------------

if __name__ == "__main__":
    app.run(debug=True)

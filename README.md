🟢 JANMITRA
An AI-Powered, Voice-First Civic & Legal Assistant for India

“Because governance works best when it begins with listening.”

📌 Overview

JANMITRA is a software-only, AI-powered, multilingual civic assistance platform designed to help citizens understand their rights, access verified legal information, and report grievances anonymously using voice or text.

Built specifically for the Indian context, Janmitra eliminates barriers like language, literacy, fear, and complexity by providing a voice-first interface backed by trusted public datasets such as the Indian Penal Code (IPC) and government open data portals.

This project was developed as part of a national-level hackathon / student innovation forum, focusing on real-world problem solving, governance, and social impact.

🎯 Problem Statement

Millions of civic and legal issues in India go unreported or unresolved due to:

Lack of awareness about legal rights

Language and literacy barriers

Fear of retaliation

Complex and fragmented grievance systems

Poor accessibility of existing digital portals

Citizens often don’t know what law applies, where to complain, or how to even begin.

💡 Solution

Janmitra acts as a digital friend of the people by offering:

🗣️ Voice-first interaction in regional languages

⚖️ IPC-backed legal guidance from verified sources

🕵️ Anonymous grievance reporting for sensitive issues

🤖 AI-based validation to reduce fake or duplicate cases

🌐 Software-only architecture (no IoT or hardware dependency)

✨ Key Features
🔹 Multilingual AI Assistant (Speech-to-Speech)

Users can speak their problem in their local language

The AI converts speech → text → processes → replies in spoken form

Supports regional languages (Hindi, Telugu, Tamil, etc.)

🔹 IPC & Government Data–Backed Responses

Answers are grounded in:

Indian Penal Code (IPC)

Government schemes and grievance portals

Every response is informational, not advisory, with source transparency

🔹 Anonymous Reporting System

No personal identity required

Supports sensitive complaints like harassment or corruption

Generates structured complaint drafts automatically

🔹 AI-Based Report Validation

Duplicate and spam detection

Credibility scoring (without identity)

Pattern clustering for high-confidence issues

🔹 Scalable Software Architecture

Web-based platform

Lightweight backend

Designed for integration with NGOs or government dashboards

🛠️ Tech Stack
Frontend

Bolt (UI development)

HTML / CSS / JavaScript

Voice input interface

Backend

Python (Flask) – API & application logic

RESTful architecture

AI & NLP

Speech-to-Text: VOSK (open-source, offline capable)

Natural Language Processing: Hugging Face open models

Text-to-Speech: Coqui TTS (open-source, multilingual)

Data Sources

IndiaCode.nic.in – IPC & Acts (Public Domain)

MyScheme.gov.in – Government Open Data License (GODL)

PRS India / NHRC – Rights & awareness material

Database

SQLite / Firebase (anonymous reports & metadata)

🧠 System Architecture
User (Voice/Text)
      ↓
Speech-to-Text (VOSK)
      ↓
NLP + IPC Knowledge Retrieval
      ↓
AI Validation & Categorization
      ↓
Text-to-Speech (Coqui TTS)
      ↓
User Response + Anonymous Report Storage

🔐 Privacy & Ethics

No personal data required

Anonymous reporting by default

Encrypted communication

No legal advice — only guidance and awareness

Complies with ethical AI principles and DPDP Act intent

📊 Impact

Empowers citizens regardless of literacy or language

Increases legal awareness and civic participation

Reduces fear in reporting sensitive issues

Enables data-driven governance insights

Designed for national-scale deployment

⚠️ Challenges & Mitigation
Challenge	Mitigation
Fake reports	AI-based credibility & duplicate detection
Language accuracy	Indic open-source datasets & fallback text
Trust	Source-backed answers + transparency
Scalability	Modular, lightweight backend
🚀 Future Scope

Integration with government grievance portals

Advanced semantic search over legal datasets

Admin dashboards for authorities and NGOs

Regional language expansion

Offline-first progressive web app (PWA)

📂 Project Structure
janmitra/
│
├── frontend/        # Bolt UI
├── backend/
│   ├── app.py       # Flask server
│   ├── assistant/   # AI logic (STT, NLP, TTS)
│   ├── data/        # IPC & scheme datasets
│
├── requirements.txt
├── README.md

🧪 Running the Project (Local)
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run backend
python app.py


Frontend runs separately via Bolt development environment.

🏆 Use Case

Hackathons & innovation challenges

Civic-tech & governance projects

Legal awareness platforms

NGO or student-led social initiatives

🤝 Team

Developed by Team Janmitra
Engineering students passionate about AI, governance, and social impact.

📜 License

This project uses only open-source tools and public-domain / open government datasets.
Source attribution is maintained for all legal and civic information.

⭐ Final Note

Janmitra is not just a project — it’s a step toward inclusive, voice-driven governance.
Built with empathy. Backed by data. Powered by AI.

# 🏥 Medi-Intel: Holographic Medical Analyzer

![Medi-Intel Banner](https://via.placeholder.com/1200x400?text=Medi-Intel+Holographic+Medical+Analyzer)

**Medi-Intel** is a cutting-edge, AI-powered medical report analysis tool wrapped in a futuristic, holographic user interface. It bridges the gap between complex medical diagnostics and patient understanding by transforming raw lab reports into clear, actionable health insights.

By combining **Optical Character Recognition (OCR)** with **Advanced Large Language Models (LLMs)**, Medi-Intel decrypts medical jargon, flags potential health risks, and provides personalized lifestyle and Ayurvedic recommendations—all within seconds.

---

## 🌟 Key Features

*   **📄 Smart OCR & Analysis**: Instantly extracts text from **PDFs** and **Images** of medical reports (Blood tests, Lipid profiles, etc.).
*   **🤖 AI Doctor Insights**: Utilizes **LLaMA 3.1 (via Groq)** to analyze parameters, distinguishing between normal and abnormal values.
*   **🩺 Holistic Health Guidance**:
    *   **Modern Medical Insights**: Explains clinical significance in plain English.
    *   **Ayurvedic Recommendations**: Suggests ancient natural remedies and herbs.
    *   **Lifestyle & Diet Plans**: Personalized food and activity advice based on report findings.
*   **⚠️ Risk Assessment**: Auto-flags high-risk parameters and advises when to consult a specialist.
*   **🎨 Futuristic UI**: A stunning **Glassmorphism & Neon** aesthetic with 3D parallax effects and holographic animations.
*   **🔒 Privacy Focused**: Data is processed securely and not stored permanently.

---

## 🛠️ Tech Stack

### **Frontend**
*   **Framework**: [Next.js 14](https://nextjs.org/) (React)
*   **Styling**: Tailwind CSS + Custom CSS (`globals.css`)
*   **Animations**: Framer Motion (for smooth 3D transitions and reveals)

### **Backend**
*   **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
*   **AI Model**: LLaMA 3.1-8b-instant (via [Groq Cloud](https://groq.com/))
*   **OCR Engines**:
    *   `pdfplumber` (for PDFs)
    *   `pytesseract` / `Pillow` (for Images)

---

## 🚀 Getting Started

Follow these steps to run the complete application locally.

### Prerequisites
*   Node.js (v18+)
*   Python (v3.8+)
*   Groq API Key (Get one for free at [console.groq.com](https://console.groq.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/Shivam-dev30/medicalyantra.git
cd medicalyantra
```

### 2. Backend Setup
Navigate to the backend folder and set up the Python environment.

```bash
cd backend
python -m venv venv
# Activate Virtual Environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
```

**Configure Environment Variables:**
Create a `.env` file in the `backend/` directory:
```env
GROQ_API_KEY=your_actual_groq_api_key_here
```

**Run the Backend Server:**
```bash
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
*Backend runs at: `http://127.0.0.1:8000` (Docs at `/docs`)*

### 3. Frontend Setup
Open a new terminal in the project root (`medicalyantra/`).

```bash
npm install
npm run dev
```
*Frontend runs at: `http://localhost:3000`*

---

## 📸 Screenshots

| Upload Interface | Detailed Analysis |
| :---: | :---: |
| <img width="1833" height="857" alt="image" src="https://github.com/user-attachments/assets/2e79b86b-c834-4385-8b30-34795d4859b0" />
 | <img width="1630" height="894" alt="image" src="https://github.com/user-attachments/assets/f3fe22c7-f328-45ac-b212-6064341592f4" />
 |

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features or bug fixes:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

**Shivam Maurya**  
*Full Stack Developer & AI Enthusiast*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/shivammaurya01)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail)](mailto:student18171@gmail.com)

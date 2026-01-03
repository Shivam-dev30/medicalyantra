# 🚀 Step-by-Step Deployment Guide

This guide will help you deploy the **Medi-Intel** project for free using **Render** (for the Python Backend) and **Vercel** (for the Next.js Frontend).

---

## Part 1: Deploying the Backend (Render.com)

Render will host your FastAPI server. The "Free Tier" is perfect for this.

1.  **Create a Render Account**: Visit [Render.com](https://render.com) and sign up using your GitHub account.
2.  **Create a New Web Service**:
    *   Click **"New +"** and select **"Web Service"**.
    *   Connect your `medicalyantra` GitHub repository.
3.  **Configure the Service**:
    *   **Name**: `medicalyantra-api`
    *   **Root Directory**: `backend`  *(⚠️ Important: Do not leave this blank)*
    *   **Environment**: `Python 3`
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4.  **Select Plan**: Choose the **"Free"** plan.
5.  **Add Secret Keys**:
    *   Click on the **"Advanced"** button.
    *   Click **"Add Environment Variable"**.
    *   **Key**: `GROQ_API_KEY`
    *   **Value**: Paste your actual Groq API Key here.
6.  **Deploy**: Click **"Create Web Service"**.
7.  **Get your URL**: Once the build finishes (it takes 1-2 minutes), copy the URL at the top (e.g., `https://medicalyantra-api.onrender.com`).

---

## Part 2: Deploying the Frontend (Vercel.com)

Vercel will host your Next.js website and connect it to the Render backend.

1.  **Create a Vercel Account**: Visit [Vercel.com](https://vercel.com) and log in with GitHub.
2.  **Import Project**:
    *   Click **"Add New..."** -> **"Project"**.
    *   Find your `medicalyantra` repo and click **"Import"**.
3.  **Configure Project**:
    *   **Framework Preset**: Next.js
    *   **Root Directory**: `./` (Leave as default)
4.  **Add Environment Variables**:
    *   Find the **"Environment Variables"** section.
    *   **Key**: `NEXT_PUBLIC_API_URL`
    *   **Value**: Paste the **Render URL** you copied in Part 1 (e.g., `https://medicalyantra-api.onrender.com`).
    *   *Note: Ensure there is no trailing slash at the end of the URL.*
5.  **Deploy**: Click the **"Deploy"** button.

---

## 💡 Pro Tips for Free Deployment

*   **Cold Starts**: Since Render's free tier "sleeps" after 15 minutes of inactivity, your first request of the day might take 30-50 seconds. This is normal for free hosting.
*   **Logs**: If something isn't working, check the **"Logs"** tab in Render or the **"Functions"** tab in Vercel.
*   **Updates**: Every time you `git push` new changes to your GitHub, both Render and Vercel will **automatically** redeploy your app with the newest code.

---

**Guide Created by Shivam Maurya**

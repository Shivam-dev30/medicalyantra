# MedicalYantra Backend

## Prerequisites

- Python 3.8+
- Virtual environment (recommended)

## Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create/Activate Virtual Environment:**
    *   **Windows**:
        ```powershell
        python -m venv venv
        .\venv\Scripts\activate
        ```
    *   **Mac/Linux**:
        ```bash
        python3 -m venv venv
        source venv/bin/activate
        ```

3.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Environment Variables:**
    Create a `.env` file in the `backend` folder and add your Groq API key:
    ```env
    GROQ_API_KEY=your_groq_api_key_here
    ```

## Running the Server

Start the Development Server:
```bash
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The server will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000).
Docs are available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

import requests

url = "http://127.0.0.1:8000/analyze"
files = {"file": ("test.txt", "This is a test medical report. Blood Sugar: 150 mg/dL. Hemoglobin: 12 g/dL.")}
data = {"language": "English"}

try:
    response = requests.post(url, files=files, data=data)
    print("Status Code:", response.status_code)
    print("Response JSON:", response.json())
except Exception as e:
    print("Error:", e)

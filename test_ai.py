import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from ai.analyzer import analyze_report

report_text = """
PATIENT REPORT
Name: John Doe
Hemoglobin: 14.5 g/dL (Normal: 13.5-17.5)
Blood Sugar: 110 mg/dL (Normal: 70-100)
Cholesterol: 220 mg/dL (Normal: <200)
"""

try:
    print("Testing analyze_report...")
    result = analyze_report(report_text, "English")
    print("Result:", result)
except Exception as e:
    print("Error:", e)

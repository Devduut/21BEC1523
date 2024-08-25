from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)

# Route to serve the frontend HTML page
@app.route('/')
def index():
    return render_template("index.html")

# Route to process the JSON data and return the filtered response
@app.route('/bfhl', methods=['POST'])
def bfhl_post():
    data = request.json.get("data", [])
    if not data:
        return jsonify({"is_success": False, "error": "Invalid data"}), 400
    
    # Process data... 
    numbers = [item for item in data if item.isdigit()]
    alphabets = [item for item in data if item.isalpha()]
    lowercase_alphabets = [item for item in alphabets if item.islower()]
    highest_lowercase = max(lowercase_alphabets) if lowercase_alphabets else None

    response = {
        "is_success": True,
        "user_id": "john_doe_17091999",
        "email": "john@xyz.com",
        "roll_number": "ABCD123",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else []
    }
    return jsonify(response)

# Additional GET route (optional, used for status checking or debugging)
@app.route('/bfhl', methods=['GET'])
def bfhl_get():
    return jsonify({"operation_code": 1})

if __name__ == '__main__':
    app.run(debug=True)

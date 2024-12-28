from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiz.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class QuizQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)
    options = db.Column(db.JSON, nullable=False)

@app.route('/api/quiz', methods=['GET'])
def get_quiz():
    questions = QuizQuestion.query.all()
    return jsonify([{
        'id': q.id,
        'text': q.text,
        'options': q.options
    } for q in questions])

@app.route('/api/results', methods=['POST'])
def save_results():
    data = request.json
    # TODO: Save results to user account in DB
    return jsonify({'message': 'Results saved!'}), 200

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)

import sys, datetime
import json
import flask
from flask import Blueprint, Flask, request, current_app
from flask_oidc import OpenIDConnect
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from .auth import oidc

girros_resume_data = Blueprint('girros_resume_data', __name__)
db = SQLAlchemy()
ma = Marshmallow()

class Resume(db.Model):
    __tablename__ = 'resume'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String)
    blob = db.Column(db.String)
    date = db.Column(db.DateTime)

    def __init__(self, blob, user_id):
        self.user_id = user_id
        self.blob = blob
        self.date = datetime.datetime.utcnow()
    
    def to_dict(self):
        return dict(id=self.id, 
        user_id=self.user_id,
        blob=self.blob,
        date=self.date.isoformat())
    
class ResumeSchema(ma.Schema):
    class Meta:
        fields = ('user_id', 'blob', 'date')

resume_schema = ResumeSchema()
resumes_schema = ResumeSchema(many=True)

# endpoint to show all
@girros_resume_data.route('/api/resumes/')
def resumes():
    all_resumes = Resume.all()
    result = resumes_schema.dump(all_resumes)
    return jsonify(result.data)

# endpoint to get detail by id
@girros_resume_data.route('/api/resumes/<id>')
def resume_detail(id):
    resume = Resume.get(id)
    return resume_schema.jsonify(resume)

# endpoint to create new
@girros_resume_data.route("/api/resumes", methods=["POST"])
def add_resume():
    user_id = request.json['user_id']
    blob = request.json['blob']
    
    new_resume = Resume(blob,user_id)

    db.session.add(new_resume)
    db.session.commit()

    return jsonify(new_resume)

#@app.route('/resume', methods=["GET", "POST"])
#@oidc.require_login
#def resumes():
#    resumes = None
#    if request.form:
#        try:
#            resume = Resume(title=request.form.get("title"))
#            db.session.add(book)
#            db.session.commit()
#        except Exception as e:
#            print("Failed to add book")
#            print(e)
#    books = Book.query.all()
#    return render_template("home.html", books=books)

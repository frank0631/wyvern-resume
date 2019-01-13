import sys
import json
import flask
from flask import Blueprint, Flask, request
from flask_oidc import OpenIDConnect
from flask_sqlalchemy import SQLAlchemy

from .auth import oidc

girros_resume = Blueprint('girros_resume',__name__)
db = SQLAlchemy()

class Resume(db.Model):
    __tablename__ = 'resume'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String)
    blob = db.Column(db.String)
    date = db.Column(db.DateTime)

    def __init__(self, blob, user_id):
        self.user_id = user_id
        self.blob = blob
        self.date = datetime.utcnow()

@girros_resume.route('/api/resume/parse', methods = ['POST'])
@oidc.require_login
def parse_resume():
	resumeFileMultipart = request.files['file']
	resumeBlob = resumeFileMultipart.read()
	resumeSize = len(resumeBlob)	
	userid = request.form.get('user')
	str = "resumesize {0}, userid {1}.".format(resumeSize, userid)
	
	
	
	return str

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

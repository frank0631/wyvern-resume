import sys, datetime
import json
import flask
from flask import Blueprint, Flask, request, current_app
from flask_oidc import OpenIDConnect
from flask_sqlalchemy import SQLAlchemy

from io import StringIO
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage

from .auth import oidc

girros_resume = Blueprint('girros_resume', __name__)
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
        self.date = datetime.datetime.utcnow()

@girros_resume.route('/api/resume/parse', methods=['POST'])
@oidc.require_login
def parse_resume():
    resumeFileMultipart = request.files['file']
    resumeBlob = resumeFileMultipart.read()
    resumeSize = len(resumeBlob)
    resumeStr = convert(resumeFileMultipart)
    userid = request.form.get('user')
    
    try:
    	resumeObj = Resume(resumeStr,userid)
    	return json.dumps(resumeObj.to_dict())
    except Exception as e:
        current_app.logger.error(e)
        return "error converting pdf file"

#Function converting pdf to string
def convert(fstream, pages=None):
    try:
        if not pages:
            pagenums = set()
        else:
            pagenums = set(pages)
        output = StringIO()
        manager = PDFResourceManager()
        converter = TextConverter(manager, output, laparams=LAParams())
        interpreter = PDFPageInterpreter(manager, converter)

        pages_file = PDFPage.get_pages(fstream, pagenums)
        for page in pages_file:
            interpreter.process_page(page)
        converter.close()
        text = output.getvalue()
        output.close
        return text
    except Exception as e:
        current_app.logger.error(e)
        return "error converting pdf file"

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

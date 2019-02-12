import sys, datetime
import json
import flask
from flask import Blueprint, Flask, request, current_app, jsonify
from flask_oidc import OpenIDConnect
from flask_sqlalchemy import SQLAlchemy

from io import StringIO
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage

from .auth import oidc
from .resumes_data import Resume

girros_resume_logic = Blueprint('girros_resume_logic', __name__)

@girros_resume_logic.route('/api/resume/parse', methods=['POST'])
@oidc.require_login
def parse_resume():
    resumeFileMultipart = request.files['file']
    resumeBlob = resumeFileMultipart.read()
    resumeSize = len(resumeBlob)
    resumeStr = convert(resumeFileMultipart)
    userid = request.form.get('user')
    
    try:
    	resumeObj = Resume(resumeStr,userid)
    	return jsonify(resumeObj.to_dict())
    except Exception as e:
        current_app.logger.error(e)
        return "error converting resume to json"

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


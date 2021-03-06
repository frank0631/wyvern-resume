import os
from flask import Flask
from flask_script import Server, Manager
import flask_login
from flask_login import login_required
from flask_oidc import OpenIDConnect
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from girros import auth, routes, resumes_data, resumes_logic

def create_app():
    config_name = os.environ.get('FLASK_CONFIG', 'development')

    app = Flask(__name__, static_folder='../zinogre/static')
    app.config.from_object('config_' + config_name)
	
    login_manager = flask_login.LoginManager()
    login_manager.init_app(app)
    auth.oidc.init_app(app)
    db = SQLAlchemy(app)
    ma = Marshmallow(app)
    
    resumes_data.db = db
    resumes_data.db.create_all()
    resumes_data.ma = ma

    app.register_blueprint(auth.girros_auth)
    app.register_blueprint(routes.girros_general)
    app.register_blueprint(resumes_data.girros_resume_data)
    app.register_blueprint(resumes_logic.girros_resume_logic)
    
    return app
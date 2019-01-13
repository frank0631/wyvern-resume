import os
from flask import Flask
from flask_script import Server, Manager
import flask_login
from flask_login import login_required
from flask_oidc import OpenIDConnect
from flask_sqlalchemy import SQLAlchemy

from girros import auth, routes, resumes

def create_app():
    config_name = os.environ.get('FLASK_CONFIG', 'development')

    app = Flask(__name__, static_folder='../zinogre/static')
    app.config.from_object('config_' + config_name)
	
    login_manager = flask_login.LoginManager()
    login_manager.init_app(app)
    auth.oidc.init_app(app)
    db = SQLAlchemy(app)
    resumes.db = db
    resumes.db.create_all()

    app.register_blueprint(auth.girros_auth)
    app.register_blueprint(routes.girros_general)
    app.register_blueprint(resumes.girros_resume)
    

    return app
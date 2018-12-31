from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from flask_migrate import Migrate
import os


app = Flask(__name__)
app.config['SECRET_KEY'] = '7f6e3fb01f5c3cda023160b552c84180'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Hooper33@localhost/TESTDB'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'vensoneandrew@gmail.com'
app.config['MAIL_PASSWORD'] = 'programmerprod34!@'

db = SQLAlchemy(app)
# MIGRATIONS
migrate=Migrate(app, db)

bcrypt = Bcrypt(app)
mail = Mail(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

from austinpos import routes

from austinpos import db, login_manager
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    site = db.Column(db.String())
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    user_data = db.relationship('Rma', backref='userdata', lazy=True)

    def __repr__(self):
        return f"User('{self.username}, '{self.email}')"

class Rma(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rmanumber = db.Column(db.String(50), unique=True, nullable=False)
    Vendor = db.Column(db.String(50), nullable=False)
    Customer = db.Column(db.String(100), nullable = False)
    Issue = db.Column(db.Text())
    Date_Sent = db.Column(db.String(50), nullable=False)
    Date_Received = db.Column(db.String(50))
    Rep = db.Column(db.String(50))
    Notes = db.Column(db.Text())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class OrderCart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    equipment = db.Column(db.String())
    pricing = db.Column(db.String())

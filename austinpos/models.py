from austinpos import db, login_manager
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))


class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    site = db.Column(db.String())
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    adminstatus = db.Column(db.Boolean)
    sitelink = db.Column(db.Integer, db.ForeignKey('sites.id'))

    def __repr__(self):
        return f"User('{self.username}, '{self.email}')"

class Rma(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    site = db.Column(db.String(60), nullable=False)
    serialnumber = db.Column(db.String(25), unique=True, nullable=False)
    rmanumber = db.Column(db.String(50), unique=True, nullable=False)
    Vendor = db.Column(db.String(50), nullable=False)
    Customer = db.Column(db.String(100), nullable = False)
    Issue = db.Column(db.Text())
    Date_Sent = db.Column(db.String(50), nullable=False)
    Date_Received = db.Column(db.String(50))
    Rep = db.Column(db.String(50))
    Notes = db.Column(db.Text())


class OrderCart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    equipment = db.Column(db.String())
    pricing = db.Column(db.String())

class Sites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sitename = db.Column(db.String(), nullable=False)
    contractstart = db.Column(db.String(), nullable=False)
    contractend = db.Column(db.String(), nullable = False)
    hwkey = db.Column(db.String(), nullable=False)
    stations = db.Column(db.String(), nullable=False)
    printers = db.Column(db.String(), nullable = False)
    remprinters = db.Column(db.String(), nullable = False)
    bof = db.Column(db.Boolean)
    processor = db.Column(db.String(), nullable = False)
    giftopt = db.Column(db.String(), nullable = False)
    site_user = db.relationship('Users', backref='site_users', lazy='dynamic')

    def __repr__(self):
        return self.sitename
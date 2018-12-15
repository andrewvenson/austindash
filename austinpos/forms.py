from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, PasswordField, SubmitField, TextAreaField, SelectField, DateField
from wtforms.validators import DataRequired, Email, Length, EqualTo, ValidationError
from austinpos.models import User



class RegistrationForm(FlaskForm):
    username = StringField(validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField(validators=[DataRequired(), Email()])
    password = PasswordField(validators=[DataRequired()])
    confirm_pass = PasswordField(validators=[DataRequired(), EqualTo('password')])
    site = SelectField('Site', choices = [('2 Bucks', '2 Bucks'), ('600 Degrees', '600 Degrees'), ('77 Degrees', '77 Degrees'), ('ABGB', 'ABGB'),
                            ('Backspin', 'Backspin'), ('Backspin 2', 'Backspin 2'), ('Bangers', 'Bangers'), ('Barcelona', 'Barcelona'), ('Barley Swine', 'Barley Swine'),
                            ("Beau's", "Beau's"),('Blind Pig', 'Blind Pig'), ("Bob's Blue Collar Tavern", "Bob's Blue Collar Tavern"), ('Booneville', 'Booneville'),
                            ('Boomerz', 'Boomerz'),('Brixton', 'Brixton'), ('Buckshot', 'Buckshot'), ('Bungalow', 'Bungalow'), ('BUP', 'BUP'), ("Burnside's Tavern", "Burnside's Tavern"),('Butterfly Bar', 'Butterfly Bar'), ('Buzzmill Austin', 'Buzzmill Austin'), ('Buzzmill San Marcos', 'Buzzmill San Marcos'), ('Cafe Crepe', 'Cafe Crepe'),('Casa Garcias - Kyle', 'Casa Garcias - Kyle'), ('Casa Garcias - NB', 'Casa Garcias - NB'), ('Casa Garcias - Pflugerville', 'Casa Garcias - Pflugerville'),('Casa Garcias - Round Rock', 'Casa-Garcias - Round Rock')])
    submit = SubmitField('Register')

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('Username is taken. Please choose a different one.')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('Email is taken. Please choose a different one.')

class CrazyForm(FlaskForm):
    RmaNumber = StringField(validators=[DataRequired(), Length(max=20)])
    Vendor = SelectField(validators=[DataRequired()], choices = [('Touch Dynamic', 'Touch Dynamic'), ('CRS', 'CRS'), ('Posiflex', 'Posiflex')])
    Client = SelectField(validators=[DataRequired()], choices = [('Spire', 'Spire'), ('Highland Lounge', 'Highland Lounge'), ('Hardtails', 'Hardtails'), ('Dogpatch', 'Dogpatch')])
    Issue = TextAreaField('Issue', validators=[DataRequired(), Length(max=250)])
    Date_Sent = StringField('Date Sent', validators=[DataRequired()])
    Date_Received = StringField('Date Recieved', validators=[DataRequired()])
    Rep = SelectField('Rep', validators=[DataRequired()], choices = [('Sasha', 'Sasha'), ('Jon', 'Jon'), ('Eric','Eric'), ('Jeff','Jeff'), ('Andrew','Andrew')])
    Notes = TextAreaField('Notes', validators=[DataRequired(), Length(max=250)])
    submit = SubmitField('Submit Rma')

class LoginForm(FlaskForm):
    username= StringField(validators=[DataRequired()])
    password = PasswordField(validators=[DataRequired()])
    submit = SubmitField('Login')
    remember = BooleanField('Remember me')

class submitForm(FlaskForm):
    type = StringField()
    price = StringField()
    submit = SubmitField('Add')

class DeleteOrder(FlaskForm):
    deleteRow = StringField()
    deletetype = StringField()
    deleteprice = StringField()
    Delete = SubmitField('Delete')

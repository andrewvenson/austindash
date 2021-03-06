from flask_wtf import FlaskForm
from wtforms_sqlalchemy.fields import QuerySelectField
from wtforms import StringField, BooleanField, PasswordField, SubmitField, TextAreaField, SelectField
from wtforms.fields.html5 import DateField
from wtforms.validators import DataRequired, Email, Length, EqualTo, ValidationError
from wtforms.widgets import TextArea
from austinpos.models import Users, Sites, Rma

def siteChoice():
    sites = Sites.query
    return sites

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_pass = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    admin_status = BooleanField('Check for Admin Status')
    site = QuerySelectField(query_factory=siteChoice, allow_blank=False, get_label="sitename")
    submit = SubmitField('Register')

    def validate_username(self, username):
        user = Users.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('Username is taken. Please choose a different one.')

    def validate_email(self, email):
        user = Users.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('Email is taken. Please choose a different one.')

class CrazyForm(FlaskForm):
    Site = QuerySelectField("Site", query_factory=siteChoice, allow_blank=True, get_label="sitename")
    serialnumber = StringField("Serial #", validators=[DataRequired(), Length(max=20)])
    RmaNumber = StringField("Rma #", validators=[DataRequired(), Length(max=20)])
    Vendor = SelectField(validators=[DataRequired()], choices = [('Touch Dynamic', 'Touch Dynamic'), ('CRS', 'CRS'), ('Posiflex', 'Posiflex')])
    Issue = TextAreaField('Issue', validators=[DataRequired(), Length(max=250)])
    Date_Sent = DateField('Date Sent', format='%Y-%m-%d', validators=[DataRequired()])
    Date_Received = DateField('Date Recieved', format='%Y-%m-%d', validators=[DataRequired()])
    Rep = SelectField('Rep', validators=[DataRequired()], choices = [('Sasha', 'Sasha'), ('Jon', 'Jon'), ('Eric','Eric'), ('Jeff','Jeff'), ('Andrew','Andrew')])
    Notes = TextAreaField('Notes', validators=[DataRequired(), Length(max=250)])
    submit = SubmitField('Submit Rma')

class LoginForm(FlaskForm):
    username= StringField(validators=[DataRequired()])
    password = PasswordField(validators=[DataRequired()])
    submit = SubmitField('Login')
    remember = BooleanField('Remember me')

class SubmitForm(FlaskForm):
    type = StringField()
    price = StringField()
    submit = SubmitField('Add')

class DeleteOrder(FlaskForm):
    deleteRow = StringField()
    deletetype = StringField()
    deleteprice = StringField()
    Delete = SubmitField('Delete')

class AddSiteForm(FlaskForm):
    sitename = StringField('Site Name', validators=[DataRequired()])
    contractstart = DateField('Contract Start Date',  format='%Y-%m-%d', validators=[DataRequired()])
    contractend = DateField('Contract End Date',  format='%Y-%m-%d', validators=[DataRequired()])
    hwkey = StringField('Hardware Key #', validators=[DataRequired()])
    stations = SelectField('# of Stations', validators=[DataRequired()], choices=[('1', '1'), 
    ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6'), ('7', '7'), ('8', '8'), ('9', '9'), ('10', '10'),
    ('11', '11'), ('12', '12'), ('13', '13'), ('14', '14'), ('15', '15'), ('16', '16'), ('17', '17'), ('18', '18'), ('19', '19'),
    ('20', '20'), ('21', '21'), ('22', '22'), ('23', '23'), ('24', '24'), ('25', '25'), ('26', '26'), ('27', '27'), ('28', '28')])
    printers = SelectField('# of Printers', validators=[DataRequired()], choices=[('1', '1'), 
    ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6'), ('7', '7'), ('8', '8'), ('9', '9'), ('10', '10'),
    ('11', '11'), ('12', '12'), ('13', '13'), ('14', '14'), ('15', '15'), ('16', '16'), ('17', '17'), ('18', '18'), ('19', '19'),
    ('20', '20'), ('21', '21'), ('22', '22'), ('23', '23'), ('24', '24'), ('25', '25'), ('26', '26'), ('27', '27'), ('28', '28')])
    remprinters = SelectField('# of Remote Printers', validators=[DataRequired()], choices=[('1', '1'), 
    ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6'), ('7', '7'), ('8', '8'), ('9', '9'), ('10', '10')])
    bof = BooleanField('Check for BOH License')
    processor = SelectField('Choose Processor', choices=[('Heartland', 'Heartland'), ('Sterling', 'Sterling'), ('Tsys', 'Tsys'), ('NetEPay', 'NetEPay')])
    giftopt = SelectField('Gift Options', choices=[('None', 'None'), ('MyFocus', 'MyFocus'), ('GiftEPay', 'GiftEPay')])

class MessageForm(FlaskForm):
    message = StringField('Body', widget=TextArea())
    emailtype = StringField()
    sitename = StringField()

class QuestionForm(FlaskForm):
    Question = StringField(widget=TextArea(), validators=[DataRequired()])
    Type = SelectField("Type", choices=[("Printers", "Printers"),
     ("Terminals", "Terminals"), ("Creditcards", "Creditcards"),("Emv", "Emv"),
     ("Networking", "Networking"),("Giftcards", "Giftcards"), ("Logmein", "Logmein")])
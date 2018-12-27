from flask import url_for, render_template, redirect, flash, jsonify, json, request
from austinpos import app, db, bcrypt
from austinpos.forms import LoginForm, RegistrationForm, CrazyForm, SubmitForm, AddSiteForm
from austinpos.models import User, Rma, OrderCart, Sites
from flask_login import login_user, current_user, logout_user, login_required
import requests, json
from flask_mail import Message

cart = []

equipment = {
    'Loaner Terminal': '150',
    'Loaner Thermal Printer': '85',
    'Loaner MSR': '50',
    'Loaner Kitchen Printer': '85',
    'Loaner Desktop PC': '150',
    'Loaner Cash Drawer':'50',
    'Thermal Printer':'350',
    'Kitchen Printer':'385',
    'MSR':'150',
    'Cash Drawer': '150',
    'Parallel Cable':'12.95',
    'Serial Cable':'12.95',
    'Cash Drawer Cable':'12.95',
    'Punch Downs':'5.95',
    'New Line': '150',
    'Terminal Power Supply':'150',
    'Printer Power Supply':'75',
    'Used Printer Power Supply':'37.50',
    'Used Terminal Power Supply': '75',
    'Used MSR': '75',
    'SSD 120GB': '99'
}

# ------------------- SITE LOGIN -------------------------------------------------
@app.route('/', methods=['POST', 'GET'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dash'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            flash(f'Welcome {current_user.username}!')
            return redirect(url_for('dash'))
        else:
            flash('Login unsucceSsful. Please check email and password')
    return render_template('login.html', name = 'login', form=form)

# ----------------------------- SITE'S DASHBOARD -----------------------------
@app.route("/Dash")
@login_required
def dash():
    return render_template('dash.html')

# --------------------- LOGOUT USER ----------------------
@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('login'))

# --------------------- REGISTER NEW USER ------------------------------------------------------
@app.route('/register', methods=['POST', 'GET'])
@login_required
def register():
    db.create_all()
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_pw = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        print(form.site.data)
        siteid = Sites.query.filter_by(sitename=form.site.data).first().id
        user = User(site = form.site.data, username = form.username.data, email = form.email.data, 
        password = hashed_pw, adminstatus= form.admin_status.data, sitelink=siteid)
        db.create_all()
        db.session.add(user)
        db.session.commit()
        flash(f"{form.username.data} has been added!")
        return redirect(url_for('dash'))

    return render_template('register.html', name = 'login', form=form)

# ----------------------------------- CREATE AN RMA ---------------------------------------------- 
@app.route('/rma/create-rma', methods=['POST', 'GET'])
@login_required
def createrma():
    form2 = CrazyForm()
    if form2.validate_on_submit():
        rma = Rma(rmanumber=form2.RmaNumber.data, Vendor=form2.Vendor.data, Customer=form2.Client.data, Issue=form2.Issue.data, Date_Sent=form2.Date_Sent.data, Date_Received=form2.Date_Received.data, Rep=form2.Rep.data, Notes=form2.Notes.data)
        db.create_all()
        db.session.add(rma)
        db.session.commit()
        return redirect(url_for('rma'))
    else:
        print('Invalid submission')
    return render_template('create-rma.html', name = 'createrma_', form=form2)

# --------------------------------- VIEW SITE'S RMA'S ----------------------------------
@app.route('/rma', methods=['GET', 'POST'])
@login_required
def rma():
    rmas = Rma.query.all()
    return render_template('rma.html', name = 'rma', info=rmas)

# ------------------------------- PRICING --------------------------------
@app.route('/pricing', methods=['POST', 'GET'])
@login_required
def pricing():
    orders = SubmitForm()
    price_info = equipment
    return render_template('pricing.html', pricing = price_info, orders = orders)

# ----------------------------------- PAYMENT PAGE -----------------------------------
@app.route('/pricing/orders')
@login_required
def Order():
    return render_template('Order.html', name='order')

# ---------------------------------- USER CART API -----------------------------
@app.route('/pricing/orders/<user_name>/api', methods=['POST', 'GET'])
@login_required
def api(user_name):
    user_name = current_user.username
    if request.method == 'POST':
        cart.append(json.loads(request.form["javascript_data"]))
    return jsonify(cart)

# ---------------------------- DELETE ITEM IN CART ROUTE ----------------------------------
@app.route('/pricing/orders/delete', methods=['POST', 'GET'])
@login_required
def delete_item():
    if request.method == 'POST':
        cart.pop(json.loads(request.form["delete_item"]))
        print(cart)
    return jsonify({"whoa": "there"})

# ----------------------------- DISPLAY CART BADGE LENGTH---------------------------------
@app.context_processor
def inject_badge_length():
    badge_length = len(cart)
    return {'BADGE_LENGTH' : badge_length}

# ------------------------------- ADD SITE -----------------------------------------
@app.route('/sites/addsite', methods=['POST', 'GET'])
# @login_required
def addsites():
    form = AddSiteForm()
    print(form.sitename.data)
    if form.validate_on_submit():
        newsite = Sites(sitename=form.sitename.data, contractstart=form.contractstart.data, contractend=form.contractend.data, 
        hwkey=form.hwkey.data, stations=str(form.stations.data), printers=str(form.printers.data), remprinters=str(form.remprinters.data), 
        bof=form.bof.data, processor=str(form.processor.data), giftopt=str(form.giftopt.data))
        db.session.add(newsite)
        db.session.commit()
        flash(f'{form.sitename.data} has been added to the database')
        return redirect(url_for('sites'))
    else:
        print('Invalid submission')
    return render_template('addsites.html', form = form)

# -------------------------- ADMIN VIEW SITES ---------------------------------
@app.route('/sites', methods=['POST','GET']) 
@login_required
def sites():
    sites = Sites.query.all()
    return render_template('sites.html', sites=sites)



# ---------------------------------- SITE INFO -----------------------------------------
@app.route('/siteinfo', methods=['POST', 'GET'])
@login_required
def siteinfo():
    sites = Sites.query.all()
    x = request.form.get('sitesss')
    return render_template('/sites.html', x=x, sites=sites)
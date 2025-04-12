const generatePythonApp = (info) => {
    const files = {};

    // requirements.txt
    files['requirements.txt'] = `
        flask==2.0.1
        flask-sqlalchemy==2.5.1
        flask-login==0.5.0
        python-dotenv==0.19.0
    `.trim();

    // app.py
    files['app.py'] = `
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from dotenv import load_dotenv
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

${info.pages.map(page => `
@app.route('${page.path.replace('.html', '')}')
${page.name.toLowerCase() !== 'home' ? '@login_required' : ''}
def ${page.name.toLowerCase()}():
    return render_template('${page.name.toLowerCase()}.html', title='${page.title}')
`).join('\n')}

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = User.query.filter_by(username=request.form['username']).first()
        if user and user.password == request.form['password']:
            login_user(user)
            return redirect(url_for('home'))
        flash('Invalid username or password')
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
    `;

    // Generate templates for each page
    info.pages.forEach(page => {
        files[`templates/${page.name.toLowerCase()}.html`] = `
{% extends "base.html" %}

{% block content %}
    <h1>{{ title }}</h1>
    <p>${page.description}</p>

    {% for section in sections %}
    <section>
        <h2>${section.title}</h2>
        ${section.content ? `<p>${section.content}</p>` : ''}
        
        ${section.features ? `
        <div class="features">
            ${section.features.map(feature => `
            <div class="feature">
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
            `).join('')}
        </div>
        ` : ''}
    </section>
    {% endfor %}
{% endblock %}
        `;
    });

    // base.html template
    files['templates/base.html'] = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }} - ${info.title}</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
    <nav>
        <div class="nav-brand">${info.navigation.logo}</div>
        <ul class="nav-menu">
            ${info.navigation.links.map(link => `
            <li><a href="${link.path.replace('.html', '')}">${link.text}</a></li>
            `).join('')}
            {% if current_user.is_authenticated %}
            <li><a href="{{ url_for('logout') }}">Logout</a></li>
            {% else %}
            <li><a href="{{ url_for('login') }}">Login</a></li>
            {% endif %}
        </ul>
    </nav>

    <main class="container">
        {% with messages = get_flashed_messages() %}
            {% if messages %}
                {% for message in messages %}
                    <div class="alert">{{ message }}</div>
                {% endfor %}
            {% endif %}
        {% endwith %}
        
        {% block content %}{% endblock %}
    </main>

    <script src="{{ url_for('static', filename='app.js') }}"></script>
</body>
</html>
    `;

    // login.html template
    files['templates/login.html'] = `
{% extends "base.html" %}

{% block content %}
<div class="login-form">
    <h2>Login</h2>
    <form method="POST">
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Login</button>
    </form>
</div>
{% endblock %}
    `;

    // style.css
    files['static/style.css'] = `
:root {
    --primary-color: ${info.color || '#1976d2'};
}

body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

nav {
    background-color: var(--primary-color);
    padding: 1rem;
    color: white;
}

.nav-brand {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-menu {
    list-style: none;
    display: flex;
    gap: 1rem;
}

.nav-menu a {
    color: white;
    text-decoration: none;
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
}

.feature {
    padding: 1.5rem;
    border-radius: 8px;
    background-color: #f5f5f5;
}

.login-form {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 8px;
    background-color: #f5f5f5;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

.alert {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    background-color: #f8d7da;
    color: #721c24;
}
    `;

    // app.js
    files['static/app.js'] = `
document.addEventListener('DOMContentLoaded', () => {
    // Add any client-side JavaScript here
});
    `;

    return files;
};

module.exports = {
    generatePythonApp
};

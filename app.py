from flask import Flask, render_template

app = Flask(__name__)

    # Secret key for session management (important for later, just a placeholder for now)
app.config['SECRET_KEY'] = 'your_super_secret_key_here' 

    # Route for the home page (product listing)
@app.route('/')
def index():
        # Flask will look for 'index.html' inside a 'templates' folder
        return render_template('index.html')

    # Route for the shopping cart page
@app.route('/cart')
def cart():
        # Flask will look for 'cart.html' inside a 'templates' folder
        return render_template('cart.html')

    # This block allows you to run the app directly using 'python app.py'
if __name__ == '__main__':
        app.run(debug=True) # debug=True allows for auto-reloading and better error messages

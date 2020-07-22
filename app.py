# import necessary libraries
import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from sqlalchemy import func, create_engine

app = Flask(__name__)

engine = create_engine('sqlite:///db/pets.sqlite')

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/send", methods = ["GET", "POST"])
def get_pet():
    conn = engine.connect()
    if request.method == "POST":
        pet_name = request.form["petName"]
        pet_type = request.form["petType"]
        pet_age = request.form["petAge"]
        pet_df = pd.DataFrame({
            'name' : [pet_name],
            'type' : [pet_type],
            'age' : [pet_age]
        })
        pet_df.to_sql('pets', con = conn, if_exists = 'append', index = False)

        return redirect ("/", code = 302)
    conn.close()

    return render_template('form.html')

@app.route("/api/pals")
def pals():
    conn = engine.connect()
    df = pd.read_sql("select * from pets", con = conn)
    df_json = df.to_json(orient = 'records')
    conn.close()
    return df_json

@app.route("/api/pals-summary")
def pals_summary():
    conn = engine.connect()
    df = pd.read_sql("select type as Type, Count(type) as Count from pets group by type", con = conn)
    df_json = df.to_json(orient = 'records')
    conn.close()
    return df_json

if __name__ == "__main__":
    app.run(debug=True)
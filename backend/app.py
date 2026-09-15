from flask import Flask, request, jsonify
from database import get_connection, init_db
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
init_db()
CORS(app)

@app.route("/textos", methods=["GET"])
def listar_textos():
    conn = get_connection()
    textos = conn.execute("SELECT * FROM textos").fetchall()
    conn.close()

    print(textos)

    return jsonify([dict(t) for t in textos]), 200

@app.route("/textos/<int:code>", methods=["GET"])
def obtener_texto(code):
    conn = get_connection()
    texto = conn.execute("SELECT text_content FROM textos WHERE id = ?", (code,)).fetchone()
    conn.close()

    if texto is None:
        return jsonify({"error" : "text not found"}), 404
    
    print("ya")
    return jsonify(dict(texto)), 200
    

@app.route("/textos", methods=["POST"])
def subir_texto():
    data = request.get_json()

    if not data or not data.get("text"):
        return jsonify({"error" : "text cannot be empty"}), 400

    conn = get_connection()
    try:
        cursor = conn.execute(
            "INSERT INTO textos (text_content) VALUES (?)", (data["text"],)
        )
        conn.commit()
        new_id = cursor.lastrowid
    except Exception as e:
        conn.rollback()
        return jsonify({"error" : str(e)}), 500
    finally:
        conn.close()

    return jsonify({"message": "Text uploaded", "id": new_id}), 201

if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
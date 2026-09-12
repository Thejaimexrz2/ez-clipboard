from flask import Flask, request, jsonify
from database import get_connection, init_db
import sqlite3

app = Flask(__name__)
init_db()

@app.route("/textos", methods=["GET"])
def listar_textos():
    conn = get_connection()
    textos = conn.execute("SELECT * FROM textos").fetchall()
    conn.close()

    print(textos)

    return jsonify([dict(t) for t in textos]), 200

@app.route("/textos/<int:id>", methods=["GET"])
def obtener_texto(id):
    conn = get_connection()
    texto = conn.execute("SELECT texto FROM textos WHERE id = ?", (id,)).fetchone()
    conn.close()

    if texto is None:
        return jsonify({"error" : "text not found"}), 404

    return jsonify(dict(texto)), 200

@app.route("/textos", methods=["POST"])
def subir_texto():
    data = request.get_json()
    print(data["text"])

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
        return jsonify({"error" : str(e)})
    finally:
        conn.close()

if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)